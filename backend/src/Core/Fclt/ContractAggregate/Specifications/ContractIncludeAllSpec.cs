using Ardalis.Specification;

namespace RealGimm.Core.Fclt.ContractAggregate.Specifications;

public class ContractIncludeAllSpec : Specification<Contract>
{
  public ContractIncludeAllSpec()
  {
    Query
      .Include(contract => contract.Type)
      .Include(contract => contract.OriginalTemplate)
      .Include(contract => contract.OriginalEstateUnitGroup)
      .Include(contract => contract.Penalties)
        .ThenInclude(penalty => penalty.IfCondition)
      .Include(contract => contract.SLAs)
        .ThenInclude(sla => sla.IfCondition)
      .Include(contract => contract.SLAs)
        .ThenInclude(sla => sla.ThenCondition)
      .Include(contract => contract.TicketChecklists)
      .Include(contract => contract.PriceLists);
  }
}
