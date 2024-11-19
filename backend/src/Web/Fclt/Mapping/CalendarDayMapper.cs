using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class CalendarDayMapper : IMapper<CalendarDayFullInput, CalendarDay>
{
  private readonly IMapper _mapper;

  public CalendarDayMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<CalendarDay?> MapAsync(
    CalendarDayFullInput? from,
    CalendarDay? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var calendarDay = into ?? new CalendarDay() { Id = from.Id.GetValueOrDefault() };
    calendarDay.SetDayOfWeek(from.DayOfWeek);
    
    calendarDay.TimeRanges.Clear();
    calendarDay.TimeRanges.AddRange((await _mapper.MapAsync<TimeRangeInput, TimeRange>(from.TimeRanges, cancellationToken))!);

    return calendarDay;
  }
}
