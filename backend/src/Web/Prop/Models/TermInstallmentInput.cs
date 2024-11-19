using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public record TermInstallmentInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public int InstallmentNumber { get; set;}
  public int BillItemTypeId { get; set; }
  public DateOnly DueDate { get; set; }
  public decimal Amount { get; set; }
  public DateOnly Since { get; set; }
  public DateOnly Until { get; set; }
  public string? Notes { get; set; }
}
