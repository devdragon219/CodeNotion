namespace RealGimm.Web.Fclt.Models;

public record CalendarDayFullInput : CalendarDayInput
{
  public DayOfWeek DayOfWeek { get; set; }
}
