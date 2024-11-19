namespace RealGimm.Plugin.Import.Anag.Models;

public class ContactDTO
{
  public string Id { get; set; } = default!;
  public string? ContactType { get; set; }
  public string? SubjectInternalCode { get; set; }
  public DateTime? SubjectLastUpdated { get; set; }
  public string? ContactInfo { get; set; }
  public string? Notes { get; set; }
}
