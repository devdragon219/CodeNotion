namespace RealGimm.Plugin.Import.Common.Models;

public class CityDTO
{
  public string CityExternalIdentifier { get; set; } = default!;
  public string? CityExternalCode { get; set; }
  public string? CadastralCode { get; set; }
  public string? Name { get; set; }
  public string? CountyName { get; set; }
  public string? CountyShortCode { get; set; }
  public string? CountryName { get; set; }
  public string? Iso3316Alpha2 { get; set; }
}
