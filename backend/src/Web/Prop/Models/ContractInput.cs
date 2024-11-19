using RealGimm.Core.Common;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Web.Prop.Models;

public sealed record ContractInput
{
  public int? Id { get; set; }
  public EntryStatus Status { get; set; }
  public string InternalCode { get; set; } = default!;
  public string? ExternalCode { get; set; }
  public string? PreviousCode { get; set; }
  public int ManagementSubjectId { get; set; }
  public int TypeId { get; set; }
  public Reason Reason { get; set; }
  public DateOnly AgreementDate { get; set; }
  public DateOnly EffectStartDate { get; set; }
  public DateOnly LastRenewalStartDate { get; set; }
  public int? FirstTermDurationMonths { get; set; }
  public int? SecondTermDurationMonths { get; set; }
  public DateOnly? FirstTermExpirationDate { get; set; }
  public DateOnly? SecondTermExpirationDate { get; set; }
  public int? AnytimeTerminationWarningMonths { get; set; }
  public int? NonRenewalWarningMonths { get; set; }
  public DateOnly BillingStartDate { get; set; }
  public bool BillingAfterTerm { get; set; }
  public bool RecoverBillsAfterSuspension { get; set; }
  public bool BillingAlignedToCalendarYear { get; set; }
  public bool BillingAppliesBaseFee { get; set; }
  public decimal? BillingBaseFee { get; set; }
  public int? BillingBaseFeeBillItemTypeId { get; set; }
  public VATRateType? BillingVATRateType { get; set; }
  public BillingPeriod? BillingPeriod { get; set; }
  public bool BillingWithSplitPayment { get; set; }
  public AutomaticBoolean? BillingWithStampTax { get; set; }
  public string? Notes { get; set; }
  public string? BillingNotes { get; set; }
  public DateOnly? TerminationDate { get; set; }
  public ContractTerminator? Terminator { get; set; }
  public DateOnly? BillingEndDate { get; set; }
  public SublocatedContractInput? SublocatedContract { get; set; }
  public RegistrationTaxInput? RegistrationTaxData { get; set; } = default!;
  public RevaluationInput? RevaluationData { get; set; } = default!;
  public LocatedUnitInput[] LocatedUnits { get; set; } = Array.Empty<LocatedUnitInput>();
  public CounterpartInput[] Counterparts { get; set; } = Array.Empty<CounterpartInput>();
  public TransactorInput[] Transactors { get; set; } = Array.Empty<TransactorInput>();
  public SecurityDepositInput[] SecurityDeposits { get; set; } = Array.Empty<SecurityDepositInput>();
  public RatePlanInput[] RatePlans { get; set; } = Array.Empty<RatePlanInput>();
  public OneshotAdditionInput[] OneshotAdditions { get; set; } = Array.Empty<OneshotAdditionInput>();
  public RecurringAdditionInput[] RecurringAdditions { get; set; } = Array.Empty<RecurringAdditionInput>();
}
