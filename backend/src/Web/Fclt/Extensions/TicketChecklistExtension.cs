using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketChecklist))]
public sealed class TicketChecklistExtension
{
  public Task<EstateUnit> GetEstateUnit(
    [Parent] TicketChecklist ticketChecklist,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(ticketChecklist.EstateUnitId, cancellationToken);

  public Task<CatalogueType> GetCatalogueType(
    [Parent] TicketChecklist ticketChecklist,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(ticketChecklist.CatalogueTypeId, cancellationToken);

  public async Task<IEnumerable<CatalogueTypeActivity>?> GetOnTriggerActivities(
    [Parent] TicketChecklist ticketChecklist,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    var activityIds = ticketChecklist.OnTriggerActivityIds;

    if (activityIds is null)
    {
      return null;
    }

    var catalogueType = await loader.LoadAsync(ticketChecklist.CatalogueTypeId, cancellationToken);

    return catalogueType.Activities.Where(activity => activityIds.Contains(activity.Id));
  }

  public async Task<IEnumerable<CatalogueTypeActivity>?> GetPreventativeActivities(
    [Parent] TicketChecklist ticketChecklist,
    [Service] CatalogueTypeDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    var activityIds = ticketChecklist.PreventativeActivityIds;

    if (activityIds is null)
    {
      return null;
    }

    var catalogueType = await loader.LoadAsync(ticketChecklist.CatalogueTypeId, cancellationToken);

    return catalogueType.Activities.Where(activity => activityIds.Contains(activity.Id));
  }
}
