using RealGimm.Web.Asst.Queries;

namespace RealGimm.Web.Asst;

[ExtendObjectType(typeof(Query))]
public class AsstQueries
{
  public EstateQueries Estate { get; } = new();
  public FloorTemplateQueries FloorTemplate { get; } = new();
  public EstateUnitQueries EstateUnit { get; } = new();
  public EstateSubUnitQueries EstateSubUnit { get; } = new();
  public CadastralUnitQueries CadastralUnit { get; } = new();
  public CadastralCategoryQueries CadastralCategory { get; } = new();
  public FunctionAreaQueries FunctionArea { get; } = new();
  public CatalogueCategoryQueries CatalogueCategory { get; } = new();
  public GeocodingQueries Geocoding { get; } = new();
  public CatalogueTypeQueries CatalogueType { get; } = new();
  public CatalogueItemQueries CatalogueItem { get; } = new();
  public CatalogueQueries Catalogue { get; } = new();
  public EstateUsageTypeQueries EstateUsageType { get; } = new();
  public EstateMainUsageTypeQueries EstateMainUsageType { get; } = new();
  public CadastralLandCategoryQueries CadastralLandCategory { get; } = new();
  public AssetTaxQueries AssetTax { get; } = new();
}
