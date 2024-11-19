using HotChocolate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;

namespace RealGimm.Core.Asst.EstateUnitAggregate;

public class EstateUnitSurface : EntityBase
{
  public EstateUnit EstateUnit { get; private set; } = default!;
  public SurfaceMeasurementMetric Metric { get; private set; }

  public int? SurfaceSqMTotal { get; private set; }
  public int? SurfaceSqMCommonArea { get; private set; }
  public int? SurfaceSqMSideArea { get; private set; }

  public int? FloorId { get; private set; }
  public Floor? Floor { get; private set; }

  public int? FunctionAreaId { get; private set; }
  public FunctionArea? FunctionArea { get; private set; }

  public void SetMetric(SurfaceMeasurementMetric metric) => Metric = metric;

  public void SetFloor(int? floorId) => FloorId = floorId;
  public void SetFloor(Floor? floor)
  {
    Floor = floor;
    FloorId = floor?.Id;
  }

  public void SetFunctionAreaId(int? functionAreaId) => FunctionAreaId = functionAreaId;

  public void SetFunctionArea(FunctionArea? functionArea)
  {
    FunctionArea = functionArea;
    FunctionAreaId = functionArea?.Id;
  }

  public void SetMeasurements(int? squareMTotal, int? squareMCommon, int? squareMSide)
  {
    SurfaceSqMTotal = squareMTotal;
    SurfaceSqMCommonArea = squareMCommon;
    SurfaceSqMSideArea = squareMSide;
  }

  [GraphQLIgnore]
  public bool Matches(EstateUnitSurface other)
  {
    if (FunctionAreaId.HasValue ^ other.FunctionAreaId.HasValue
      || (FunctionAreaId.HasValue && other.FunctionAreaId!.Value != FunctionAreaId.Value))
    {
      return false;
    }

    if (FloorId.HasValue ^ other.FloorId.HasValue
      || (FloorId.HasValue && other.FloorId!.Value != FloorId.Value))
    {
      return false;
    }

    return Metric == other.Metric;
  }
}
