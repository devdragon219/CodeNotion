namespace RealGimm.Plugin.Import.Anag.Models;

public class SplitPaymentDTO
{
  public string Id { get; set; } = default!;
  public string? SubjectInternalCode { get; set; }
  public DateTime? SubjectLastUpdated { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
}
