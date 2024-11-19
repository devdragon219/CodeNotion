using Ardalis.Specification;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;

public class CadastralUnitIncludeForListSpec : Specification<CadastralUnit>
{
  public CadastralUnitIncludeForListSpec()
  {
    Query
      .Include(cadastralUnit => cadastralUnit.EstateUnit)
        .ThenInclude(estateUnit => estateUnit!.Estate)
      .Include(cadastralUnit => cadastralUnit.Coordinates)
      .Include(cadastralUnit => cadastralUnit.Address);
  }
}
