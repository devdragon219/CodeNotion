using RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

public sealed class TicketHistoryTrackingContext : IDisposable
{
  private readonly Context _context;
  private readonly IHistoryTrackingChangesDetector<TicketHistoryEntry>[] _detectors;
  private readonly QuoteHistoryTrackingContext? _quoteHistoryTrackingContext;

  public TicketHistoryTrackingContext(Ticket ticket, int UserId)
  {
    _context = new(ticket, UserId);

    _detectors =
    [
      new NewRepliesDetector(_context),
      new MasterStatusUpdateDetector(_context),
      new NewRemindersDetector(_context),
      new RemindersDeletionDetector(_context),
      new RemindersUpdateDetector(_context),
      new ConvertingToExcludedFromMaintenanceContractDetector(_context)
    ];

    if (_context.Ticket.Quote is not null)
    {
      _quoteHistoryTrackingContext = new(_context.Ticket.Quote, UserId);
    }
  }

  public void Dispose()
  {
    _context.Ticket.History.AddRange(_detectors.SelectMany(detector => detector.CreateHistoryEntries()));

    if (_quoteHistoryTrackingContext is null)
    {
      // if Quote value was changed from null to not null value during the tracking
      // it's needed to insert initial entries to the Quote history
      if (_context.Ticket.Quote is not null)
      {
        var historyEntry = new MasterStatusUpdatedQuoteHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetNewMasterStatus(_context.Ticket.Quote.MasterStatus);

        _context.Ticket.Quote.History.Add(historyEntry);
      }
    }
    else
    {
      // inserting entries to the Quote history
      _quoteHistoryTrackingContext.Dispose();
    }
  }

  private record Context(Ticket Ticket, int UserId);

  private class NewRepliesDetector : IHistoryTrackingChangesDetector<NewReplyTicketHistoryEntry>
  {
    private readonly Context _context;
    private readonly List<Reply> _initialReplies;

    public NewRepliesDetector(Context context)
    {
      _context = context;
      _initialReplies = _context.Ticket.Replies.ToList();
    }

    public IEnumerable<NewReplyTicketHistoryEntry> CreateHistoryEntries()
    {
      var newReplies = _context.Ticket.Replies.Except(_initialReplies);

      foreach (var reply in newReplies)
      {
        var historyEntry = new NewReplyTicketHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetReply(reply);

        yield return historyEntry;
      }
    }
  }

  private class MasterStatusUpdateDetector : IHistoryTrackingChangesDetector<MasterStatusUpdatedTicketHistoryEntry>
  {
    private readonly Context _context;
    private readonly TicketMasterStatus _initialStatus;

    public MasterStatusUpdateDetector(Context context)
    {
      _context = context;
      _initialStatus = _context.Ticket.MasterStatus;
    }

    public IEnumerable<MasterStatusUpdatedTicketHistoryEntry> CreateHistoryEntries()
    {
      var status = _context.Ticket.MasterStatus;

      if (status != _initialStatus)
      {
        var historyEntry = new MasterStatusUpdatedTicketHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetOldMasterStatus(_initialStatus);
        historyEntry.SetNewMasterStatus(status);

        yield return historyEntry;
      }
    }
  }

  private class NewRemindersDetector : IHistoryTrackingChangesDetector<NewReminderTicketHistoryEntry>
  {
    private readonly Context _context;
    private readonly List<Reminder> _initialReminders;

    public NewRemindersDetector(Context context)
    {
      _context = context;
      _initialReminders = _context.Ticket.Reminders.ToList();
    }

    public IEnumerable<NewReminderTicketHistoryEntry> CreateHistoryEntries()
    {
      var newReminders = _context.Ticket.Reminders.Except(_initialReminders);

      foreach (var reminder in newReminders)
      {
        var historyEntry = new NewReminderTicketHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetReminderData(reminder.Date, reminder.Summary);

        yield return historyEntry;
      }
    }
  }

  private class RemindersDeletionDetector : IHistoryTrackingChangesDetector<ReminderDeletedTicketHistoryEntry>
  {
    private readonly Context _context;
    private readonly List<Reminder> _initialReminders;

    public RemindersDeletionDetector(Context context)
    {
      _context = context;
      _initialReminders = _context.Ticket.Reminders.ToList();
    }

    public IEnumerable<ReminderDeletedTicketHistoryEntry> CreateHistoryEntries()
    {
      var deletedReminders = _initialReminders.Except(_context.Ticket.Reminders);

      foreach (var reminder in deletedReminders)
      {
        var historyEntry = new ReminderDeletedTicketHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetReminderData(reminder.Date, reminder.Summary);

        yield return historyEntry;
      }
    }
  }

  private class RemindersUpdateDetector : IHistoryTrackingChangesDetector<ReminderUpdatedTicketHistoryEntry>
  {
    private readonly Context _context;
    private readonly Dictionary<Reminder, ReminderData> _initialReminders;

    public RemindersUpdateDetector(Context context)
    {
      _context = context;

      _initialReminders = _context.Ticket.Reminders.ToDictionary(
        reminder => reminder,
        reminder => new ReminderData(reminder.Date, reminder.Summary));
    }

    public IEnumerable<ReminderUpdatedTicketHistoryEntry> CreateHistoryEntries()
    {
      var reminders = _context.Ticket.Reminders;

      foreach (var reminder in reminders)
      {
        if (!_initialReminders.TryGetValue(reminder, out var initialData))
        {
          // skipping new reminders
          continue;
        }

        if (reminder.Summary == initialData.Summary &&
          reminder.Date == initialData.Date)
        {
          // skipping reminders with no changes
          continue;
        }

        var historyEntry = new ReminderUpdatedTicketHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetReminderData(initialData.Date, initialData.Summary, reminder.Date, reminder.Summary);

        yield return historyEntry;
      }
    }

    private record ReminderData(DateOnly Date, string Summary);
  }

  private class ConvertingToExcludedFromMaintenanceContractDetector : IHistoryTrackingChangesDetector<ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry>
  {
    private readonly Context _context;
    private readonly bool _initialIsExcludedFromMaintenanceContract;

    public ConvertingToExcludedFromMaintenanceContractDetector(Context context)
    {
      _context = context;
      _initialIsExcludedFromMaintenanceContract = _context.Ticket.IsExcludedFromMaintenanceContract;
    }

    public IEnumerable<ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry> CreateHistoryEntries()
    {
      var isExcludedFromMaintenanceContract = _context.Ticket.IsExcludedFromMaintenanceContract;

      if (isExcludedFromMaintenanceContract && isExcludedFromMaintenanceContract != _initialIsExcludedFromMaintenanceContract)
      {
        var historyEntry = new ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);

        yield return historyEntry;
      }
    }
  }
}
