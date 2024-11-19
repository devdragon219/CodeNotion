namespace RealGimm.Web.Asst.Models;

public record EstateTotalMarketValueInput
{
  public int TotalSurfaceAreaSqM { get; init; }
  public string? Notes { get; init; }
  public EstateTotalMarketValueCoefficientInput[] Coefficients { get; init; } = Array.Empty<EstateTotalMarketValueCoefficientInput>();
  public EstateMarketValueInput[] MarketValues { get; init; } = Array.Empty<EstateMarketValueInput>();
}
