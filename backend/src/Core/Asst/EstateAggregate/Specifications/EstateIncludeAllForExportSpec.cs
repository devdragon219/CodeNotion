using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateAggregate.Specifications;

public class EstateIncludeAllForExportSpec : Specification<Estate>
{
  public EstateIncludeAllForExportSpec()
  {
    Query
      .Include(estate => estate.Addresses.OrderBy(sc => sc.Id))
      .Include(estate => estate.Stairs.OrderBy(sc => sc.Id))
      .Include(estate => estate.Floors.OrderBy(sc => sc.Id))
      .Include(estate => estate.Valuations.OrderBy(sc => sc.Id))
      .Include(estate => estate.UsageType)
      .Include(estate => estate.MainUsageType);
  }
}
