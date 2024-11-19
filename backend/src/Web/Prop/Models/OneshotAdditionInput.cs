using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record OneshotAdditionInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int BillItemTypeId { get; set; }
  public DateOnly StartDate { get; set; }
  public int AccountingItemId { get; set; }
  public int VATRateId { get; set; }
  public bool IsRentalRateVariation { get; set; }
  public decimal Amount { get; set; }
  public int? Installments { get; set; }
  public bool IsBoundToTermDay { get; set; }
  public DateOnly? TermStartDate { get; set; }
  public DateOnly? TermEndDate { get; set; }
  public string? Notes { get; set; }

}
