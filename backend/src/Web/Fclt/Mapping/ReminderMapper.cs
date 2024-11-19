using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class ReminderMapper : IMapper<ReminderInput, Reminder>
{
  public Reminder? MapAsync(ReminderInput? from, Reminder? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var reminder = into ?? new Reminder() { Id = from.Id.GetValueOrDefault() };
    reminder.SetData(from.Date, from.Summary);

    return reminder;
  }

  Task<Reminder?> IMapper<ReminderInput, Reminder>.MapAsync(
    ReminderInput? from,
    Reminder? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
