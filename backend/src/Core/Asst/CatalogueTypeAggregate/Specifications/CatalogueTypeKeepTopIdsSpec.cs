using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;

public class CatalogueTypeKeepTopIdsSpec : Specification<CatalogueType>
{
  public CatalogueTypeKeepTopIdsSpec(int[]? keepTopIds)
  {
    if (keepTopIds is null)
    {
      return;
    }

    Query.OrderByDescending(catalogueType => keepTopIds.Contains(catalogueType.Id));
  }
}

