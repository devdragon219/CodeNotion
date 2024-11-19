namespace RealGimm.Web.Prop.Models;

public sealed record TermGroupedInstallmentPaymentInput
{
  public int? BillId { get; set; }
  public int[] InstallmentNumbers { get; set; } = Array.Empty<int>();
  public DateOnly PaymentDate { get; set; }
}
