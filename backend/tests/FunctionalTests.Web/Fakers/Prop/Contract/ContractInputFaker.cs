using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Infrastructure;
using RealGimm.Web.Prop.Models;
using System.Linq;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;

public sealed class ContractInputFaker : BaseSeededFaker<ContractInput>
{
  private int _generatedInputsCount = 0;

  public required IEnumerable<BillItemType> BillItemTypes { get; init; }
  public IEnumerable<int> ManagementSubjectsIds { get; private set; } = Enumerable.Empty<int>();
  public IEnumerable<ContractType> ContractTypes { get; private set; } = Enumerable.Empty<ContractType>();
  public RegistrationTaxInputFaker RegistrationTaxInputFaker { get; private set; } = default!;
  public RevaluationInputFaker RevaluationInputFaker { get; private set; } = default!;
  public required Func<int, bool, LocatedUnitInputFaker> LocatedUnitInputFakerFactory { get; init; }
  public CounterpartInputFaker CounterpartInputFaker { get; private set; } = default!;
  public TransactorInputFaker TransactorInputFaker { get; private set; } = default!;
  public SecurityDepositInputFaker SecurityDepositInputFaker { get; private set; } = default!;
  public RatePlanInputFaker RatePlanInputFaker { get; private set; } = default!;
  public OneshotAdditionInputFaker OneshotAdditionInputFaker { get; private set; } = default!;
  public RecurringAdditionInputFaker RecurringAdditionInputFaker { get; private set; } = default!;

  public ContractInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var input = new ContractInput
      {
        Status = ContractFaker.PickStatus(faker),
        InternalCode = ContractFaker.GenerateInternalCode(number: _generatedInputsCount + 1),
        ExternalCode = ContractFaker.GenerateExternalCode(faker),
        PreviousCode = ContractFaker.GeneratePreviousCode(faker),
        ManagementSubjectId = ContractFaker.PickManagementSubjectsId(faker, ManagementSubjectsIds),
        Reason = ContractFaker.PickReason(faker)
      };

      var type = ContractFaker.PickRandomContractType(faker, ContractTypes);
      input.TypeId = type.Id;

      var (agreementDate, effectStartDate, lastRenewalStartDate) = ContractFaker.GenerateDates(faker);
      input.AgreementDate = agreementDate;
      input.EffectStartDate = effectStartDate;
      input.LastRenewalStartDate = lastRenewalStartDate;

      var firstTermDetails = ContractFaker.GenerateTermDetails(faker);
      input.FirstTermDurationMonths = firstTermDetails?.DurationMonths;
      input.FirstTermExpirationDate = firstTermDetails?.ExpirationDate;

      var secondTermDetails = ContractFaker.GenerateTermDetails(faker);
      input.SecondTermDurationMonths = secondTermDetails?.DurationMonths;
      input.SecondTermExpirationDate = secondTermDetails?.ExpirationDate;

      var (anytimeTerminationWarningMonths, nonRenewalWarningMonths) = ContractFaker.GenerateWarningMonths(faker);
      input.AnytimeTerminationWarningMonths = anytimeTerminationWarningMonths;
      input.NonRenewalWarningMonths = nonRenewalWarningMonths;

      input.BillingStartDate = ContractFaker.GenerateBillingStartDate(faker);
      input.BillingAfterTerm = ContractFaker.GenerateBillingAfterTerm(faker);
      input.RecoverBillsAfterSuspension = ContractFaker.GenerateRecoverBillsAfterSuspension(faker);
      input.BillingAlignedToCalendarYear = ContractFaker.GenerateBillingAlignedToCalendarYear(faker);

      var (appliesBillingBaseFee, billingBaseFee, billingBaseFeeBillItemType, billingVATRateType) = ContractFaker.GenerateBillingBaseFeeDetails(faker, BillItemTypes!);
      input.BillingAppliesBaseFee = appliesBillingBaseFee;
      input.BillingBaseFee = billingBaseFee;
      input.BillingBaseFeeBillItemTypeId = billingBaseFeeBillItemType?.Id;
      input.BillingVATRateType = billingVATRateType;

      input.BillingPeriod = ContractFaker.PickBillingPeriod(faker);
      input.BillingWithSplitPayment = ContractFaker.GenerateBillingWithSplitPayment(faker);
      input.BillingWithStampTax = ContractFaker.PickBillingWithStampTax(faker);
      input.BillingNotes = ContractFaker.GenerateBillingNotes(faker);
      input.Notes = ContractFaker.GenerateNotes(faker);
      input.RegistrationTaxData = RegistrationTaxInputFaker.Generate();
      input.RevaluationData = RevaluationInputFaker.Generate();

