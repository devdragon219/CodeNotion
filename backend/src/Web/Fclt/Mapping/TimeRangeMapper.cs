using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class TimeRangeMapper : IMapper<TimeRangeInput, TimeRange>
{
  public TimeRange? MapAsync(TimeRangeInput? from, TimeRange? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var timeRange = into ?? new TimeRange();
    timeRange.SetSince(from.Since);
    timeRange.SetUntil(from.Until);

    return timeRange;
  }

  Task<TimeRange?> IMapper<TimeRangeInput, TimeRange>.MapAsync(
    TimeRangeInput? from,
    TimeRange? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
