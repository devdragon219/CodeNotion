using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Asst.EstateUnitAggregate;
public class Repossession : EntityBase
{
  public EstateUnit EstateUnit { get; private set; } = default!;
  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateOnly? EventDate { get; private set; }

  public RepossessionType? EventType { get; private set; }
  public RepossessionReason? EventReason { get; private set; }
  public UnitCondition? UnitStatus { get; private set; }
  public bool? IsAssignable { get; private set; }
  public bool? IsKeysReturned { get; private set; }
  public bool? IsWithValuables { get; private set; }

  public void SetData(
    DateOnly? eventDate,
    RepossessionType? type,
    RepossessionReason? reason,
    UnitCondition? status,
    bool? isAssignable,
    bool? isKeysReturned,
    bool? isWithValuables,
    string? notes)
    {
      EventDate = eventDate;
      Notes = notes;
      EventType = type;
      EventReason = reason;
      UnitStatus = status;
      IsAssignable = isAssignable;
      IsKeysReturned = isKeysReturned;
      IsWithValuables = isWithValuables;
    }
}
