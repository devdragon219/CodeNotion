using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class EstateUnitRepossessionMapper : IMapper<EstateUnitRepossessionInput, Repossession>
{
  public async Task<Repossession?> MapAsync(EstateUnitRepossessionInput? from, Repossession? into, CancellationToken cancellationToken = default)
    => await Task.FromResult(Map(from, into));

  public Repossession? Map(EstateUnitRepossessionInput? from, Repossession? into)
  {
    if (from is null) return null;

    var repos = into ?? new Repossession();

    repos.SetData(
      from.EventDate,
      from.EventType,
      from.EventReason,
      from.UnitStatus,
      from.IsAssignable,
      from.IsKeysReturned,
      from.IsWithValuables,
      from.Notes
      );

    if (from.EventId.HasValue)
    {
      repos.Id = from.EventId.Value;
    }

    return repos;
  }
}
