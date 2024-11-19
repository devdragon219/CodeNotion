using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitIncludeAllSpec : Specification<EstateUnit>
{
  public EstateUnitIncludeAllSpec()
  {
    Query
      .Include(estateUnit => estateUnit.Stair)
      .Include(estateUnit => estateUnit.UsageType)
      .Include(estateUnit => estateUnit.Floors.OrderBy(sc => sc.Id))
      .Include(estateUnit => estateUnit.Address)
      .Include(estateUnit => estateUnit.Surfaces.OrderBy(sc => sc.Id))
        .ThenInclude(surface => surface.FunctionArea)
      .Include(estateUnit => estateUnit.Repossessions)

      .Include(estateUnit => estateUnit.CadastralUnits)
         .ThenInclude(cadastralUnit => cadastralUnit.Address)
      .Include(estateUnit => estateUnit.CadastralUnits)
         .ThenInclude(cadastralUnit => cadastralUnit.Coordinates)
      
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.Floors)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.Stairs)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.Addresses)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.UsageType)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.MainUsageType)
      .AsSplitQuery();
  }
}
