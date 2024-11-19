using RealGimm.SharedKernel.Attributes;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

public class ReminderUpdatedTicketHistoryEntry : TicketHistoryEntry
{
  public DateOnly OldReminderDate { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string OldReminderSummary { get; private set; } = default!;

  public DateOnly NewReminderDate { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string NewReminderSummary { get; private set; } = default!;

  public void SetReminderData(DateOnly oldDate, string oldSummary, DateOnly newDate, string newSummary)
  {
    OldReminderDate = oldDate;
    OldReminderSummary = oldSummary;
    NewReminderDate = newDate;
    NewReminderSummary = newSummary;
  }

}
