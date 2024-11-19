using Ardalis.Specification;

namespace RealGimm.Core.Fclt.SLAAggregate.Specifications;

public class SLAIncludeForListFullSpec : Specification<SLA>
{
  public SLAIncludeForListFullSpec()
  {
    Query
      .Include(penalty => penalty.IfCondition)
      .Include(penalty => penalty.ThenCondition);
  }
}
