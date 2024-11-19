using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class EstateMainUsageTypeMapper : IMapper<EstateMainUsageTypeInput, EstateMainUsageType>
{
  public EstateMainUsageType? Map(EstateMainUsageTypeInput? from, EstateMainUsageType? into)
  {
    if (from is null)
    {
      return null;
    }

    var estateMainUsageType = into ?? new EstateMainUsageType();
    estateMainUsageType.SetName(from.Name);
    estateMainUsageType.SetInternalCode(from.InternalCode);
    estateMainUsageType.SetOrdering(from.Ordering);

    return estateMainUsageType;
  }

  Task<EstateMainUsageType?> IMapper<EstateMainUsageTypeInput, EstateMainUsageType>.MapAsync(
    EstateMainUsageTypeInput? from,
    EstateMainUsageType? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
