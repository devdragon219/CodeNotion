using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ContractAggregate.Specifications;

public class ContractIncludeForExportToExcelSpec : Specification<Contract>
{
  public ContractIncludeForExportToExcelSpec()
  {
    Query.Include(contract => contract.Type);
  }
}
