using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitIncludeAllForSurfacesTree : Specification<EstateUnit>
{
  public EstateUnitIncludeAllForSurfacesTree()
  {
    Query
      .Include(estateUnit => estateUnit.Surfaces)
        .ThenInclude(surface => surface.Floor)
      .Include(estateUnit => estateUnit.Surfaces)
        .ThenInclude(surface => surface.FunctionArea);
  }
}
