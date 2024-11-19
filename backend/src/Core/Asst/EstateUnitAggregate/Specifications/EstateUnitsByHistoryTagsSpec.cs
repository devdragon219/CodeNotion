using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateUnitAggregate.Specifications;

public class EstateUnitsByHistoryTagsSpec : Specification<EstateUnit>
{
  public EstateUnitsByHistoryTagsSpec(IEnumerable<Guid> historicalTags)
  {
    Query.Where(estateUnit => estateUnit.HistoryTags.Any(tag => historicalTags.Contains(tag)));
  }
}
