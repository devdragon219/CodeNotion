using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketChecklistsPerEstateUnit))]
public sealed class TicketChecklistsPerEstateUnitExtension
{
  public Task<EstateUnit> GetEstateUnit(
    [Parent] TicketChecklistsPerEstateUnit checklistsPerUnit,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(checklistsPerUnit.EstateUnitId, cancellationToken);
}
