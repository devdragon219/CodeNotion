using Ardalis.Specification;

namespace RealGimm.Core.Fclt.PenaltyAggregate.Specifications;

public class PenaltyIncludeForListFullSpec : Specification<Penalty>
{
  public PenaltyIncludeForListFullSpec()
  {
    Query
      .Include(penalty => penalty.IfCondition)
      .Include(penalty => penalty.ThenPenalties)
      .AsSplitQuery();
  }
}
