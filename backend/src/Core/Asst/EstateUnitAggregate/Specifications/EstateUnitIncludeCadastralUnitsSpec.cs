using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitIncludeCadastralUnitsSpec : Specification<EstateUnit>
{
  public EstateUnitIncludeCadastralUnitsSpec()
  {
    Query.Include(estateUnit => estateUnit.CadastralUnits);
  }
}
