using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class PerformedActivityMapper : IMapper<PerformedActivityInput, PerformedActivity>
{
  public PerformedActivity? MapAsync(PerformedActivityInput? from, PerformedActivity? into = null)
  {
    if (from is null)
    {
      return null;
    }

    if (into is null)
    {
      throw new NotSupportedException();
    }

    var performedActivity = into ?? new PerformedActivity() { Id = from.Id.GetValueOrDefault() };
    performedActivity.SetStatus(from.Status);

    return performedActivity;
  }

  Task<PerformedActivity?> IMapper<PerformedActivityInput, PerformedActivity>.MapAsync(
    PerformedActivityInput? from,
    PerformedActivity? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
