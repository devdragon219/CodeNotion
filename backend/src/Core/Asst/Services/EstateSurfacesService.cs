using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;

public class EstateSurfacesService : IEstateSurfacesService
{
  private readonly IRepository<EstateUnit> _repository;
  
  public EstateSurfacesService(IRepository<EstateUnit> repository)
  {
    _repository = repository;
  }

  public async Task<List<EstateSurfaces>> EstateSurfaces(int estateId)
  {
    var groupedList = new Dictionary<string, EstateSurfaces>();
    var estateUnitsSurfaces = await _repository
      .AsQueryable(new EstateUnitIncludeForSurfaces(), new EstateUnitByEstateIdSpec(estateId), new EntityNonDeletedSpec<EstateUnit>())
      .Select(e => e.Surfaces.Where(s => !s.EstateUnit.DeletionDate.HasValue && s.EstateUnit.Status == EstateUnitStatus.Existing))
      .ToListAsync();

    foreach (var eus in estateUnitsSurfaces)
    {
      foreach (var s in eus)
      {
        var heritageType = EstateUnitHeritageTypeMap.Map(s.EstateUnit.Type);
        var key = $"{s.Metric}_{heritageType}";
        var newSurface = new EstateSurfaces
        (
          Metric: s.Metric,
          HeritageType: heritageType,
          SurfaceSqMCommonArea: s.SurfaceSqMCommonArea ?? 0,
          SurfaceSqMSideArea: s.SurfaceSqMSideArea ?? 0,
          SurfaceSqMTotal: s.SurfaceSqMTotal ?? 0
        );

        if (!groupedList.ContainsKey(key))
        {
          groupedList.Add(key, newSurface);
        }
        else
        {
          groupedList[key] = SumSurfaces(groupedList[key], newSurface);
        }
      }

    }

    return groupedList.Values.ToList();
  }

  private EstateSurfaces SumSurfaces(EstateSurfaces existSurface, EstateSurfaces newSurface)
  {
    return new EstateSurfaces(
      existSurface.Metric,
      existSurface.HeritageType,
      existSurface.SurfaceSqMTotal + newSurface.SurfaceSqMTotal,
      existSurface.SurfaceSqMCommonArea + newSurface.SurfaceSqMCommonArea,
      existSurface.SurfaceSqMSideArea + newSurface.SurfaceSqMSideArea
      );
  }
}
