using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Common.TaxConfigAggregate.Specifications;
using RealGimm.Core.Extensions;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Taxes.Interfaces;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Taxes.ItaIMU;

public partial class ItaIMU : ITaxCalculator
{
  private readonly string[] _nonApplicableRegions =
  [
    "ITH1", // SUD TIROLO
    "ITH2", // TRENTO
    "ITH4"  // FRIULI VENEZIA GIULIA
  ];

  public static readonly Guid CalculatorGuid = new("74b5b410-2231-4bfb-88f9-2d5b8e74c6f4");

  public Guid Identifier { get; } = CalculatorGuid;
  public string Description { get; } = "IMU";
  public required IRepository<TaxConfig> _taxConfigRepository { protected get; init; }
  public required IReadRepository<City> _cityRepository { protected get; init; }
  public required IRepository<CadastralUnit> _cadastralUnitRepository { protected get; init; }
  public required IRepository<Subject> _subjectRepository { private get; init; }
  public required ILogger<ItaIMU> _logger { protected get; init; }

  public Task<ITaxConfiguration> GetConfigurationAsync()
    => Task.FromResult<ITaxConfiguration>(new ItaIMUConfiguration(_taxConfigRepository));

  public async Task<bool> CheckApplicabilityAsync(CadastralUnit unit)
    => (await SelectApplicableUnitsAsync([unit], excludeTaxDisabled: false, CancellationToken.None)).Any();

  public async Task<ConfigSection> GetCadastralUnitFormAsync(CadastralUnit unit)
    => (await GetFormsPerUnitAsync([unit], CancellationToken.None))[unit];

  private async Task<Dictionary<CadastralUnit, ConfigSection>> GetFormsPerUnitAsync(
    IEnumerable<CadastralUnit> units,
    CancellationToken cancellationToken)
  {
    var ratesPerUnits = await GetRatesPerUnitAsync(units, DateTime.UtcNow.Year, cancellationToken);
    return units.ToDictionary(unit => unit, unit => GetCadastralUnitFormCore(ratesPerUnits[unit]));
  }

  public async Task<bool> UpdateAsync(CadastralUnit unit, CancellationToken cancellationToken)
    => (await UpdateBatchAsync([unit], cancellationToken)) == 1;

  public async Task<int> UpdateBatchAsync(IEnumerable<CadastralUnit> units, CancellationToken cancellationToken)
  {
    var updatedUnitsCount = 0;
    var year = DateTime.UtcNow.Year;
    var applicableUnits = await SelectApplicableUnitsAsync(units, excludeTaxDisabled: true, cancellationToken);

    var statusesPerUnit = await GetStatusesPerUnit(applicableUnits, year, cancellationToken);

    foreach (var unit in applicableUnits)
    {
      var updated = await UpdateCore(unit, year, statusesPerUnit[unit], cancellationToken);
      if (!updated)
      {
        continue;
      }

      _cadastralUnitRepository.UpdateSuspend(unit);
      updatedUnitsCount++;
    }

    await _cadastralUnitRepository.SaveChangesAsync(cancellationToken);

    return updatedUnitsCount;
  }

  private ConfigSection GetCadastralUnitFormCore(IEnumerable<TaxConfigSubValue> rates)
  {
    ConfigField[][] configForm =
    [
      [
        new ConfigField(
          "imu-enabled",
          true,
          new Guid("461cba5e-f200-462d-8e3a-35d1f1b87068"),
          CrossModule.CustomFieldType.SingleItemFromList,
          new Dictionary<string, string>{{"true", "Si"}, {"false", "No"}}),

        new ConfigField(
          "imu-variation",
          true,
          new Guid("3b5c017e-7737-43f1-bbef-bc6337b08c42"),
          CrossModule.CustomFieldType.SingleItemFromList,
          new Dictionary<string, string>{{"true", "Si"}, {"false", "No"}}),

        new ConfigField(
          "imu-exemption",
          true,
          new Guid("f7384d37-26a2-474e-a25c-002015d45dfa"),
          CrossModule.CustomFieldType.SingleItemFromList,
          new Dictionary<string, string>{{"0", "Nessuna"}, {"1", "Escluso"}, {"2", "Esente"}}),
      ],
      [
        new ConfigField(
          "imu-rate",
          true,
          new Guid("529b61c2-5632-4e64-8b56-aab85886518a"),
          CrossModule.CustomFieldType.SingleItemFromList,
          rates.ToDictionary(k => k.Id.ToString(), k => k.Label)),

        new ConfigField(
          "imu-ownership-start",
          true,
          new Guid("aaf7f085-6182-48bd-a662-4a48ce3fa840"),
          CrossModule.CustomFieldType.Date,
          null),

        new ConfigField(
          "imu-ownership-end",
          false,
          new Guid("bf909dfa-8d34-4138-a45d-339d5c0fc051"),
          CrossModule.CustomFieldType.Date,
          null),

        new ConfigField(
          "imu-last-cadastre-update",
          false,
          new Guid("18b03619-d2ba-4f8f-955a-53413d28b5d8"),
          CrossModule.CustomFieldType.Date,
          null),
      ]
    ];

    return new ConfigSection(Description, Identifier, configForm);
  }

