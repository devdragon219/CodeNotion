namespace RealGimm.Web.Fclt.Models;

public record UpdatePriceListArticleInput
{
  public string InternalCode { get; set; } = default!;
  public string Name { get; set; } = default!;
  public int MeasurementUnitId { get; set; }
  public int PriceListId { get; set; }
  public int[] CatalogueTypeIds { get; set; } = default!;
  public ArticlePricePeriodInput[] PricePeriods { get; set; } = [];
}
