using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ContractAggregate.Specifications;

public class ContractIncludeForListSpec : Specification<Contract>
{
  public ContractIncludeForListSpec()
  {
    Query.Include(contract => contract.Type);
  }
}
