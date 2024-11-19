using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitIncludeForImportSpec : Specification<EstateUnit>
{
  public EstateUnitIncludeForImportSpec()
  {
    Query
      .Include(estateUnit => estateUnit.Stair)
      .Include(estateUnit => estateUnit.UsageType)
      .Include(estateUnit => estateUnit.Floors.OrderBy(sc => sc.Id))
      .Include(estateUnit => estateUnit.Address)
      .Include(estateUnit => estateUnit.EstateSubUnits)
      .Include(estateUnit => estateUnit.Surfaces.OrderBy(sc => sc.Id))
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.Floors)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.Stairs)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.Addresses)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.UsageType);
  }
}
