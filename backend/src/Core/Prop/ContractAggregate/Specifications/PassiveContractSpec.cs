using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class PassiveContractSpec : Specification<Contract>
{
  public PassiveContractSpec()
  {
    Query.Where(contract => !contract.Type.IsActive);
  }
}
