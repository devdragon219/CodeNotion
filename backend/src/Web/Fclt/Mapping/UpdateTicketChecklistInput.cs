using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class UpdateTicketChecklistMapper : IMapper<UpdateTicketChecklistInput, TicketChecklist>
{
  public TicketChecklist? MapAsync(UpdateTicketChecklistInput? from, TicketChecklist? into = null)
  {
    if (from is null)
    {
      return null;
    }

    if (into is null)
    {
      throw new NotSupportedException();
    }

    var template = into;
    template.SetBaseData(template.Type, from.Name, from.InternalCode);
    template.SetCosts(from.RawWorkCost, from.SafetyCost, from.CostBaseFactor);
    
    template.SetPreventativeSpecifics(
      from.PreventativePlannedPeriod,
      from.PreventativeDaysOfWeek,
      from.PreventativeToleranceDays,
      template.PreventativeInterventionType,
      template.PreventativeCraft,
      from.PreventativeActivityIds);

    template.SetOnTriggerSpecifics(
      template.OnTriggerInterventionType,
      template.OnTriggerCraft,
      from.OnTriggerActivityIds);

    return template;
  }

  Task<TicketChecklist?> IMapper<UpdateTicketChecklistInput, TicketChecklist>.MapAsync(
    UpdateTicketChecklistInput? from,
    TicketChecklist? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