      var locatedUnitFaker = LocatedUnitInputFakerFactory!.Invoke(input.ManagementSubjectId, type.IsActive);
      var locatedUnits = new List<LocatedUnitInput>();
      var locatedUnitsCount = faker.Random.Int(1, Math.Min(2, locatedUnitFaker.EstateSubUnitsByUnitsIds.Count));

      for (var i = 0; i < locatedUnitsCount; i++)
      {
        var locatedUnit = locatedUnitFaker.Generate();
        locatedUnits.Add(locatedUnit);

        locatedUnitFaker.EstateSubUnitsByUnitsIds.Remove(locatedUnit.EstateUnitId!.Value);
      }

      input.LocatedUnits = locatedUnits.ToArray();
      input.LocatedUnits[0].IsMainUnit = true;

      input.Counterparts = CounterpartInputFaker.Generate(faker.Random.Int(2, 3)).ToArray(); ;
      input.Counterparts[0].IsMainCounterpart = true;
      input.Counterparts[0].ContractSharePercent = 100 - input.Counterparts
        .Except(new[] { input.Counterparts[0] })
        .Select(counterpart => counterpart.ContractSharePercent)
        .DefaultIfEmpty(0)
        .Sum();

      input.Transactors = new[] { TransactorInputFaker.Generate() };
      input.Transactors[0].TransactionSharePercent = 100 - input.Transactors
        .Except(new[] { input.Transactors[0] })
        .Select(transactor => transactor.TransactionSharePercent)
        .DefaultIfEmpty(0)
        .Sum();

      input.SecurityDeposits = SecurityDepositInputFaker.Generate(faker.Random.Int(0, 2)).ToArray();
      input.RatePlans = RatePlanInputFaker.Generate(faker.Random.Int(0, 2)).ToArray();
      input.OneshotAdditions = OneshotAdditionInputFaker.Generate(faker.Random.Int(0, 2)).ToArray();
      input.RecurringAdditions = RecurringAdditionInputFaker.Generate(faker.Random.Int(0, 2)).ToArray();

      return input;
    });

    FinishWith((_, _) => _generatedInputsCount++);
  }

  public ContractInputFaker UseManagementSubjectsIds(IEnumerable<int> managementSubjectsIds)
  {
    ManagementSubjectsIds = managementSubjectsIds ?? throw new ArgumentNullException(nameof(managementSubjectsIds));

    return this;
  }

  public ContractInputFaker UseContractTypes(IEnumerable<ContractType> contractTypes)
  {
    ContractTypes = contractTypes ?? throw new ArgumentNullException(nameof(contractTypes));

    return this;
  }

  public ContractInputFaker UseRegistrationTaxInputFaker(RegistrationTaxInputFaker registrationTaxInputFaker)
  {
    RegistrationTaxInputFaker = registrationTaxInputFaker ?? throw new ArgumentNullException(nameof(registrationTaxInputFaker));

    return this;
  }

  public ContractInputFaker UseRevolutionInputFaker(RevaluationInputFaker revolutionInputFaker)
  {
    RevaluationInputFaker = revolutionInputFaker ?? throw new ArgumentNullException(nameof(revolutionInputFaker));

    return this;
  }

  public ContractInputFaker UseCounterpartInputFaker(CounterpartInputFaker counterpartInputFaker)
  {
    CounterpartInputFaker = counterpartInputFaker ?? throw new ArgumentNullException(nameof(counterpartInputFaker));

    return this;
  }

  public ContractInputFaker UseTransactorInputFaker(TransactorInputFaker transactorInputFaker)
  {
    TransactorInputFaker = transactorInputFaker ?? throw new ArgumentNullException(nameof(transactorInputFaker));

    return this;
  }

  public ContractInputFaker UseSecurityDepositInputFaker(SecurityDepositInputFaker securityDepositInputFaker)
  {
    SecurityDepositInputFaker = securityDepositInputFaker ?? throw new ArgumentNullException(nameof(securityDepositInputFaker));

    return this;
  }
  public ContractInputFaker UseRatePlanInputFaker(RatePlanInputFaker ratePlanInputFaker)
  {
    RatePlanInputFaker = ratePlanInputFaker ?? throw new ArgumentNullException(nameof(ratePlanInputFaker));

    return this;
  }

  public ContractInputFaker UseOneshotAdditionInputFaker(OneshotAdditionInputFaker oneshotAdditionInputFaker)
  {
    OneshotAdditionInputFaker = oneshotAdditionInputFaker ?? throw new ArgumentNullException(nameof(oneshotAdditionInputFaker));

    return this;
  }

  public ContractInputFaker UseRecurringAdditionInputFaker(RecurringAdditionInputFaker recurringAdditionInputFaker)
  {
    RecurringAdditionInputFaker = recurringAdditionInputFaker ?? throw new ArgumentNullException(nameof(recurringAdditionInputFaker));

    return this;
  }
}
