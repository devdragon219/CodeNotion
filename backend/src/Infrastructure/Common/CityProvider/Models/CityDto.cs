namespace RealGimm.Infrastructure.Common.CityProvider.Models;

public class CityDto
{
    public string Name { get; set; } = default!;
    public string? Name2 { get; set; }
    public string? Name3 { get; set; }
    public string RegionName { get; set; } = default!;
    public string CountyName { get; set; } = default!;
    public string CadastralCode { get; set; } = default!;
    public string RegionCode { get; set; } = default!;
    public string CountyCode { get; set; } = default!;
    public string CountyShortCode { get; set; } = default!;
    public string CityCode { get; set; } = default!;
    public bool IsCountyMainCity { get; set; }
}