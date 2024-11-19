using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class FloorMapper : IMapper<FloorInput, Floor>
{
  public Task<Floor?> MapAsync(FloorInput? from, Floor? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  public Floor? Map(FloorInput? from, Floor? into)
  {
    if (from is null)
    {
      return null;
    }

    var floor = into ?? new Floor();
    floor.SetName(from.Name);
    floor.SetPosition(from.Position);
    floor.SetReference(from.TemplateReference);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      floor.Id = from.Id!.Value;
    }

    return floor;
  }
}
