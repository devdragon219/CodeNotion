using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record CalendarDayInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public TimeRangeInput[] TimeRanges { get; set; } = [];
}
