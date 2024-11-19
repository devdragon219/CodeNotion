using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

public sealed class QuoteHistoryTrackingContext : IDisposable
{
  private readonly Context _context;
  private readonly IHistoryTrackingChangesDetector<QuoteHistoryEntry>[] _detectors;

  public QuoteHistoryTrackingContext(Quote quote, int UserId)
  {
    _context = new(quote, UserId);

    _detectors =
    [
      new MasterStatusUpdateDetector(_context),
      new AmountUpdateDetector(_context),
      new ApprovedAmountUpdateDetector(_context)
    ];
  }

  public void Dispose()
  {
    _context.Quote.History.AddRange(_detectors.SelectMany(detector => detector.CreateHistoryEntries()));
  }

  private record Context(Quote Quote, int UserId);

  private class MasterStatusUpdateDetector : IHistoryTrackingChangesDetector<MasterStatusUpdatedQuoteHistoryEntry>
  {
    private readonly Context _context;
    private readonly QuoteMasterStatus _initialStatus;

    public MasterStatusUpdateDetector(Context context)
    {
      _context = context;
      _initialStatus = _context.Quote.MasterStatus;
    }

    public IEnumerable<MasterStatusUpdatedQuoteHistoryEntry> CreateHistoryEntries()
    {
      var status = _context.Quote.MasterStatus;

      if (status != _initialStatus)
      {
        var historyEntry = new MasterStatusUpdatedQuoteHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetOldMasterStatus(_initialStatus);
        historyEntry.SetNewMasterStatus(status);

        yield return historyEntry;
      }
    }
  }

  private class AmountUpdateDetector : IHistoryTrackingChangesDetector<AmountUpdatedQuoteHistoryEntry>
  {
    private readonly Context _context;
    private readonly decimal _initialAmount;

    public AmountUpdateDetector(Context context)
    {
      _context = context;
      _initialAmount = _context.Quote.Amount;
    }

    public IEnumerable<AmountUpdatedQuoteHistoryEntry> CreateHistoryEntries()
    {
      var amount = _context.Quote.Amount;

      if (amount != _initialAmount)
      {
        var historyEntry = new AmountUpdatedQuoteHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetOldAmount(_initialAmount);
        historyEntry.SetNewAmount(amount);

        yield return historyEntry;
      }
    }
  }

  private class ApprovedAmountUpdateDetector : IHistoryTrackingChangesDetector<ApprovedAmountUpdatedQuoteHistoryEntry>
  {
    private readonly Context _context;
    private readonly decimal _initialApprovedAmount;

    public ApprovedAmountUpdateDetector(Context context)
    {
      _context = context;
      _initialApprovedAmount = _context.Quote.ApprovedAmount;
    }

    public IEnumerable<ApprovedAmountUpdatedQuoteHistoryEntry> CreateHistoryEntries()
    {
      var approvedAmount = _context.Quote.ApprovedAmount;

      if (approvedAmount != _initialApprovedAmount)
      {
        var historyEntry = new ApprovedAmountUpdatedQuoteHistoryEntry();
        historyEntry.SetTimestamp(DateTime.UtcNow);
        historyEntry.SetUserId(_context.UserId);
        historyEntry.SetOldApprovedAmount(_initialApprovedAmount);
        historyEntry.SetNewApprovedAmount(approvedAmount);

        yield return historyEntry;
      }
    }
  }
}
