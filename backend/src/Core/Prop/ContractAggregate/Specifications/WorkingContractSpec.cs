using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class WorkingContractSpec : Specification<Contract>
{
  public WorkingContractSpec()
  {
    Query.Where(contract => contract.Status == Common.EntryStatus.Working);
  }
}
