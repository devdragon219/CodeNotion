using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using System.Globalization;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using Ardalis.Specification;
using RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Common.InterestRateAggregate.Specification;

namespace RealGimm.Core.Prop.Services;

public sealed class RegistryCommunicationService
{
  private readonly IRepository<Subject> _subjectRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;
  private readonly IRepository<City> _cityRepository;
  private readonly IRepository<RegistryCommunication> _registryCommunicationRepository;
  private readonly IReadRepository<InterestRate> _interestRateRepository;
  private readonly ILogger<RegistryCommunicationService> _logger;
  const decimal STAMP_FEE_ITA_PER_UNIT = 16m;
  const int STAMP_PAGES_PER_UNIT = 4;

  public RegistryCommunicationService(
    IRepository<Subject> subjectRepository,
    IRepository<EstateUnit> estateUnitRepository,
    IRepository<City> cityRepository,
    IRepository<RegistryCommunication> registryCommunicationRepository,
    ILogger<RegistryCommunicationService> logger,
    IReadRepository<InterestRate> interestRateRepository)
  {
    _subjectRepository = subjectRepository;
    _estateUnitRepository = estateUnitRepository;
    _cityRepository = cityRepository;
    _registryCommunicationRepository = registryCommunicationRepository;
    _logger = logger;
    _interestRateRepository = interestRateRepository;
  }

  public async Task<RegistryCommunication> CreateRegistryCommunicationAsync(
    Contract contract,
    CommunicationType communicationType,
    DateOnly? paymentDate = null)
  {
    var managementSubject = await _subjectRepository
      .AsQueryable(new GetByIdSpec<Subject>(contract.ManagementSubjectId), new SubjectIncludeAllSpec())
      .OfType<ManagementSubject>()
      .SingleAsync();

    var contractFee = contract.RevaluationHistories
      .Select(revaluation => new { Date = revaluation.Since, Fee = revaluation.YearlyRateWithRevaluation })
      .Concat(contract.RatePlans.Select(ratePlan => new { Date = ratePlan.Since, Fee = ratePlan.NewYearlyRate }))
      .OrderBy(item => item.Date)
      .LastOrDefault()
      ?.Fee
      ?? contract.BillingBaseFee;

    var contractType = contract.Type.RegistrationTaxIncomeType switch
    {
      RegistrationTaxIncomeTypeRLI.ita_L1Residential => "L1",
      RegistrationTaxIncomeTypeRLI.ita_L2ResidentialDiscount => "L2",
      RegistrationTaxIncomeTypeRLI.ita_L3ResidentialWithVAT => "L3",
      RegistrationTaxIncomeTypeRLI.ita_L4ResidentialFinancial => "L4",
      RegistrationTaxIncomeTypeRLI.ita_S1Nonresidential => "S1",
      RegistrationTaxIncomeTypeRLI.ita_S2InstrumentalWithVAT => "S2",
      RegistrationTaxIncomeTypeRLI.ita_S3NonresidentialFinancial => "S3",
      RegistrationTaxIncomeTypeRLI.ita_T1Farmland => "T1",
      RegistrationTaxIncomeTypeRLI.ita_T2FarmlandDiscount => "T2",
      RegistrationTaxIncomeTypeRLI.ita_T3NonbuildableLand => "T3",
      RegistrationTaxIncomeTypeRLI.ita_T4NonbuildableParkingWithVAT => "T4",
      _ => null
    };

    var registryCommunication = new RegistryCommunication();
    registryCommunication.SetContract(contract);
    registryCommunication.SetContractCode(contract.RegistrationTaxData?.ContractRegistrationCode);
    registryCommunication.SetContractFee(contractFee);
    registryCommunication.SetContractType(contractType);
    registryCommunication.SetContractSignatureDate(contract.AgreementDate);
    registryCommunication.SetType(communicationType);
    registryCommunication.SetDate(DateTime.UtcNow.ToDateOnly());
    registryCommunication.SetCountryISO3(managementSubject.LegalResidentialAddress!.CountryISO!);
    registryCommunication.SetStartDate(contract.EffectStartDate);
    registryCommunication.SetEndDate(contract.SecondTermExpirationDate ?? contract.FirstTermExpirationDate);
    registryCommunication.SetNumberOfCopies(contract.RegistrationTaxData?.NumberOfPages);
    registryCommunication.SetNumberOfPages(contract.RegistrationTaxData?.NumberOfCopies);
    registryCommunication.SetOffice(contract.RegistrationTaxData?.RegistrationOffice);
    registryCommunication.SetRegistryNumber(contract.RegistrationTaxData?.RegistrationNumber);
    registryCommunication.SetSenderSubjectId(contract.ManagementSubjectId);

    if (contract.RegistrationTaxData?.NumberOfCopies is not null
      && contract.RegistrationTaxData?.NumberOfPages is not null
      && contract.RegistrationTaxData?.NumberOfPages > 0)
    {
      int unitsPerCopy = (contract.RegistrationTaxData!.NumberOfPages + STAMP_PAGES_PER_UNIT - 1) / STAMP_PAGES_PER_UNIT;

      registryCommunication.SetStampFee(STAMP_FEE_ITA_PER_UNIT * unitsPerCopy  * contract.RegistrationTaxData!.NumberOfCopies);
    }

    registryCommunication.SetIsPayingEntireContractFee(
      contract.RegistrationTaxData?.FirstRegistrationPeriod == RegistrationTaxPeriod.EntireDuration);

    var estateUnits = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(contract.LocatedUnits.Select(unit => unit.Id)), new EstateUnitIncludeAllSpec())
      .ToListAsync();

