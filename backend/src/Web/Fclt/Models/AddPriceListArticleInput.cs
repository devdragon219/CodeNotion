namespace RealGimm.Web.Fclt.Models;

public record AddPriceListArticleInput
{
  public string InternalCode { get; set; } = default!;
  public string Name { get; set; } = default!;
  public int MeasurementUnitId { get; set; }
  public int PriceListId { get; set; }
  public int[] CatalogueTypeIds { get; set; } = default!;
  public DateOnly Since { get; set; }
  public decimal Price { get; set; }
}
