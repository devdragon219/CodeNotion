namespace RealGimm.Web.Asst.Models;

public sealed record CatalogueTypeInput
{
  public string? Name { get; init; }
  public string InternalCode { get; init; } = default!;
  public int CategoryId { get; init; }
  public int? SubCategoryId { get; init; }
  public string? Notes { get; init; }
  public int[] UsageTypeIds { get; init; } = Array.Empty<int>();
  public CatalogueTypeActivityInput[] Activities { get; init; } = Array.Empty<CatalogueTypeActivityInput>();
  public CatalogueTypeFieldInput[][]? Fields { get; init; }
}
