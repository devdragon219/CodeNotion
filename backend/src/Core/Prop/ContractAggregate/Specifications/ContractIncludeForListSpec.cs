using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class ContractIncludeForListSpec : Specification<Contract>
{
  public ContractIncludeForListSpec()
  {
    Query
      .Include(contract => contract.Type)
      .Include(unit => unit.LocatedUnits)
      .AsSplitQuery();
  }
}
