using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.Core.Prop.AdministrationTermAggregate;

public sealed class TermGroupedInstallmentPayment
{
  public IEnumerable<TermInstallment> TermInstallments { get; set; } = default!;
  public int BillId { get; set; }
  public string BillInternalCode { get; set; } = default!;
  public DateOnly BillDate { get; set; }
  public bool BillIsTemporary { get; set; }
  public decimal TotalAmount { get; set; }
  public decimal TotalAmountPerVATRate { get; set; }
  public VATRate BillItemTypeVATRate { get; set; } = default!;
}
