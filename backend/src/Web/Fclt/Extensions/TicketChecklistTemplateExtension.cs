using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketChecklistTemplate))]
public sealed class TicketChecklistTemplateExtension
{
  public Task<CatalogueType> GetCatalogueType(
    [Parent] TicketChecklistTemplate ticketChecklistTemplate,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(ticketChecklistTemplate.CatalogueTypeId, cancellationToken);

  public async Task<IEnumerable<CatalogueTypeActivity>?> GetOnTriggerActivities(
    [Parent] TicketChecklistTemplate ticketChecklistTemplate,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    var activityIds = ticketChecklistTemplate.OnTriggerActivityIds;

    if (activityIds is null)
    {
      return null;
    }

    var catalogueType = await loader.LoadAsync(ticketChecklistTemplate.CatalogueTypeId, cancellationToken);

    return catalogueType.Activities.Where(activity => activityIds.Contains(activity.Id));
  }

  public async Task<IEnumerable<CatalogueTypeActivity>?> GetPreventativeActivities(
    [Parent] TicketChecklistTemplate ticketChecklistTemplate,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    var activityIds = ticketChecklistTemplate.PreventativeActivityIds;

    if (activityIds is null)
    {
      return null;
    }

    var catalogueType = await loader.LoadAsync(ticketChecklistTemplate.CatalogueTypeId, cancellationToken);

    return catalogueType.Activities.Where(activity => activityIds.Contains(activity.Id));
  }
}
