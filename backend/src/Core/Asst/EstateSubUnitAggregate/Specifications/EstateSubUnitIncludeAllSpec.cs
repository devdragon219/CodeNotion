using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;

public class EstateSubUnitIncludeAllSpec : Specification<EstateSubUnit>
{
  public EstateSubUnitIncludeAllSpec()
  {
    Query
      .Include(subUnit => subUnit.UsageType)
      .Include(subUnit => subUnit.EstateUnit)
        .ThenInclude(eu => eu.Address)
      .Include(subUnit => subUnit.EstateUnit)
        .ThenInclude(eu => eu.CadastralUnits)
      .AsSplitQuery();
  }
}