    var mainEstateUnitId = contract.LocatedUnits.First(u => u.IsMainUnit).EstateUnitId;
    var mainEstateUnit = estateUnits.First(u => u.Id == mainEstateUnitId);

    var counterpartIds = contract.Counterparts.Select(u => u.Id).ToArray();

    var cashDepositsByThirdParties = contract.SecurityDeposits
      .Where(sd => sd.Type == SecurityDepositType.Cash
        && sd.SubjectId.HasValue
        && !counterpartIds.Contains(sd.SubjectId.Value))
      .Sum(sd => sd.BaseAmount);

    registryCommunication.SetRegistryFee(
      CalculateRegistryFee(mainEstateUnit,
      contract.BillingBaseFee ?? 0,
      contract.RegistrationTaxData?.FirstRegistrationPeriod == RegistrationTaxPeriod.EntireDuration
        ? contract.DurationYears
        : 1,
      false,
      !contract.RegistryCommunications.Any(),
      false,
      (await _interestRateRepository
        .AsQueryable(new InterestRateByCountrySpec(CountryISO3.ITA))
        .OrderByDescending(x => x.Since)
        .FirstAsync()).Rate,
      cashDepositsByThirdParties)
    );

    var cities = await _cityRepository
      .AsQueryable(
        new CitiesByGuidsSpec(estateUnits
          .Where(unit => unit.Address.CityReference.HasValue)
          .Select(unit => unit.Address.CityReference!.Value)
          .Distinct()))
      .Select(city => new { city.Guid, city.Id })
      .ToDictionaryAsync(city => city.Guid, city => city.Id);

    var maxCommunicationIndex = contract.RegistryCommunications
      .SelectMany(communication => communication.EstatesUnits.Select(unit => unit.CommunicationIndex))
      .DefaultIfEmpty(defaultValue: 1)
      .Max();

