using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record QuoteArticleInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int? SourceArticleId { get; set; }
  public string InternalCode { get; set; } = default!;
  public string Name { get; set; } = default!;
  public int Quantity { get; set; }
  public int Ordering { get; set; }
  public int MeasurementUnitId { get; set; } = default!;
  public decimal UnitPrice { get; set; }
  public bool IsExcluded { get; set; }
}
