using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.TicketAggregate;

public class PerformedActivity : EntityBase
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  public int Ordering { get; private set; }
  public PerformedActivityStatus Status { get; private set; }
  public bool IsMandatoryByLaw { get; private set; } = default!;

  public void SetName(string name) => Name = name;

  public void SetOrdering(int ordering) => Ordering = ordering;

  public void SetStatus(PerformedActivityStatus status) => Status = status;

  public void SetIsMandatoryByLaw(bool isMandatoryByLaw) => IsMandatoryByLaw = isMandatoryByLaw;
}
