using Ardalis.Specification;

namespace RealGimm.Core.Fclt.SLAAggregate.Specifications;

public class SLAIncludeAllSpec : Specification<SLA>
{
  public SLAIncludeAllSpec()
  {
    Query
      .Include(penalty => penalty.IfCondition)
      .Include(penalty => penalty.ThenCondition);
  }
}
