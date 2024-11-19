using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record RecurringAdditionInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public int BillItemTypeId { get; set; }
  public int AccountingItemId { get; set; }
  public int VATRateId { get; set; }
  public decimal AmountPerInstallment { get; set; }
  public int? ExcludeStartMonth { get; set; }
  public int? ExcludeEndMonth { get; set; }
  public string? Notes { get; set; }
}
