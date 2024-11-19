namespace RealGimm.Plugin.Import.Asst.Models;

public class AddressDTO
{
  public string EstateId { get; set; } = default!;
  public string? CityId { get; set; }
  public string? PostCode { get; set; }
  public string? Toponymy { get; set; }
  public string? Numbering { get; set; }
  public string? Notes { get; set; }
  public double? Latitude { get; set; }
  public double? Longitude { get; set; }
}
