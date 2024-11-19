using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;

public class CatalogueItemMaxInternalCodeSpec : Specification<CatalogueItem>, ISingleResultSpecification<CatalogueItem>
{
  public CatalogueItemMaxInternalCodeSpec()
  {
    Query
      .OrderByDescending(item => item.InternalCode)
      .Take(1);
  }
}
