using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;

public class CatalogueItemsByCatalogueIdSpec : Specification<CatalogueItem>
{
  public CatalogueItemsByCatalogueIdSpec(CatalogueId id)
  {
    Query.Where(item => item.Estate.Id == id.EstateId && item.CatalogueType.Id == id.CatalogueTypeId);
  }
}
