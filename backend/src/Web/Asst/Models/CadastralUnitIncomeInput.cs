using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Web.Asst.Models;

public record CadastralUnitIncomeInput
{
  public string? MacroCategory { get; init; }
  public string? MicroCategory { get; init; }
  public int? CadastralCategoryId { get; init; }
  public int? CadastralLandCategoryId { get; init; }
  public IncomeMetric? Metric { get; init; }
  public decimal? MetricAmount { get; init; }
  public decimal? MetricRentedAmount { get; init; }
  public decimal? RegisteredSurface { get; init; }
  public IncomeType? Type { get; init; }
  public decimal? CadastralAmount { get; init; }
  public decimal? FarmAmount { get; init; }
  public decimal? LandAmount { get; init; }
  public decimal? MarketValue { get; init; }
}
