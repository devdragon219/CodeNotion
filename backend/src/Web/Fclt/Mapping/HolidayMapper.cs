using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class HolidayMapper : IMapper<HolidayInput, Holiday>
{
  public Holiday? MapAsync(HolidayInput? from, Holiday? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var holiday = into ?? new Holiday() { Id = from.Id.GetValueOrDefault() };
    holiday.SetName(from.Name);
    holiday.SetDate(from.Date);
    holiday.SetPeriodicity(from.Periodicity);

    return holiday;
  }

  Task<Holiday?> IMapper<HolidayInput, Holiday>.MapAsync(
    HolidayInput? from,
    Holiday? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
