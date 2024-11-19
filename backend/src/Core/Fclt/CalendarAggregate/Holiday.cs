using RealGimm.SharedKernel.Attributes;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Fclt.CalendarAggregate;

public class Holiday : EntityBase
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  public DateOnly Date { get; private set; }
  public HolidayPeriodicity Periodicity { get; private set; }

  public void SetName(string name) => Name = name;

  public void SetDate(DateOnly date) => Date = date;

  public void SetPeriodicity(HolidayPeriodicity periodicity) => Periodicity = periodicity;
}