  private async Task<bool> UpdateCore(CadastralUnit unit, int year, IMUUnitStatus status, CancellationToken cancellationToken)
  {
    var managementSubject = await _subjectRepository.AsQueryable(new GetByIdSpec<Subject>(unit.EstateUnit!.ManagementSubjectId))
                                                    .Include(e => e.BankAccounts).FirstOrDefaultAsync(cancellationToken);

    var currentTp = unit.TaxPayments.FirstOrDefault(
      tp => tp.TaxCalculatorId == Identifier
        && tp.Year == year
    );

    var totalAmount = (status.FirstHalf.PaymentAmount ?? 0)
      + (status.SecondHalf?.PaymentAmount ?? 0);

    if (currentTp is null)
    {
      currentTp = new AssetTaxCalculation();
      currentTp.SetData(
        Description,
        Identifier,
        year,
        totalAmount,
        2);

      var firstPayment = new AssetTaxPayment();
      firstPayment.SetData(
        DateOnly.FromDateTime(DateTime.UtcNow),
        status.FirstHalf.PaymentAmount ?? 0,
        [0],
        status.FirstHalf.Issue,
        status.FirstPaymentDate,
        status.FirstHalf.PropertyMonths,
        unit.EstateUnit!.ManagementSubjectId,
        managementSubject!.BankAccounts.FirstOrDefault(e => e.BankAccountType == BankAccountType.Main)?.Id);

      firstPayment.SetActualizedCadastralIncome(status.FirstHalf.ActualizedCadastralIncome);
      firstPayment.SetBaseTaxableAmount(status.FirstHalf.BaseTaxableAmount);
      firstPayment.SetGrossCadastralIncome(status.FirstHalf.GrossCadastralIncome);

      currentTp.Installments.Add(firstPayment);

      if (status.SecondPaymentDate.HasValue
        && status.SecondHalf is not null)
      {
        var secondPayment = new AssetTaxPayment();
        secondPayment.SetData(
          DateOnly.FromDateTime(DateTime.UtcNow),
          status.SecondHalf.PaymentAmount ?? 0,
          [1],
          status.SecondHalf.Issue,
          status.SecondPaymentDate.Value,
          status.SecondHalf.PropertyMonths,
          unit.EstateUnit!.ManagementSubjectId,
          managementSubject!.BankAccounts.FirstOrDefault(e => e.BankAccountType == BankAccountType.Main)?.Id);

        secondPayment.SetActualizedCadastralIncome(status.SecondHalf.ActualizedCadastralIncome);
        secondPayment.SetBaseTaxableAmount(status.SecondHalf.BaseTaxableAmount);
        secondPayment.SetGrossCadastralIncome(status.SecondHalf.GrossCadastralIncome);

        currentTp.Installments.Add(secondPayment);
      }
      unit.TaxPayments.Add(currentTp);
    }
    else
    {
      //If there's nothing to change, don't update - just return
      var first = currentTp.Installments.OrderBy(i => i.ExpectedDueDate).First();
      var last = currentTp.Installments.OrderBy(i => i.ExpectedDueDate).Last();

      if (currentTp.TotalAmount == totalAmount
        && ((first.Id != last.Id
            && first.AmountPaid == (status.FirstHalf.PaymentAmount ?? 0)
            && last.AmountPaid == (status.SecondHalf?.PaymentAmount ?? 0))
          || (first.Id == last.Id
            && first.AmountPaid == totalAmount)))
      {
        //It either was a single complete payment or two payments that did not change
        // (it may also just be the first installment that was the only one calculated)
        //Just skip, don't update anything
        return true;
      }

      //Cases:
      // a. First payment pays only first installment, not definitive -> update
      // b. First payment pays first installment, definitive -> difference goes to second
      // c. First payment pays both installments, not definitive -> update
      // d. First pays both, definitive -> add third installment

      var secondPayment = status.SecondHalf?.PaymentAmount ?? 0;
      var secondInstallmentIndex = 1;

      if (!first.IsDefinitive)
      {
        //Will update if required
        if (first.InstallmentsPaid.Length == 1
            && first.AmountPaid != (status.FirstHalf.PaymentAmount ?? 0))
        {
          first.SetData(
            DateOnly.FromDateTime(DateTime.UtcNow),
            status.FirstHalf.PaymentAmount ?? 0,
            first.InstallmentsPaid,
            status.FirstHalf.Issue,
            status.FirstPaymentDate,
            status.FirstHalf.PropertyMonths,
            unit.EstateUnit!.ManagementSubjectId,
            managementSubject!.BankAccounts.FirstOrDefault(e => e.BankAccountType == BankAccountType.Main)?.Id);

          first.SetActualizedCadastralIncome(status.FirstHalf.ActualizedCadastralIncome);
          first.SetBaseTaxableAmount(status.FirstHalf.BaseTaxableAmount);
          first.SetGrossCadastralIncome(status.FirstHalf.GrossCadastralIncome);
        }
        else if (first.InstallmentsPaid.Length == 2
        && first.AmountPaid != totalAmount)
        {
          first.SetData(
            DateOnly.FromDateTime(DateTime.UtcNow),
            totalAmount,
            first.InstallmentsPaid,
            status.FirstHalf.Issue,
            status.FirstPaymentDate,
            status.FirstHalf.PropertyMonths,
            unit.EstateUnit!.ManagementSubjectId,
            managementSubject!.BankAccounts.FirstOrDefault(e => e.BankAccountType == BankAccountType.Main)?.Id);

          first.SetActualizedCadastralIncome(status.FirstHalf.ActualizedCadastralIncome);
          first.SetBaseTaxableAmount(status.FirstHalf.BaseTaxableAmount);
          first.SetGrossCadastralIncome(status.FirstHalf.GrossCadastralIncome);
        }
      }
      else
      {
        //If first payment is definitive, any difference goes into the second
        var firstDifference = first.InstallmentsPaid.Length == 1
            ? (status.FirstHalf.PaymentAmount ?? 0) - first.AmountPaid
            : totalAmount - first.AmountPaid;

        secondPayment += firstDifference;

        secondInstallmentIndex = first.InstallmentsPaid.Length;
      }

      //If there's a second installment to check, check it.
      if (status.SecondPaymentDate.HasValue
        && status.SecondHalf is not null)
      {
        if (last.Id != first.Id)
        {
          //The second installment already exists.
          //Update it if it is not definitive.
          if (!last.IsDefinitive)
          {
            last.SetData(
              DateOnly.FromDateTime(DateTime.UtcNow),
              secondPayment,
              [secondInstallmentIndex],
              status.SecondHalf.Issue,
              status.SecondPaymentDate.Value,
              status.SecondHalf.PropertyMonths,
              unit.EstateUnit!.ManagementSubjectId,
              managementSubject!.BankAccounts.FirstOrDefault(e => e.BankAccountType == BankAccountType.Main)?.Id);

            last.SetActualizedCadastralIncome(status.SecondHalf.ActualizedCadastralIncome);
            last.SetBaseTaxableAmount(status.SecondHalf.BaseTaxableAmount);
            last.SetGrossCadastralIncome(status.SecondHalf.GrossCadastralIncome);

            if (!(currentTp.ExpectedInstallments > secondInstallmentIndex))
            {
              currentTp.SetExpectedInstallments(secondInstallmentIndex + 1);
            }
          }
          else
          {
            _logger.LogError("Wanted to update second payment for IMU for cadastral unit {cadastralUnitId} but it was already definitive",
              unit.Id);
          }
        }
        else
        {
          //The second installment does not exist. Create it.
          var newPayment = new AssetTaxPayment();

          newPayment.SetData(
            DateOnly.FromDateTime(DateTime.UtcNow),
            secondPayment,
            [secondInstallmentIndex],
            status.SecondHalf.Issue,
            status.SecondPaymentDate.Value,
            status.SecondHalf.PropertyMonths,
            unit.EstateUnit!.ManagementSubjectId,
            managementSubject!.BankAccounts.FirstOrDefault(e => e.BankAccountType == BankAccountType.Main)?.Id);

          newPayment.SetActualizedCadastralIncome(status.SecondHalf.ActualizedCadastralIncome);
          newPayment.SetBaseTaxableAmount(status.SecondHalf.BaseTaxableAmount);
          newPayment.SetGrossCadastralIncome(status.SecondHalf.GrossCadastralIncome);

          if (!(currentTp.ExpectedInstallments > secondInstallmentIndex))
          {
            currentTp.SetExpectedInstallments(secondInstallmentIndex + 1);
          }

          currentTp.Installments.Add(newPayment);
        }
      }
    }

    return true;
  }

