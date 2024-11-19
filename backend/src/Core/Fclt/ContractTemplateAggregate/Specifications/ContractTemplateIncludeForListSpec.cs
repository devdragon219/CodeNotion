using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ContractTemplateAggregate.Specifications;

public class ContractTemplateIncludeForListSpec : Specification<ContractTemplate>
{
  public ContractTemplateIncludeForListSpec()
  {
    Query
      .Include(tempalate => tempalate.ContractType)
      .Include(tempalate => tempalate.SLAs)
        .ThenInclude(sla => sla.IfCondition)
      .Include(tempalate => tempalate.SLAs)
        .ThenInclude(sla => sla.ThenCondition)
      .Include(tempalate => tempalate.Penalties)
        .ThenInclude(penalty => penalty.IfCondition)
      .Include(tempalate => tempalate.Penalties)
        .ThenInclude(penalty => penalty.ThenPenalties);
  }
}
