using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Web.Asst.Mutations;

namespace RealGimm.Web.Asst;

[ExtendObjectType(typeof(Mutation))]
public class AsstMutations
{
  public EstateMutations Estate { get; } = new();
  public FloorTemplateMutations FloorTemplate { get; } = new();
  public EstateSubUnitMutations EstateSubUnit { get; } = new();
  public EstateUnitMutations EstateUnit { get; } = new();
  public CadastralUnitMutations CadastralUnit { get; } = new();
  public FunctionAreaMutations FunctionArea { get; } = new();
  public CatalogueCategoryMutations CatalogueCategory { get; } = new();
  public CatalogueTypeMutations CatalogueType { get; } = new();
  public CatalogueItemMutations CatalogueItem { get; } = new();
  public CatalogueMutations Catalogue { get; } = new();
  public EstateUsageTypeMutations EstateUsageType { get; } = new();
  public EstateMainUsageTypeMutations EstateMainUsageType { get; } = new();
  public CadastralLandCategoryMutations CadastralLandCategory { get; } = new();
  public AssetTaxMutations AssetTax { get; } = new();

}
