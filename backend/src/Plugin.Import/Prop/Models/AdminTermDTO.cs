namespace RealGimm.Plugin.Import.Prop.Models;

public class AdminTermDTO
{
  public string Id { get; set; } = default!;
  public string? AdministrationId { get; set; }
  public string? TermTypeId { get; set; }
  public string? Description { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public string? SubdivisionTypeId { get; set; }
  public decimal? Amount { get; set; }
  public decimal? TaxAmount { get; set; }
  public decimal? Adjustment { get; set; }
  public string? Notes { get; set; }
  public AdminTermPaymentDTO[]? Payments { get; set; }
}
