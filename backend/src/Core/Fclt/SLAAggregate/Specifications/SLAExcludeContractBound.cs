using Ardalis.Specification;

namespace RealGimm.Core.Fclt.SLAAggregate.Specifications;

public class SLAExcludeContractBound : Specification<SLA>
{
  public SLAExcludeContractBound()
  {
    Query.Where(s => s.Contract == null);
  }
}
