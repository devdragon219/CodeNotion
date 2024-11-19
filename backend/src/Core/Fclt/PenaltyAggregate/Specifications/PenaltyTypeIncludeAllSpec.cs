using Ardalis.Specification;

namespace RealGimm.Core.Fclt.PenaltyAggregate.Specifications;

public class PenaltyIncludeAllSpec : Specification<Penalty>
{
  public PenaltyIncludeAllSpec()
  {
    Query
      .Include(penalty => penalty.IfCondition)
      .Include(penalty => penalty.ThenPenalties)
      .AsSplitQuery();
  }
}
