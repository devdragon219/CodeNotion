using Ardalis.Specification;

namespace RealGimm.Core.Fclt.TicketChecklistTemplateAggregate.Specifications;

public class TicketChecklistTemplateIncludeForListSpec : Specification<TicketChecklistTemplate>
{
  public TicketChecklistTemplateIncludeForListSpec()
  {
    Query
      .Include(template => template.OnTriggerCraft)
      .Include(template => template.OnTriggerInterventionType)
      .Include(template => template.PreventativeCraft)
      .Include(template => template.PreventativeInterventionType);
  }
}
