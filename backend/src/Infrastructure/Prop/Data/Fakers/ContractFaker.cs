using Bogus;
using RealGimm.Core.Common;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class ContractFaker : BaseSeededFaker<Contract>
{
  private int _generatedContractsCount = 0;

  public required IEnumerable<BillItemType> BillItemTypes { get; init; }
  public IEnumerable<int> ManagementSubjectsIds { get; private set; } = Enumerable.Empty<int>();
  public IEnumerable<ContractType> ContractTypes { get; private set; } = Enumerable.Empty<ContractType>();
  public RegistrationTaxFaker RegistrationTaxFaker { get; private set; } = default!;
  public RevaluationFaker RevaluationFaker { get; private set; } = default!;
  public required Func<int, bool, LocatedUnitFaker> LocatedUnitFakerFactory { get; init; }
  public CounterpartFaker CounterpartFaker { get; private set; } = default!;
  public TransactorFaker TransactorFaker { get; private set; } = default!;
  public SecurityDepositFaker SecurityDepositFaker { get; private set; } = default!;
  public TakeoverFaker TakeoverFaker { get; private set; } = default!;
  public BillingPauseFaker BillingPauseFaker { get; private set; } = default!;
  public RatePlanFaker RatePlanFaker { get; private set; } = default!;
  public OneshotAdditionFaker OneshotAdditionFaker { get; private set; } = default!;
  public RecurringAdditionFaker RecurringAdditionFaker { get; private set; } = default!;

  public ContractFaker()
  {
    CustomInstantiator(faker =>
    {
      var contract = new Contract();
      contract.SetStatus(PickStatus(faker));
      contract.SetInternalCode(GenerateInternalCode(number: _generatedContractsCount + 1));
      contract.SetExternalCode(GenerateExternalCode(faker));
      contract.SetPreviousCode(GeneratePreviousCode(faker));
      contract.SetManagementSubjectId(PickManagementSubjectsId(faker, ManagementSubjectsIds));
      contract.SetType(PickRandomContractType(faker, ContractTypes));
      contract.SetReason(PickReason(faker));

      var (agreementDate, effectStartDate, lastRenewalStartDate) = GenerateDates(faker);
      contract.SetAgreementDate(agreementDate);
      contract.SetEffectStartDate(effectStartDate);
      contract.SetLastRenewalStartDate(lastRenewalStartDate);

      var firstTermDetails = GenerateTermDetails(faker);
      contract.SetFirstTermDetails(firstTermDetails?.DurationMonths, firstTermDetails?.ExpirationDate);

      var secondTermDetails = GenerateTermDetails(faker);
      contract.SetSecondTermDetails(secondTermDetails?.DurationMonths, secondTermDetails?.ExpirationDate);

      var (anytimeTerminationWarningMonths, nonRenewalWarningMonths) = GenerateWarningMonths(faker);
      contract.SetWarningMonths(anytimeTerminationWarningMonths, nonRenewalWarningMonths);

      contract.SetBillingStartDate(GenerateBillingStartDate(faker));
      contract.SetBillingAfterTerm(GenerateBillingAfterTerm(faker));
      contract.SetRecoverBillsAfterSuspension(GenerateRecoverBillsAfterSuspension(faker));
      contract.SetBillingAlignedToCalendarYear(GenerateBillingAlignedToCalendarYear(faker));

      var (appliesBillingBaseFee, billingBaseFee, billingBaseFeeBillItemType, billingVATRateType)
        = GenerateBillingBaseFeeDetails(faker, BillItemTypes!);
      contract.SetBillingBaseFee(appliesBillingBaseFee, billingBaseFee, billingBaseFeeBillItemType);
      contract.SetBillingVATRateType(billingVATRateType);

      contract.SetBillingPeriod(PickBillingPeriod(faker));
      contract.SetBillingWithSplitPayment(GenerateBillingWithSplitPayment(faker));
      contract.SetBillingWithStampTax(PickBillingWithStampTax(faker));
      contract.SetBillingNotes(GenerateBillingNotes(faker));
      contract.SetNotes(GenerateNotes(faker));

      if (GenerateShouldContractBeReleased(faker))
      {
        var (releaseReason, releaseDate, isOccupiedWithoutRight) = GenerateReleaseDetails(faker, effectStartDate);
        contract.SetReleaseDetails(releaseReason, releaseDate, isOccupiedWithoutRight);
      }

      var (contractTerminator, terminationDate) = GenerateTerminationData(faker, effectStartDate);
      contract.SetTerminationData(contractTerminator, terminationDate);

      contract.SetRegistrationTaxData(RegistrationTaxFaker.CitiesIds.Any() ? RegistrationTaxFaker.Generate() : null);
      contract.SetRevaluationData(RevaluationFaker.Generate());

      var locatedUnitFaker = LocatedUnitFakerFactory!.Invoke(contract.ManagementSubjectId, contract.Type.IsActive);
      var locatedUnitsCount = faker.Random.Int(1, Math.Min(2, locatedUnitFaker.EstateSubUnitsByUnitsIds.Count));
      for (var i = 0; i < locatedUnitsCount; i++)
      {
        var locatedUnit = locatedUnitFaker.Generate();
        contract.LocatedUnits.Add(locatedUnit);

        locatedUnitFaker.EstateSubUnitsByUnitsIds.Remove(locatedUnit.EstateUnitId);
      }

      contract.LocatedUnits[0].SetIsMainUnit(true);

      contract.Counterparts.AddRange(CounterpartFaker.Generate(faker.Random.Int(2, 3)));
      contract.Counterparts[0].SetIsMainCounterpart(true);
      contract.Counterparts[0].SetContractSharePercent(100 - contract.Counterparts
        .Except([contract.Counterparts[0]])
        .Select(counterpart => counterpart.ContractSharePercent)
        .DefaultIfEmpty(0)
        .Sum());

      contract.Transactors.AddRange(TransactorFaker.Generate(faker.Random.Int(1, 2)));
      contract.Transactors[0].SetTransactionSharePercent(100 - contract.Transactors
        .Except([contract.Transactors[0]])
        .Select(transactor => transactor.TransactionSharePercent)
        .DefaultIfEmpty(0)
        .Sum());

      var securityDeposits = SecurityDepositFaker.Generate(faker.Random.Int(0, 2));
      foreach (var sd in securityDeposits)
      {
        contract.AddSecurityDeposit(sd);
      }
      contract.Takeovers.AddRange(TakeoverFaker.Generate(faker.Random.Int(0, 2)));
      contract.BillingPauses.AddRange(BillingPauseFaker.Generate(faker.Random.Int(0, 2)));
      contract.RatePlans.AddRange(RatePlanFaker.Generate(faker.Random.Int(0, 2)));
      contract.OneshotAdditions.AddRange(OneshotAdditionFaker.Generate(faker.Random.Int(0, 2)));
      contract.RecurringAdditions.AddRange(RecurringAdditionFaker.Generate(faker.Random.Int(0, 2)));

      return contract;
    });

    FinishWith((_, contract) =>
    {
      var validationErrors = contract.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(Contract)} entity! Errors: {errorMessages}");
      }

      _generatedContractsCount++;
    });
  }

  public static (int DurationMonths, DateOnly ExpirationDate)? GenerateTermDetails(Faker faker)
  {
    if (faker.Random.Bool())
    {
      return null;
    }

    var durationMonths = faker.Random.Int(1, 11);
    var expirationDate = faker.Date.FutureDateOnly(refDate: new DateOnly(2024, 01, 01));

    return (durationMonths, expirationDate);
  }

  public static EntryStatus PickStatus(Faker faker)
  {
    if (faker.Random.Bool(weight: 0.8f))
    {
      return EntryStatus.Working;
    }

    return faker.PickRandomWithout<EntryStatus>(exclude: EntryStatus.Working);
  }

  public static string GenerateInternalCode(int number) => $"CA{number.ToString().PadLeft(5, '0')}";

  public static string GenerateExternalCode(Faker faker) => faker.Random.AlphaNumeric(10).ToUpper();

  public static string GeneratePreviousCode(Faker faker) => GenerateExternalCode(faker);

  public static int PickManagementSubjectsId(Faker faker, IEnumerable<int> managementSubjectsIds)
    => faker.PickRandom(managementSubjectsIds);

  public static ContractType PickRandomContractType(Faker faker, IEnumerable<ContractType> contractTypes)
    => faker.PickRandom(contractTypes);

  public static Reason PickReason(Faker faker) => faker.PickRandom<Reason>();

  public static (DateOnly AgreementDate, DateOnly EffectStartDate, DateOnly LastRenewalStartDate) GenerateDates(Faker faker)
  {
    var effectStartDate = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));
    var agreementDate = faker.Date.PastDateOnly(refDate: effectStartDate);
    var lastRenewalStartDate = agreementDate;

    return (agreementDate, effectStartDate, lastRenewalStartDate);
  }

  public static (int? AnytimeTerminationWarningMonths, int? NonRenewalWarningMonths) GenerateWarningMonths(Faker faker)
  {
    var anytimeTerminationWarningMonths = faker.Random.Bool() ? faker.Random.Int(1, 6) : (int?)null;
    var nonRenewalWarningMonths = faker.Random.Bool() ? faker.Random.Int(1, 6) : (int?)null;

    return (anytimeTerminationWarningMonths, nonRenewalWarningMonths);
  }

  public static DateOnly GenerateBillingStartDate(Faker faker)
    => faker.Date.FutureDateOnly(refDate: new DateOnly(2024, 01, 01));

  public static bool GenerateRecoverBillsAfterSuspension(Faker faker) => faker.Random.Bool();

  public static bool GenerateBillingAlignedToCalendarYear(Faker faker) => faker.Random.Bool();

  public static (bool AppliesBaseFee, decimal? BaseFee, BillItemType? BillingBaseFeeBillItemType, VATRateType?) GenerateBillingBaseFeeDetails( 
    Faker faker,
    IEnumerable<BillItemType> billItemTypes)
  {
    var appliesBaseFee = faker.Random.Bool();

    if (!appliesBaseFee)
    {
      return (false, null, null, null);
    }

    var baseFee = decimal.Round(faker.Random.Decimal(1, 1000), 2);
    var billingBaseFeeBillItemType = faker.PickRandom(billItemTypes);
    var billingVATRateType = faker.PickRandom<VATRateType>();

    return (appliesBaseFee, baseFee, billingBaseFeeBillItemType, billingVATRateType);
  }

  public static (ContractTerminator? ContractTerminator, DateOnly? TerminationDate) GenerateTerminationData(Faker faker, DateOnly effectStartDate)
  {
    ContractTerminator? contractTerminator = null;
    DateOnly? terminationDate = null;

    if (faker.Random.Bool(weight: 0.1f))
    {
      contractTerminator = faker.PickRandom<ContractTerminator>();
      terminationDate = faker.Date.FutureDateOnly(refDate: effectStartDate);
    }

    return (contractTerminator, terminationDate);
  }

  public static BillingPeriod PickBillingPeriod(Faker faker) => faker.PickRandom<BillingPeriod>();

  public static bool GenerateBillingWithSplitPayment(Faker faker) => faker.Random.Bool();

  public static AutomaticBoolean PickBillingWithStampTax(Faker faker) => faker.PickRandom<AutomaticBoolean>();

  public static string? GenerateBillingNotes(Faker faker) => GenerateNotes(faker);

  public static string? GenerateNotes(Faker faker)
    => faker.Random.Bool()
      ? faker.Lorem.Sentence(10, 5)
      : null;

  public static bool GenerateShouldContractBeReleased(Faker faker) => faker.Random.Bool(weight: 0.2f);

  public static (ReleaseReason Reason, DateOnly Date, bool IsOccupiedWithoutRight) GenerateReleaseDetails(
    Faker faker,
    DateOnly effectStartDate)
  {
    var reason = faker.PickRandom<ReleaseReason>();
    var date = faker.Date.FutureDateOnly(refDate: effectStartDate);

    return (reason, date, faker.Random.Bool());
  }

  public static bool GenerateBillingAfterTerm(Faker faker) => faker.Random.Bool();

  public ContractFaker UseManagementSubjectsIds(IEnumerable<int> managementSubjectsIds)
  {
    ManagementSubjectsIds = managementSubjectsIds ?? throw new ArgumentNullException(nameof(managementSubjectsIds));

    return this;
  }

  public ContractFaker UseContractTypes(IEnumerable<ContractType> contractTypes)
  {
    ContractTypes = contractTypes ?? throw new ArgumentNullException(nameof(contractTypes));

    return this;
  }

  public ContractFaker UseRegistrationTaxFaker(RegistrationTaxFaker registrationTaxFaker)
  {
    RegistrationTaxFaker = registrationTaxFaker ?? throw new ArgumentNullException(nameof(registrationTaxFaker));

    return this;
  }

  public ContractFaker UseRevolutionFaker(RevaluationFaker revaluationFaker)
  {
    RevaluationFaker = revaluationFaker ?? throw new ArgumentNullException(nameof(revaluationFaker));

    return this;
  }

  public ContractFaker UseCounterpartFaker(CounterpartFaker counterpartFaker)
  {
    CounterpartFaker = counterpartFaker ?? throw new ArgumentNullException(nameof(counterpartFaker));

    return this;
  }

  public ContractFaker UseTransactorFaker(TransactorFaker transactorFaker)
  {
    TransactorFaker = transactorFaker ?? throw new ArgumentNullException(nameof(transactorFaker));

    return this;
  }

  public ContractFaker UseSecurityDepositFaker(SecurityDepositFaker securityDepositFaker)
  {
    SecurityDepositFaker = securityDepositFaker ?? throw new ArgumentNullException(nameof(securityDepositFaker));

    return this;
  }

  public ContractFaker UseTakeoverFaker(TakeoverFaker takeoverFaker)
  {
    TakeoverFaker = takeoverFaker ?? throw new ArgumentNullException(nameof(takeoverFaker));

    return this;
  }

  public ContractFaker UseBillingPauseFaker(BillingPauseFaker billingPauseFaker)
  {
    BillingPauseFaker = billingPauseFaker ?? throw new ArgumentNullException(nameof(billingPauseFaker));

    return this;
  }

  public ContractFaker UseRatePlanFaker(RatePlanFaker ratePlanFaker)
  {
    RatePlanFaker = ratePlanFaker ?? throw new ArgumentNullException(nameof(ratePlanFaker));

    return this;
  }

  public ContractFaker UseOneshotAdditionFaker(OneshotAdditionFaker oneshotAdditionFaker)
  {
    OneshotAdditionFaker = oneshotAdditionFaker ?? throw new ArgumentNullException(nameof(oneshotAdditionFaker));

    return this;
  }

  public ContractFaker UseRecurringAdditionFaker(RecurringAdditionFaker recurringAdditionFaker)
  {
    RecurringAdditionFaker = recurringAdditionFaker ?? throw new ArgumentNullException(nameof(recurringAdditionFaker));

    return this;
  }
}
