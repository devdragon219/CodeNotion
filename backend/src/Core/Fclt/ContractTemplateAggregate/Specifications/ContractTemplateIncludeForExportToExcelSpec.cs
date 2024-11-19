using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ContractTemplateAggregate.Specifications;

public class ContractTemplateIncludeForExportToExcelSpec : Specification<ContractTemplate>
{
  public ContractTemplateIncludeForExportToExcelSpec()
  {
    Query.Include(tempalate => tempalate.ContractType);
  }
}
