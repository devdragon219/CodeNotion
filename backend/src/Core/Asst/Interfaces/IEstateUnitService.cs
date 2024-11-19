using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Core.Asst.Interfaces;

public interface IEstateUnitService
{
  Task<IEnumerable<EstateUnitSurfaceSummary>> EstateUnitSurfacesTreeAsync(
    int estateUnitId,
    CancellationToken cancellationToken = default);
}
