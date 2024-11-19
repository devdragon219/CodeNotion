using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitIncludeForSurfaces : Specification<EstateUnit>
{
  public EstateUnitIncludeForSurfaces()
  {
    Query
      .Include(eu => eu.Estate)
      .Include(eu => eu.Surfaces)
        .ThenInclude(sr => sr.Floor)
      .Include(eu => eu.Surfaces)
        .ThenInclude(sr => sr.FunctionArea)
      .Include(eu => eu.Surfaces)
        .ThenInclude(sr => sr.EstateUnit);
  }
}
