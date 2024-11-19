namespace RealGimm.Web.Asst.Models;

public record CatalogueCategoryInput
{
  public string? Name { get; init; }
  public string InternalCode { get; init; } = default!;
  public CatalogueSubCategoryInput[] SubCategories { get; init; } = Array.Empty<CatalogueSubCategoryInput>();
}
