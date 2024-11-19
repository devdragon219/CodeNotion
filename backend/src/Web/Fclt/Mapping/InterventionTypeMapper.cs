using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class InterventionTypeMapper : IMapper<InterventionTypeInput, InterventionType>
{
  public InterventionType? MapAsync(InterventionTypeInput? from, InterventionType? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var interventionType = into ?? new InterventionType();
    interventionType.SetName(from.Name);
    interventionType.SetInternalCode(from.InternalCode);

    return interventionType;
  }

  Task<InterventionType?> IMapper<InterventionTypeInput, InterventionType>.MapAsync(
    InterventionTypeInput? from,
    InterventionType? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
