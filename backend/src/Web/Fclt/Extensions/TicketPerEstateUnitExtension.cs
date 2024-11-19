using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketsPerEstateUnit))]
public sealed class TicketPerEstateUnitExtension
{
  public Task<EstateUnit> GetLocationEstateUnit(
    [Parent] TicketsPerEstateUnit ticketsPerUnit,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(ticketsPerUnit.LocationEstateUnitId, cancellationToken);
}