    registryCommunication.EstatesUnits.AddRange(
      estateUnits.Select((estateUnit, index) =>
      {
        var cityId = estateUnit.Address.CityReference.HasValue
          ? cities[estateUnit.Address.CityReference!.Value]
          : (int?)null;

        var cadastralUnit = estateUnit.CurrentCadastralUnit;
        var estate = estateUnit.Estate;

        var commEstateUnit = new CommEstateUnit();
        commEstateUnit.SetCommunicationIndex(maxCommunicationIndex + index);
        commEstateUnit.SetEstateUnitId(estateUnit.Id);
        commEstateUnit.SetCityId(cityId);

        var isMainLocatedUnit = contract.LocatedUnits
          .Any(locatedUnit => locatedUnit.EstateUnitId == estateUnit.Id
            && locatedUnit.IsMainUnit);

        if (cadastralUnit is not null)
        {
          commEstateUnit.SetEstateUnitType(
            isMainLocatedUnit
              ? (cadastralUnit.IsAncillaryUnit ? "3" : "1")
              : "2");

          // if any estate unit of estate is not included in contract
          commEstateUnit.SetEstatePartition(estate
            .EstateUnits
            .Select(estateUnit => estateUnit.Id)
            .Except(contract.LocatedUnits.Select(locatedUnit => locatedUnit.EstateUnitId))
            .Any() ? "P" : "I");

          commEstateUnit.SetCadastreType(GetCadastreUnitType(cadastralUnit));
          commEstateUnit.SetCadastralCategory(cadastralUnit.Income?.CadastralCategory?.ExternalCode);
          commEstateUnit.SetCadastralIncome(CalculateGrossCadastralIncome(cadastralUnit));

          if (cadastralUnit.Address is not null)
          {
            commEstateUnit.SetCadastralAddressToponymy(cadastralUnit.Address.Toponymy);
            commEstateUnit.SetCadastralAddressNumbering(cadastralUnit.Address.Numbering);
          }

          var coordinates = cadastralUnit.Coordinates.FirstOrDefault();
          if (coordinates is not null)
          {
            commEstateUnit.SetCadastralCoordinates(coordinates.Level1, coordinates.Level2, coordinates.Level3, coordinates.Level4);
          }
        }

        return commEstateUnit;
      }));

    if (paymentDate.HasValue)
    {
      var registrationPayment = new RegistrationPayment();
      registrationPayment.SetContract(contract);
      registrationPayment.SetPaymentType(RegistrationPaymentType.Payment);
      registrationPayment.SetPaymentYear(paymentDate.Value.Year);
      registrationPayment.SetValueDate(paymentDate.Value);

      // TODO: code & amounts
      registrationPayment.SetPaymentCode("PaymentCode");
      registrationPayment.SetTaxAmount(0);
      registrationPayment.SetSanctionAmount(0);
      registrationPayment.SetTotalAmount(0);

      registryCommunication.SetDebtAmount(
        registrationPayment.TaxAmount + registrationPayment.SanctionAmount + registrationPayment.TotalAmount);

      registryCommunication.SetPayment(registrationPayment);
    }

