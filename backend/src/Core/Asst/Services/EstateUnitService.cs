using System.Reflection;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Asst.Services;

public class EstateUnitService : IEstateUnitService
{
  private readonly IRepository<EstateUnit> _estateUnitRepository;

  public EstateUnitService(IRepository<EstateUnit> estateUnitRepository)
  {
    _estateUnitRepository = estateUnitRepository;
  }

  public async Task<IEnumerable<EstateUnitSurfaceSummary>> EstateUnitSurfacesTreeAsync(
    int estateUnitId,
    CancellationToken cancellationToken = default)
  {
    var surfaceList = new List<EstateUnitSurfaceSummary>();
    
    var existingEstateUnit = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitId), new EstateUnitIncludeAllForSurfacesTree())
      .FirstOrDefaultAsync(cancellationToken);
    
    if (existingEstateUnit != null)
    {
      foreach (var m in OrderedMetricEnum())
      {
        var EstateUnitHeritageType = EstateUnitHeritageTypeMap.Map(existingEstateUnit.Type);
        var EnumHeritageType = GetEnumAttribute(m)?.GetHeritageType();
        if (EnumHeritageType == null || EnumHeritageType.Contains(EstateUnitHeritageType))
        {
          var sInput = new EstateUnitSurfaceSummary()
          {
            Metric = m
          };

          surfaceList.Add(sInput);

          foreach (var surf in existingEstateUnit.Surfaces.Where(s => s.Metric == m).ToList())
          {
            sInput.SurfaceId = surf.Floor == null ? surf.Id : null;
            sInput.SurfaceSqMTotal = SurfaceSum(sInput.SurfaceSqMTotal, surf.SurfaceSqMTotal);
            sInput.SurfaceSqMCommonArea = SurfaceSum(sInput.SurfaceSqMCommonArea, surf.SurfaceSqMCommonArea);
            sInput.SurfaceSqMSideArea = SurfaceSum(sInput.SurfaceSqMSideArea, surf.SurfaceSqMSideArea);

            if (surf.Floor != null)
            {
              var sInputFloor = new EstateUnitSurfaceSummaryFloor()
              {
                SurfaceId = surf.FunctionArea == null ? surf.Id : null
              };

              var exstingFloor = surfaceList.Where(s => s.Metric == m).Select(s => s.Floors.Where(f => f.Floor.Id == surf.FloorId).FirstOrDefault()).FirstOrDefault();
              if (exstingFloor != null)
              {
                sInputFloor = exstingFloor!;
              }

              sInputFloor.SurfaceSqMTotal = SurfaceSum(sInputFloor.SurfaceSqMTotal, surf.SurfaceSqMTotal);
              sInputFloor.SurfaceSqMCommonArea = SurfaceSum(sInputFloor.SurfaceSqMCommonArea, surf.SurfaceSqMCommonArea);
              sInputFloor.SurfaceSqMSideArea = SurfaceSum(sInputFloor.SurfaceSqMSideArea, surf.SurfaceSqMSideArea);
              sInputFloor.Floor = new EstateUnitSurfaceSummaryFloorSummary
              {
                Id = surf.Floor.Id,
                Name = surf.Floor.Name,
                Position = surf.Floor.Position,
                TemplateReference = surf.Floor.TemplateReference
              };

              if (surf.FunctionArea != null)
              {
                var sInputFunctionArea = new EstateUnitSurfaceSummaryFunctionArea()
                {
                  SurfaceId = surf.Id,
                  SurfaceSqMTotal = surf.SurfaceSqMTotal,
                  SurfaceSqMCommonArea = surf.SurfaceSqMCommonArea,
                  SurfaceSqMSideArea = surf.SurfaceSqMSideArea,
                  FunctionArea = new EstateUnitSurfaceSummaryFunctionAreaSummary()
                  {
                    Id = surf.FunctionArea.Id,
                    Name = surf.FunctionArea.Name,
                    SurfaceType = surf.FunctionArea.SurfaceType
                  }
                };

                sInputFloor.FunctionAreas.Add(sInputFunctionArea);
              }

              if (exstingFloor == null)
              {
                sInput.Floors.Add(sInputFloor);
              }
            }
          }
        }
      }
    }

    return surfaceList;
  }

  private static int? SurfaceSum(int? surfA, int? surfB)
  {
    int? surfSum = null;

    if (surfA.HasValue)
    {
      surfSum = surfA.Value;
    }

    if (surfB.HasValue)
    {
      if (surfSum.HasValue)
      {
        surfSum += surfB.Value;
      }
      else
      {
        surfSum = surfB.Value;
      }
    }

    return surfSum;
  }

  private static List<SurfaceMeasurementMetric> OrderedMetricEnum()
  {
    var enumDict = new Dictionary<int, SurfaceMeasurementMetric>();
    var enumValues = Enum.GetValues<SurfaceMeasurementMetric>();
    foreach (var enumValue in enumValues)
    {
      var order = GetEnumAttribute(enumValue)?.GetOrder();
      if (order.HasValue)
      {
        enumDict.Add(order.Value, enumValue);
      }
    }
    return enumDict.OrderBy(k => k.Key).Select(v => v.Value).ToList();
  }

  private static EUSurfaceMetricAttribute? GetEnumAttribute(SurfaceMeasurementMetric enumValue)
    => typeof(SurfaceMeasurementMetric)
      .GetMember(enumValue.ToString())
      .First()
      .GetCustomAttribute<EUSurfaceMetricAttribute>();
}
