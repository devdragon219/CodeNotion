namespace RealGimm.Web.Fclt.Models;

public record CalendarInput
{
  public string Name { get; set; } = default!;
  public string TimeZoneId { get; set; } = default!;
  public CalendarDayInput? Sunday { get; set; }
  public CalendarDayInput? Monday { get; set; }
  public CalendarDayInput? Tuesday { get; set; }
  public CalendarDayInput? Wednesday { get; set; }
  public CalendarDayInput? Thursday { get; set; }
  public CalendarDayInput? Friday { get; set; }
  public CalendarDayInput? Saturday { get; set; }
  public HolidayInput[] Holidays { get; set; } = [];
}
