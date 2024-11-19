namespace RealGimm.Plugin.Import.Common.Models;

public class VATRateDTO
{
  public string Id { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public string? Type { get; set; }
  public string? Description { get; set; }
  public DateTime? LastUpdated { get; set; }
  public decimal? RateFactor { get; set; }
}
