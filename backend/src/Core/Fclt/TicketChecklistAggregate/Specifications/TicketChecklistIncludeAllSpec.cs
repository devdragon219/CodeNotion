using Ardalis.Specification;

namespace RealGimm.Core.Fclt.TicketChecklistAggregate.Specifications;

public class TicketChecklistIncludeAllSpec : Specification<TicketChecklist>
{
  public TicketChecklistIncludeAllSpec()
  {
    Query
      .Include(template => template.OnTriggerCraft)
      .Include(template => template.OnTriggerInterventionType)
      .Include(template => template.PreventativeCraft)
      .Include(template => template.PreventativeInterventionType)
      .Include(template => template.Contract)
        .ThenInclude(contract => contract.Type);
  }
}
