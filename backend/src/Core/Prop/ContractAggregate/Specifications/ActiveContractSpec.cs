using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class ActiveContractSpec : Specification<Contract>
{
  public ActiveContractSpec()
  {
    Query.Where(contract => contract.Type.IsActive);
  }
}
