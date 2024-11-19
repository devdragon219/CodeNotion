using Ardalis.Specification;

namespace RealGimm.Core.Fclt.TicketChecklistTemplateAggregate.Specifications;

public class TicketChecklistTemplateIncludeAllSpec : Specification<TicketChecklistTemplate>
{
  public TicketChecklistTemplateIncludeAllSpec()
  {
    Query
      .Include(template => template.OnTriggerCraft)
      .Include(template => template.OnTriggerInterventionType)
      .Include(template => template.PreventativeCraft)
      .Include(template => template.PreventativeInterventionType);
  }
}
