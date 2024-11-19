using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;

public class CatalogueCategoryMaxInternalCodeSpec : Specification<CatalogueCategory>, ISingleResultSpecification<CatalogueCategory>
{
  public CatalogueCategoryMaxInternalCodeSpec()
  {
    Query
      .OrderByDescending(category => category.InternalCode)
      .Take(1);
  }
}