  internal async Task<Dictionary<CadastralUnit, IMUUnitStatus>> GetStatusesPerUnit(
    IEnumerable<CadastralUnit> units,
    int year,
    CancellationToken cancellationToken)
  {
    var firstPaymentDate = new DateOnly(year, 06, 16);
    if (firstPaymentDate.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
    {
      firstPaymentDate = firstPaymentDate.NearestDay(DayOfWeek.Monday);
    }

    var secondPaymentDate = new DateOnly(year, 12, 16);
    if (secondPaymentDate.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
    {
      secondPaymentDate = secondPaymentDate.NearestDay(DayOfWeek.Monday);
    }

    var configsPerUnit = await GetMappedConfigPerUnitAsync(units, cancellationToken);
    var ratesPerUnit = await GetRatesPerUnitAsync(units, year, cancellationToken);

    return units.ToDictionary(
      unit => unit,
      unit =>
      {
        var firstSemester = CalculateSemester(
          unit,
          year,
          configsPerUnit[unit],
          ratesPerUnit[unit],
          isFirstSemester: true);

        var secondSemester = CalculateSemester(
          unit,
          year,
          configsPerUnit[unit],
          ratesPerUnit[unit],
          isFirstSemester: false);

        return new IMUUnitStatus(firstPaymentDate, secondPaymentDate, firstSemester, secondSemester);
      });
  }

  private static IMUUnitSemester CalculateSemester(
    CadastralUnit unit,
    int year,
    Dictionary<string, (ConfigField Template, CadastralUnitTaxConfig? Value)> config,
    IEnumerable<TaxConfigSubValue> rates,
    bool isFirstSemester)
  {
    var semester = new IMUUnitSemester();

    var grossCadastralIncome = CalculateGrossCadastralIncome();
    if (grossCadastralIncome is null)
    {
      semester.Issue = CalculationIssue.MissingCadastralIncomeData;
      return semester;
    }

    semester.GrossCadastralIncome = grossCadastralIncome.Value;
    semester.ActualizedCadastralIncome = semester.GrossCadastralIncome * 1.05m;

    var coefficient = unit.Income.CadastralCategory?.CadastralValueTaxFactor;
    if (coefficient is null)
    {
      semester.Issue = CalculationIssue.MissingCadastralCategory;
      return semester;
    }

    semester.BaseTaxableAmount = semester.ActualizedCadastralIncome * coefficient.Value;

    // first semester is scalculated with previous year's data, and
    // it's hoped that by the second semester the data will have been updated
    var rate = GetRate(rates);

    if (rate is null || rate <= 0)
    {
      semester.Issue = CalculationIssue.MissingOrZeroRate;
      return semester;
    }

    var (semesterStartDate, semesterEndDate) = isFirstSemester
      ? (new DateOnly(year, 01, 01), new DateOnly(year, 06, 30))
      : (new DateOnly(year, 07, 01), new DateOnly(year, 12, 31));

    var ownershipMonths = CalculateOwnershipMonths(semesterStartDate, semesterEndDate);
    if (ownershipMonths is null)
    {
      semester.Issue = CalculationIssue.MissingOrInvalidOwnershipDates;
      return semester;
    }

    semester.PropertyMonths = ownershipMonths.Value;

    // assumes ownership rate = 100%
    var paymentAmount = semester.BaseTaxableAmount * rate.Value * (semester.PropertyMonths / 12m);
    semester.PaymentAmount = decimal.Round(paymentAmount, 2, MidpointRounding.AwayFromZero);

    return semester;

    int? CalculateOwnershipMonths(DateOnly semesterStartDate, DateOnly semesterEndDate)
    {
      var ownershipStartDateConfig = config["imu-ownership-start"].Value;
      if (ownershipStartDateConfig is null ||
        !DateOnly.TryParse(ownershipStartDateConfig.Value, CultureInfo.InvariantCulture, out var owhershipStartDate))
      {
        return null;
      }

      DateOnly ownershipEndDate;
      var ownershipEndDateConfig = config["imu-ownership-end"].Value;

      if (ownershipEndDateConfig is null)
      {
        ownershipEndDate = DateTime.UtcNow.ToDateOnly();
      }
      else if (!DateOnly.TryParse(ownershipEndDateConfig.Value, CultureInfo.InvariantCulture, out ownershipEndDate))
      {
        return null;
      }

      if (owhershipStartDate.Year > ownershipEndDate.Year)
      {
        return null;
      }

      // ownership period is started after the semester ends or ended before the semester starts
      if (owhershipStartDate > semesterEndDate || ownershipEndDate < semesterStartDate)
      {
        return 0;
      }

      var ownershipStartDateWithinSemester = owhershipStartDate > semesterStartDate ? owhershipStartDate : semesterStartDate;
      var ownershipEndDateWithinSemester = ownershipEndDate < semesterEndDate ? ownershipEndDate : semesterEndDate;
      var ownershipMonths = ownershipEndDateWithinSemester.Month - ownershipStartDateWithinSemester.Month;

      if (ownershipEndDateWithinSemester.Month != ownershipStartDateWithinSemester.Month)
      {
        ownershipMonths++;
      }

      return ownershipMonths;
    }

    decimal? CalculateGrossCadastralIncome()
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

    decimal? GetRate(IEnumerable<TaxConfigSubValue> rates)
    {
      var rateConfig = config["imu-rate"].Value;
      if (rateConfig is null)
      {
        return null;
      }

      var rate = rates
        .SingleOrDefault(subValue => subValue.Code == rateConfig.Value)
        ?.NumberValue;

      return rate;
    }
  }

  private async Task<IEnumerable<CadastralUnit>> SelectApplicableUnitsAsync(
    IEnumerable<CadastralUnit> units,
    bool excludeTaxDisabled,
    CancellationToken cancellationToken)
  {
    // this tax calculator requires an address & valid city to work
    var filteredUnits = units
      .Where(unit => unit.Address?.CountryISO == CountryISO3.ITA)
      .Where(unit => unit.Address!.CityReference.HasValue)
      .ToList();

    var configsPerUnit = await GetMappedConfigPerUnitAsync(units, cancellationToken);

    if (excludeTaxDisabled)
    {
      filteredUnits = filteredUnits
        .Where(unit => configsPerUnit[unit]["imu-enabled"].Value is not null)
        .Where(unit => configsPerUnit[unit]["imu-enabled"].Value!.Value.IsHumanTrue())
        .ToList();
    }

    var unitsPerCities = await _cityRepository
      .AsQueryable(
        new CitiesByGuidsSpec(filteredUnits.Select(unit => unit.Address!.CityReference!.Value).Distinct()),
        new ExcludeCitiesByRegionsExternalCodesSpec(_nonApplicableRegions))
      .ToDictionaryAsync(
        city => city.Guid,
        city => filteredUnits.Where(unit => unit.Address!.CityReference!.Value == city.Guid),
        cancellationToken);

    return unitsPerCities.SelectMany(pair => pair.Value);
  }

  private async Task<Dictionary<CadastralUnit, IEnumerable<TaxConfigSubValue>>> GetRatesPerUnitAsync(
    IEnumerable<CadastralUnit> units,
    int year,
    CancellationToken cancellationToken)
  {
    var configs = await _taxConfigRepository
      .AsQueryable(
        new TaxConfigByCalculatorSpec(CalculatorGuid),
        new TaxConfigIncludeAllSpec(),
        new TaxConfigByTableYearSpec(ItaIMUConfiguration.TBL_RATES_BY_CITY, year))
      .ToListAsync(cancellationToken);

    return units.ToDictionary(
      unit => unit,
      unit => configs
        .FirstOrDefault(config => config.GroupingReference == unit.Address?.CityReference)
        ?.SubValues
        ?.Where(subValue => subValue.SubTable == TaxConfigurationBase.SUBTBL_RATES) ?? []);
  }

  private async Task<Dictionary<CadastralUnit, Dictionary<string, (ConfigField Template, CadastralUnitTaxConfig? Value)>>> GetMappedConfigPerUnitAsync(
    IEnumerable<CadastralUnit> units,
    CancellationToken cancellationToken)
    => (await GetFormsPerUnitAsync(units, cancellationToken))
      .ToDictionary(
        pair => pair.Key,
        pair => pair.Value
          .Form
          .SelectMany(fields => fields)
          .ToDictionary(
            field => field.Name!,
            field =>
            {
              var value = pair.Key.TaxConfig.SingleOrDefault(
                config => config.TaxCalculator == Identifier && config.TemplateTypeId == field.Id);

              return (Template: field, Value: value);
            }));

  public async Task UpdateToNewYearAsync(CancellationToken cancellationToken)
  {
    var year = DateTime.UtcNow.Year;

    //Get all new configuration for this year rates
    var configs = await _taxConfigRepository
      .AsQueryable(
        new TaxConfigByCalculatorSpec(CalculatorGuid),
        new TaxConfigIncludeAllSpec(),
        new TaxConfigByTableYearSpec(ItaIMUConfiguration.TBL_RATES_BY_CITY, year))
      .ToDictionaryAsync(
        tc => tc.GroupingReference ?? Guid.Empty,
        cancellationToken);

    var lastYearConfigs = await _taxConfigRepository
      .AsQueryable(
        new TaxConfigByCalculatorSpec(CalculatorGuid),
        new TaxConfigIncludeAllSpec(),
        new TaxConfigByTableYearSpec(ItaIMUConfiguration.TBL_RATES_BY_CITY, year - 1))
      .ToDictionaryAsync(
        tc => tc.GroupingReference ?? Guid.Empty,
        cancellationToken);

    //Get all cadastral units that have configurations for this tax calculator
    var units = await _cadastralUnitRepository
      .AsQueryable(
        new CadastralUnitByAssetTaxCalculatorConfigSpec(CalculatorGuid),
        new CadastralUnitIncludeAllSpec())
      .ToListAsync(cancellationToken);

    //Group units by city, then for each city update configuration for this year
    foreach (var cuGroup in units.GroupBy(c => c.Address!.CityReference ?? Guid.Empty))
    {
      var rates = configs.TryGetValue(cuGroup.Key, out var rateTable)
        ? rateTable.SubValues.ToList()
        : [];

      var lastYearRates = configs.TryGetValue(cuGroup.Key, out var rateTable2)
        ? rateTable2.SubValues.ToList()
        : [];

      if (rates.Count == 0)
      {
        _logger.LogWarning("No rates found for city {city}",
          cuGroup.First().Address!.CityName);

        //Do not exit here - set all rates to not configured if none is found
      }

      var cuToUpdate = new List<CadastralUnit>();

      foreach (var cu in cuGroup)
      {
        var oldRate = cu.TaxConfig
          .FirstOrDefault(c => c.TaxCalculator == CalculatorGuid && c.Code == "imu-rate");

        if (oldRate != null && oldRate.Value is not null)
        {
          var oldRateName = lastYearRates
            .FirstOrDefault(r => r.Id.ToString() == oldRate.Value)?.Label;

          if (!string.IsNullOrEmpty(oldRateName)
            && rates.FirstOrDefault(r => r.Label == oldRateName) is var newRate
            && newRate is not null)
          {
            //Replace the ID with the new one
            oldRate.SetValue(newRate.Id.ToString());

            cuToUpdate.Add(cu);
          }
        }
      }

      await _cadastralUnitRepository.UpdateRangeAsync(cuToUpdate, cancellationToken);
    }
  }
}
