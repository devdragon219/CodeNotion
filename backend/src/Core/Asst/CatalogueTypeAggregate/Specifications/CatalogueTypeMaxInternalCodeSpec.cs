using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;

public class CatalogueTypeMaxInternalCodeSpec : Specification<CatalogueType>, ISingleResultSpecification<CatalogueType>
{
  public CatalogueTypeMaxInternalCodeSpec()
  {
    Query
      .OrderByDescending(catalogueType => catalogueType.InternalCode)
      .Take(1);
  }
}
