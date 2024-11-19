using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record HolidayInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public string Name { get; set; } = default!;
  public DateOnly Date { get; set; }
  public HolidayPeriodicity Periodicity { get; set; }
}
