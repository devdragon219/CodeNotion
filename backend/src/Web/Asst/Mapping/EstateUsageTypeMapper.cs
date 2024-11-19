using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public sealed class EstateUsageTypeMapper : IMapper<EstateUsageTypeInput, EstateUsageType>
{
  public EstateUsageType? Map(EstateUsageTypeInput? from, EstateUsageType? into)
  {
    if (from is null)
    {
      return null;
    }

    var estateUsageType = into ?? new EstateUsageType();
    estateUsageType.SetName(from.Name);
    estateUsageType.SetInternalCode(from.InternalCode);
    estateUsageType.SetOrdering(from.Ordering);

    estateUsageType.SetUsage(
      isForEstate: from.IsForEstate,
      isForEstateUnit: from.IsForEstateUnit,
      isForEstateSubUnit: from.IsForEstateSubUnit,
      isForContracts: from.IsForContracts
    );

    return estateUsageType;
  }

  Task<EstateUsageType?> IMapper<EstateUsageTypeInput, EstateUsageType>.MapAsync(
    EstateUsageTypeInput? from,
    EstateUsageType? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
