using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateAggregate.Specifications;

public class EstateIncludeForListSpec : Specification<Estate>
{
  public EstateIncludeForListSpec()
  {
    Query
      .Include(estate => estate.Addresses)
      .Include(estate => estate.Stairs)
      .Include(estate => estate.Floors)
      .Include(estate => estate.EstateUnits)
      .Include(estate => estate.UsageType)
      .Include(estate => estate.MainUsageType)
      .Include(estate => estate.Valuations);
  }
}
