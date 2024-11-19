using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Shared;

namespace RealGimm.Web.Prop.Models;

public sealed record BillInput
{
  public int Year { get; set; }
  public int TransactorSubjectId { get; set; }
  public int MainCounterpartSubjectId { get; set; }
  public bool IsOccupiedWithoutRight { get; set; }
  public bool IsInvoiced { get; set; }
  public PaymentType TransactorPaymentType { get; set; }
  public BillEmissionType EmissionType { get; set; }
  public BillingPeriod ContractBillingPeriod { get; set; }
  public decimal TotalAmount { get; set; }
  public BillRowInput[] BillRows { get; set; } = Array.Empty<BillRowInput>();
}
