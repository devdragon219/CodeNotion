namespace RealGimm.Core.Asst.EstateAggregate;

public enum SurfaceMeasurementMetric
{
  [EUSurfaceMetric(new[] { EstateUnitHeritageType.Building }, 2)]
  Rooms,

  [EUSurfaceMetric(new[] { EstateUnitHeritageType.Building, EstateUnitHeritageType.Land }, 1)]
  SquareMetreNetNormal,
  
  [EUSurfaceMetric(new[] { EstateUnitHeritageType.Building }, 3)]
  SquareMetreNetLowCeiling,
  
  [EUSurfaceMetric(new[] { EstateUnitHeritageType.Building, EstateUnitHeritageType.Land }, 0)]
  SquareMetreGrossNormal,
  
  [EUSurfaceMetric(new[] { EstateUnitHeritageType.Building }, 4)]
  SquareMetreHeatingCooling,
}

[System.AttributeUsage(AttributeTargets.All, AllowMultiple = true)]
public class EUSurfaceMetricAttribute: Attribute
{
  //needed to show or not a Metric according to EstateUnit type (Ex: Land can have only NetNormal and GrossNormal)
  EstateUnitHeritageType[] _euType;

  //needed to custom ordering the enum values
  int _order = 0;

  public EUSurfaceMetricAttribute(EstateUnitHeritageType[] EUType, int order)
  {
    _euType = EUType;
    _order = order;
  }

  public EstateUnitHeritageType[] GetHeritageType() => _euType;
  public int GetOrder() => _order;
}
