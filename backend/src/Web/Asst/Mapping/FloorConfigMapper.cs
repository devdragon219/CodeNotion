using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class FloorConfigMapper : IMapper<FloorTemplateInput, FloorTemplate>
{
  public FloorTemplate? Map(FloorTemplateInput? from, FloorTemplate? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var floor = into ?? new FloorTemplate(from.Name, from.Position);
    floor.SetName(from.Name);
    floor.SetPosition(from.Position);

    return floor;
  }

  Task<FloorTemplate?> IMapper<FloorTemplateInput, FloorTemplate>.MapAsync(
    FloorTemplateInput? from,
    FloorTemplate? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
