using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitIncludeForListSpec : Specification<EstateUnit>
{
  public EstateUnitIncludeForListSpec()
  {
    Query
      .Include(estateUnit => estateUnit.Stair)
      .Include(estateUnit => estateUnit.Floors)
      .Include(estateUnit => estateUnit.Address)
      .Include(estateUnit => estateUnit.Surfaces)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.UsageType)
      .Include(estateUnit => estateUnit.Estate)
        .ThenInclude(estate => estate.MainUsageType)
      .Include(estateUnit => estateUnit.UsageType)
      .Include(estateUnit => estateUnit.CadastralUnits)
        .ThenInclude(cadastralUnit => cadastralUnit.Coordinates)
      .Include(estateUnit => estateUnit.CadastralUnits)
        .ThenInclude(cadastralUnit => cadastralUnit.Address);
  }
}
