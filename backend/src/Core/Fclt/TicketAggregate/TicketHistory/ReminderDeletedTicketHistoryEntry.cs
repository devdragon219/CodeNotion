using RealGimm.SharedKernel.Attributes;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

public class ReminderDeletedTicketHistoryEntry : TicketHistoryEntry
{
  public DateOnly ReminderDate { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string ReminderSummary { get; private set; } = default!;

  public void SetReminderData(DateOnly date, string summary)
  {
    ReminderDate = date;
    ReminderSummary = summary;
  }
}
