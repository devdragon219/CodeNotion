namespace RealGimm.Plugin.Import.Asst.Models;

public class EstateUnitOriginActDTO
{
  public string Id { get; set; } = default!;
  public string EstateUnitId { get; set; } = default!;
  public string ProtocolNumber { get; set; } = default!;
  public DateTime Date { get; set; }
  public string? IssuerName { get; set; }
  public string? RepertoireNumber { get; set; }
  public string? BundleNumber { get; set; }
  public string? RegistrationNumber { get; set; }
  public DateTime? RegistrationDate { get; set; }
  public string? RegistrationPlace { get; set; }
  public string? TrascriptionNumber { get; set; }
  public DateTime? TrascriptionDate { get; set; }
  public string? TrascriptionPlace { get; set; }
  public DateTime PreferenceDate { get; set; }
}
