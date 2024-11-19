using Ardalis.Specification;

namespace RealGimm.Core.Fclt.PenaltyAggregate.Specifications;

public class PenaltyExcludeContractBoundSpec : Specification<Penalty>
{
  public PenaltyExcludeContractBoundSpec()
  {
    Query.Where(p => p.Contract == null);
  }
}
