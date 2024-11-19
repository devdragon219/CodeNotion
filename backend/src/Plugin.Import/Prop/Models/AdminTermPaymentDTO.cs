namespace RealGimm.Plugin.Import.Prop.Models;

public class AdminTermPaymentDTO
{
  public string Id { get; set; } = default!;
  public string? AdminTermId { get; set; }
  public string? BillItemTypeId { get; set; }
  public string? BillId { get; set; }
  public string? Notes { get; set; }
  public string? InstallmentIndex { get; set; }
  public DateTime? ReferenceDate { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public decimal? Amount { get; set; }
  public decimal? TaxAmount { get; set; }
  public decimal? Total { get; set; }
  public bool IsBilled { get; set; }
}
