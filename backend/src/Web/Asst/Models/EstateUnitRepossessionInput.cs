using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Web.Asst.Models;

public class EstateUnitRepossessionInput
{
  public int? EventId { get; set; }
  public string? Notes { get; private set; }
  public DateOnly? EventDate { get; private set; }
  public RepossessionType? EventType { get; private set; }
  public RepossessionReason? EventReason { get; private set; }
  public UnitCondition? UnitStatus { get; private set; }
  public bool? IsAssignable { get; private set; }
  public bool? IsKeysReturned { get; private set; }
  public bool? IsWithValuables { get; private set; }
}
