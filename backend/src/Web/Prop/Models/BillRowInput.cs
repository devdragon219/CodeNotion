using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record BillRowInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int BillItemTypeId { get; set; }
  public int VATRateId { get; set; }
  public decimal Amount { get; set; }
  public DateOnly? Since { get; set; }
  public DateOnly? Until { get; set; }
  public string? Notes { get; set; }
}
