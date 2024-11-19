using Ardalis.Specification;

namespace RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;

public class CatalogueItemIncludeAllSpec : Specification<CatalogueItem>
{
  public CatalogueItemIncludeAllSpec()
  {
    Query
      .Include(item => item.CatalogueType)
        .ThenInclude(type => type.Category)
      .Include(item => item.CatalogueType)
        .ThenInclude(type => type.SubCategory)
      .Include(item => item.Estate)
        .ThenInclude(estate => estate.Addresses.OrderBy(sc => sc.Id))
      .Include(item => item.Estate)
        .ThenInclude(estate => estate.UsageType)
      .Include(item => item.Estate)
        .ThenInclude(estate => estate.MainUsageType)
      .AsSplitQuery();
  }
}
