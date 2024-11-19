using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Asst.Interfaces;
public interface IEstateSurfacesService
{
  Task<List<EstateSurfaces>> EstateSurfaces(int EstateId);
}
