using RealGimm.SharedKernel;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Asst.EstateUnitAggregate;

public class EstateUnitFloor : EntityBase
{
  public EstateUnit EstateUnit { get; private set; } = default!;
  public int EstateUnitId { get; private set; }

  public Floor Floor { get; private set; } = default!;
  public int FloorId { get; private set; }

  public void SetEstateUnit(EstateUnit estateUnit)
  {
    ArgumentNullException.ThrowIfNull(estateUnit);

    EstateUnit = estateUnit;
    EstateUnitId = estateUnit.Id;
  }

  public void SetFloor(Floor floor)
  {
    ArgumentNullException.ThrowIfNull(floor);

    Floor = floor;
    FloorId = floor.Id;
  }

  public void SetFloorId(int floorId)
  {
    FloorId = floorId;
  }

  public void SetestateUnitId(int estateUnitId)
  {
    EstateUnitId = estateUnitId;
  }
}