    return registryCommunication;
  }

  public IQueryable<RegistryCommunicationGroup> QueryGroups(bool isConfirmed)
  {
    if (isConfirmed)
    {
      return _registryCommunicationRepository
        .AsQueryable(new ConfirmedRegistryCommunicationSpec())
        .GroupBy(communication => new
        {
          communication.Contract!.ManagementSubjectId,
          IsActivecontractType = communication.Contract.Type.IsActive,
          CommunicationType = communication.Type,
          communication.EndDate,
          communication.Date,
          RequestingSubjectLegalRepresentativeId = communication.RequestingSubjectLegalRepresentativeId!.Value,
          DebtBankAccountId = communication.DebtBankAccountId!.Value
        })
        .Select(group =>
          new RegistryCommunicationGroup
          {
            Id = new RegistryCommunicationGroupId
            {
              ManagementSubjectId = group.Key.ManagementSubjectId,
              IsActiveContract = group.Key.IsActivecontractType,
              CommunicationType = group.Key.CommunicationType,
              EndDate = group.Key.EndDate,
              Date = group.Key.Date,
              RequestingSubjectLegalRepresentativeId = group.Key.RequestingSubjectLegalRepresentativeId,
              DebtBankAccountId = group.Key.DebtBankAccountId
            },
            DebtAmount = group.Sum(communication => communication.DebtAmount),
            AnomaliesCount = group.Sum(communication => communication.Anomalies.Count)
          });
    }

    return _registryCommunicationRepository
        .AsQueryable(new TemporaryRegistryCommunicationSpec())
        .GroupBy(communication => new
        {
          communication.Contract!.ManagementSubjectId,
          IsActivecontractType = communication.Contract.Type.IsActive,
          CommunicationType = communication.Type,
          communication.EndDate
        })
        .Select(group =>
          new RegistryCommunicationGroup
          {
            Id = new RegistryCommunicationGroupId
            {
              ManagementSubjectId = group.Key.ManagementSubjectId,
              IsActiveContract = group.Key.IsActivecontractType,
              CommunicationType = group.Key.CommunicationType,
              EndDate = group.Key.EndDate
            },
            DebtAmount = group.Sum(communication => communication.DebtAmount),
            AnomaliesCount = group.Sum(communication => communication.Anomalies.Count)
          });
  }

  public IQueryable<ConfirmedRegistryCommunicationGroupIdWithOffice> QueryConfirmedGroupsIdsWithOffice(
    ConfirmedRegistryCommunicationGroupId groupId)
    => _registryCommunicationRepository
        .AsQueryable(new ConfirmedRegistryCommunicationByGroupIdSpec(groupId))
        .GroupBy(communication => new
        {
          communication.Contract!.ManagementSubjectId,
          IsActivecontractType = communication.Contract.Type.IsActive,
          CommunicationType = communication.Type,
          communication.EndDate,
          communication.Date,
          RequestingSubjectLegalRepresentativeId = communication.RequestingSubjectLegalRepresentativeId!.Value,
          DebtBankAccountId = communication.DebtBankAccountId!.Value,
          OfficeExternalCode = communication.Contract!.RegistrationTaxData!.RegistrationOffice!.ExternalCode
        })
        .Select(group => new ConfirmedRegistryCommunicationGroupIdWithOffice
        {
          ManagementSubjectId = group.Key.ManagementSubjectId,
          IsActiveContract = group.Key.IsActivecontractType,
          CommunicationType = group.Key.CommunicationType,
          EndDate = group.Key.EndDate,
          Date = group.Key.Date,
          RequestingSubjectLegalRepresentativeId = group.Key.RequestingSubjectLegalRepresentativeId,
          DebtBankAccountId = group.Key.DebtBankAccountId,
          OfficeExternalCode = group.Key.OfficeExternalCode
        });

  private static string GetCadastreUnitType(CadastralUnit cadastralUnit)
  {
    //This procedure assumes the declaration is for Italy
    return cadastralUnit.Type switch
    {
      EstateUnitType.BuildingArea => "T",
      EstateUnitType.Building => "U",
      EstateUnitType.UrbanArea => "U",
      EstateUnitType.Ground => "T",
      EstateUnitType.Other => "U",
      _ => "U"
    };
  }

  /// <summary>
  /// Calculates the registry fee based on the contract type and the property type.
  /// </summary>
  /// <param name="unit">The Estate Unit to calculate the fee for.</param>
  /// <param name="baseContractRate">The base (when applicable, revalued) contract rate.</param>
  /// <param name="yearsToPay">If renewal or first year, set the number of years to pay. If transfering or closing, the number of years to the end of the contract.</param>
  /// <param name="isAgreedFee">If the contract rate is "Canone Concordato".</param>
  /// <param name="isFirstYear"></param>
  /// <param name="isClosureOrTransfer"></param>
  /// <param name="currentInterestRate">The interest rate for the year of the calculation.</param>
  /// <param name="cashDepositByThirdPartiesAmount">The amount of cash deposit by third parties (not tenants nor landlords).</param>
  /// <returns></returns>
  internal decimal CalculateRegistryFee(
    EstateUnit unit,
    decimal baseContractRate,
    int yearsToPay,
    bool isAgreedFee,
    bool isFirstYear,
    bool isClosureOrTransfer,
    decimal currentInterestRate,
    decimal cashDepositByThirdPartiesAmount)
  {
    //This procedure assumes the declaration is for Italy
    if (isAgreedFee)
    {
      //"Canone concordato" gets a reduction of the base rate
      baseContractRate *= 0.7m;
    }

    var isInstrumental = unit.CurrentCadastralUnit?.Income.CadastralCategory?.IsInstrumental
      ?? false;

    var isResidential = (unit.CurrentCadastralUnit?.Income.CadastralCategory?.ExternalCode?.StartsWith('A')
      ?? false)
        && !isInstrumental;

    var isLand = unit.Type is EstateUnitType.Ground or EstateUnitType.BuildingArea;

    _logger.LogDebug("Calculating registry fee for {UnitId} with base rate {BaseRate} and years to pay {YearsToPay}",
      unit.Id, baseContractRate, yearsToPay);
    _logger.LogDebug("Is first year {IsFirstYear}, is renewal {IsRenewal}, is closure or transfer {IsClosureOrTransfer}",
      isFirstYear, isAgreedFee, isClosureOrTransfer);
    _logger.LogDebug("Is residential {IsResidential}, is land {IsLand}, is instrumental {IsInstrumental}",
      isResidential, isLand, isInstrumental);

    // Determine the registry fee percentage based on the type of property
    decimal registryFeePercentage;
    if (isResidential)
    {
      registryFeePercentage = 0.02m; // 2%
    }
    else if (isInstrumental)
    {
      //TODO Discriminate if the payer is VAT subject or not - for now, assume
      // the payer is subject.
      var isVatSubject = true;

      registryFeePercentage = isVatSubject ? 0.01m : 0.02m; // Assuming 2% as VAT status is unknown
    }
    else if (isLand)
    {
      registryFeePercentage = 0.005m; // 0.50%
    }
    else
    {
      registryFeePercentage = 0.02m; // 2% for other properties
    }

    _logger.LogDebug("Registry fee percentage is {RegistryFeePercentage}",
      registryFeePercentage);

    decimal registryFee;

    if (isClosureOrTransfer)
    {
      // For closures and transfers without consideration of urban properties with multi-year duration, fixed fee
      if (isResidential && yearsToPay > 1)
      {
        registryFee = 67m;
      }
      else
      {
        // Tax applied to the rents still due
        registryFee = baseContractRate * yearsToPay
          * (isLand ? 0.005m : 0.02m); // 0.50% for land and 2% for other properties
      }

      _logger.LogDebug("Registry fee for closure or transfer is {RegistryFee}",
        registryFee);
    }
    else
    {
      // Calculate the registry fee based on the annual rent and number of years
      registryFee = baseContractRate * yearsToPay * registryFeePercentage;

      _logger.LogDebug("Registry fee for renewal or first year is {RegistryFee}", registryFee);

      // Apply minimum fee for the first year
      if (isFirstYear && registryFee < 67m)
      {
        if (yearsToPay > 1)
        {
          // Force the first year to have a minimum fee of 67EUR
          registryFee = 67m + (baseContractRate * (yearsToPay - 1) * registryFeePercentage);
          _logger.LogDebug("Minimum fee for first year is 67 EUR, total is now {RegistryFee}", registryFee);
        }
        else
        {
          registryFee = 67m;
          _logger.LogDebug("Minimum fee for first year is 67 EUR");
        }
      }

      // Apply discount if paying for the entire duration upfront
      if (isFirstYear && yearsToPay > 1)
      {
        // Discount is half the legal interest rate, multiplied by each year
        decimal discountRate = currentInterestRate / 2 * yearsToPay;
        decimal discountAmount = registryFee * discountRate;
        registryFee -= discountAmount;

        _logger.LogDebug("Discount applied for first year is {DiscountAmount} EUR, total is now {RegistryFee}",
          discountRate, registryFee);
      }
    }

    // Calculate tax on cash deposit by third parties
    if (cashDepositByThirdPartiesAmount > 0)
    {
      decimal cashDepositTax = cashDepositByThirdPartiesAmount * 0.005m; // 0.50%
      registryFee += cashDepositTax;

      _logger.LogDebug("Cash deposit tax applied is {CashDepositTax} EUR, total is now {RegistryFee}",
        cashDepositTax, registryFee);
    }

    return registryFee;
  }

  public Task<RegistryCommunicationGroup?> GetGroupAsync(
    RegistryCommunicationGroupId id,
    CancellationToken cancellationToken)
  {
    IQueryable<RegistryCommunication> baseQuery = _registryCommunicationRepository
      .AsQueryable(
        id.IsConfirmed
          ? new ConfirmedRegistryCommunicationByGroupIdSpec(id.AsConfirmedGroupId())
          : new TemporaryRegistryCommunicationByGroupIdSpec(id.AsTemporaryGroupId()));

    IQueryable<RegistryCommunicationGroup> query;

    if (id.IsConfirmed)
    {
      query = baseQuery
        .GroupBy(communication => new
        {
          communication.Contract!.ManagementSubjectId,
          IsActivecontractType = communication.Contract.Type.IsActive,
          CommunicationType = communication.Type,
          communication.EndDate,
          communication.Date,
          RequestingSubjectLegalRepresentativeId = communication.RequestingSubjectLegalRepresentativeId!.Value,
          DebtBankAccountId = communication.DebtBankAccountId!.Value
        })
        .Select(group => new RegistryCommunicationGroup
        {
          Id = new RegistryCommunicationGroupId
          {
            ManagementSubjectId = group.Key.ManagementSubjectId,
            IsActiveContract = group.Key.IsActivecontractType,
            CommunicationType = group.Key.CommunicationType,
            EndDate = group.Key.EndDate,
            Date = group.Key.Date,
            RequestingSubjectLegalRepresentativeId = group.Key.RequestingSubjectLegalRepresentativeId,
            DebtBankAccountId = group.Key.DebtBankAccountId,
          },
          DebtAmount = group.Sum(communication => communication.DebtAmount),
          AnomaliesCount = group.Sum(communication => communication.Anomalies.Count)
        });
    }
    else
    {
      query = baseQuery
        .GroupBy(communication => new
        {
          communication.Contract!.ManagementSubjectId,
          IsActivecontractType = communication.Contract.Type.IsActive,
          CommunicationType = communication.Type,
          communication.EndDate
        })
        .Select(group => new RegistryCommunicationGroup
        {
          Id = new RegistryCommunicationGroupId
          {
            ManagementSubjectId = group.Key.ManagementSubjectId,
            IsActiveContract = group.Key.IsActivecontractType,
            CommunicationType = group.Key.CommunicationType,
            EndDate = group.Key.EndDate
          },
          DebtAmount = group.Sum(communication => communication.DebtAmount),
          AnomaliesCount = group.Sum(communication => communication.Anomalies.Count)
        });
    }

    return query.FirstOrDefaultAsync(cancellationToken);
  }

  private static decimal? CalculateGrossCadastralIncome(CadastralUnit unit)
  {
    switch (unit.Type)
    {
      case EstateUnitType.UrbanArea or EstateUnitType.Ground:
        return unit.Income.FarmAmount + unit.Income.LandAmount;

      case EstateUnitType.BuildingArea:
        if (!int.TryParse(unit.Income.MicroCategory, CultureInfo.InvariantCulture, out var microCategory))
        {
          return null;
        }

        return unit.Income.RegisteredSurface * microCategory * unit.Income.MarketValue;

      case EstateUnitType.Building or EstateUnitType.Other:
        return unit.Income.CadastralAmount;

      default:
        throw new NotSupportedException();
    }
  }
}
