using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.WebCommons.Extensions;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class CalendarMapper : IMapper<CalendarInput, Calendar>
{
  private readonly IMapper _mapper;

  public CalendarMapper(IMapper mapper)
  {
    _mapper = mapper;
  }

  public async Task<Calendar?> MapAsync(
    CalendarInput? from,
    Calendar? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var calendar = into ?? new Calendar();
    calendar.SetName(from.Name);
    calendar.SetTimeZoneId(from.TimeZoneId);
    
    await _mapper.UpdateCollectionAsync(from.Holidays, calendar.Holidays, cancellationToken);
    
    var dayFullInputs = new[]
      { 
        ConvertToFullInput(from.Sunday, DayOfWeek.Sunday),
        ConvertToFullInput(from.Monday, DayOfWeek.Monday),
        ConvertToFullInput(from.Tuesday, DayOfWeek.Tuesday),
        ConvertToFullInput(from.Wednesday, DayOfWeek.Wednesday),
        ConvertToFullInput(from.Thursday, DayOfWeek.Thursday),
        ConvertToFullInput(from.Friday, DayOfWeek.Friday),
        ConvertToFullInput(from.Saturday, DayOfWeek.Saturday)
      }
      .Where(input => input is not null);

    await _mapper.UpdateCollectionAsync((IEnumerable<CalendarDayFullInput>)dayFullInputs, calendar.Days, cancellationToken);

    return calendar;
  }

  private static CalendarDayFullInput? ConvertToFullInput(CalendarDayInput? input, DayOfWeek dayOfWeek)
  {
    if (input is null)
    {
      return null;
    }

    var fullInput = new CalendarDayFullInput
    {
      Id = input.Id,
      DayOfWeek = dayOfWeek,
      TimeRanges = input.TimeRanges
    };

    return fullInput;
  }
}
