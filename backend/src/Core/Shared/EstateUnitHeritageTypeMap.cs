using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Core.Shared;
public class EstateUnitHeritageTypeMap
{
  public static EstateUnitHeritageType Map(EstateUnitType estateUnitType)
  {
    switch (estateUnitType)
    {
      case EstateUnitType.Building:
      case EstateUnitType.Other:
        return EstateUnitHeritageType.Building;

      case EstateUnitType.Ground:
      case EstateUnitType.BuildingArea:
      case EstateUnitType.UrbanArea:
        return EstateUnitHeritageType.Land;

      default:
        return EstateUnitHeritageType.Building;
    }
  }
}
