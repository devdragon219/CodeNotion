using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Asst.EstateUnitAggregate;
public class EstateUnitSurfaceSummary {
  public int? SurfaceId { get; set; }
  public SurfaceMeasurementMetric Metric { get; set; }
  public int? SurfaceSqMTotal { get; set; }
  public int? SurfaceSqMCommonArea { get; set; }
  public int? SurfaceSqMSideArea { get; set; }
  public List<EstateUnitSurfaceSummaryFloor> Floors { get; set; } = new();
}

public class EstateUnitSurfaceSummaryFloor
{
  public int? SurfaceId { get; set; }
  public int? SurfaceSqMTotal { get; set; }
  public int? SurfaceSqMCommonArea { get; set; }
  public int? SurfaceSqMSideArea { get; set; }
  public EstateUnitSurfaceSummaryFloorSummary Floor { get; set; } = default!;
  public List<EstateUnitSurfaceSummaryFunctionArea> FunctionAreas { get; set; } = new();
}

public class EstateUnitSurfaceSummaryFloorSummary
{
  public int? Id { get; set; }
  public string? Name { get; set; }
  public float Position { get; set; }
  public Guid? TemplateReference { get; set; }
}

public class EstateUnitSurfaceSummaryFunctionArea
{
  public int? SurfaceId { get; set; }
  public int? SurfaceSqMTotal { get; set; }
  public int? SurfaceSqMCommonArea { get; set; }
  public int? SurfaceSqMSideArea { get; set; }
  public EstateUnitSurfaceSummaryFunctionAreaSummary FunctionArea { get; set; } = default!;
}

public class EstateUnitSurfaceSummaryFunctionAreaSummary
{
  public int? Id { get; set; }
  public string? Name { get; set; }
  public SurfaceType SurfaceType { get; set; }
}
