using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class CraftMapper : IMapper<CraftInput, Craft>
{
  public Craft? MapAsync(CraftInput? from, Craft? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var craft = into ?? new Craft();
    craft.SetName(from.Name);
    craft.SetInternalCode(from.InternalCode);
    craft.SetOrdering(from.Ordering);

    return craft;
  }

  Task<Craft?> IMapper<CraftInput, Craft>.MapAsync(
    CraftInput? from,
    Craft? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
