using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class NonTerminatedContractSpec : Specification<Contract>
{
  public NonTerminatedContractSpec(DateOnly? terminationOverride = null)
  {
    var termination = terminationOverride
      ?? DateOnly.FromDateTime(DateTime.UtcNow);
      
    Query
      .Where(contract =>
        !contract.TerminationDate.HasValue
        || contract.TerminationDate.Value > termination);
  }
}
