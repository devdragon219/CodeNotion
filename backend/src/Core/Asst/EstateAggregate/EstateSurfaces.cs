namespace RealGimm.Core.Asst.EstateAggregate;
public record EstateSurfaces
(
  SurfaceMeasurementMetric Metric,
  EstateUnitHeritageType HeritageType,
  int SurfaceSqMTotal,
  int SurfaceSqMCommonArea,
  int SurfaceSqMSideArea
);
