using Ardalis.Specification;

namespace RealGimm.Core.Asst.EstateAggregate.Specifications;

public class EstateOrderByIdsSpec : Specification<Estate>
{
  public EstateOrderByIdsSpec(int[]? keepTopIds)
  {
    if (keepTopIds is null)
    {
      return;
    }
    
    Query.OrderByDescending(estate => keepTopIds.Contains(estate.Id));
  }
}
