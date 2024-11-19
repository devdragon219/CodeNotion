using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class StairMapper : IMapper<StairInput, Stair>
{
  public Task<Stair?> MapAsync(StairInput? from, Stair? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  public Stair? Map(StairInput? from, Stair? into)
  {
    if (from is null)
    {
      return null;
    }

    var stair = into ?? new Stair();

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      stair.Id = from.Id!.Value;
    }

    stair.SetDescription(from.Description);

    return stair;
  }
}
