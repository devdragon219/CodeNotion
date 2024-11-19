using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public record InstallmentPaymentInput
{
  public int[] TermInstallmentIds { get; set; } = Array.Empty<int>();
  public int BillItemTypeId { get; set; }
  public decimal Amount { get; set; }
  public DateOnly BillDate { get; set; }
}
