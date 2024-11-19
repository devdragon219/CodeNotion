using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateAggregate.Specifications;

public class EstateIncludeAllSpec : Specification<Estate>
{
  public EstateIncludeAllSpec()
  {
    Query
      .Include(estate => estate.Addresses.OrderBy(sc => sc.Id))
      .Include(estate => estate.Stairs.OrderBy(sc => sc.Id))
      .Include(estate => estate.Floors.OrderBy(sc => sc.Id))
      .Include(estate => estate.EstateUnits.OrderBy(sc => sc.Id))
      .Include(estate => estate.Valuations.OrderBy(sc => sc.Id))
      .Include(estate => estate.TotalMarketValue)
        .ThenInclude(totalMarketValue => totalMarketValue!.Coefficients)
      .Include(estate => estate.TotalMarketValue)
        .ThenInclude(totalMarketValue => totalMarketValue!.MarketValues)
      .Include(estate => estate.Refactorings.OrderBy(sc => sc.Id))
      .Include(estate => estate.CatalogueItems.OrderBy(ci => ci.Id))
      .Include(estate => estate.UsageType)
      .Include(estate => estate.MainUsageType)
      .AsSplitQuery();
  }
}
