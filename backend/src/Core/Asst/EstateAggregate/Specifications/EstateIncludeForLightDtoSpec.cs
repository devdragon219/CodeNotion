using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateAggregate.Specifications;

public class EstateIncludeForLightDtoSpec : Specification<Estate>
{
  public EstateIncludeForLightDtoSpec()
  {
    Query
      .Include(estate => estate.Addresses.OrderBy(sc => sc.Id))
      .Include(estate => estate.UsageType)
      .AsSplitQuery();
  }
}
