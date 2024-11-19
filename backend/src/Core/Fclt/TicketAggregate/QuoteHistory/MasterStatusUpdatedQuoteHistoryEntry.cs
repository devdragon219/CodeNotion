namespace RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

public class MasterStatusUpdatedQuoteHistoryEntry : QuoteHistoryEntry
{
  public QuoteMasterStatus? OldMasterStatus { get; private set; }
  public QuoteMasterStatus NewMasterStatus { get; private set; }

  public void SetNewMasterStatus(QuoteMasterStatus newMasterStatus) => NewMasterStatus = newMasterStatus;

  public void SetOldMasterStatus(QuoteMasterStatus? oldMasterStatus) => OldMasterStatus = oldMasterStatus;
}
