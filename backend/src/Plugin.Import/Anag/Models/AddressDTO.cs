namespace RealGimm.Plugin.Import.Anag.Models;

public class AddressDTO
{
  public string Id { get; set; } = default!;
  public string? AddressType { get; set; }
  public string? SubjectInternalCode { get; set; }
  public DateTime? SubjectLastUpdated { get; set; }
  public string? CityId { get; set; }
  public string? Toponymy { get; set; }
  public string? Numbering { get; set; }
  public string? PostCode { get; set; }
}
