namespace RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

public class ApprovedAmountUpdatedQuoteHistoryEntry : QuoteHistoryEntry
{
  public decimal? OldApprovedAmount { get; private set; }
  public decimal? NewApprovedAmount { get; private set; }

  public void SetOldApprovedAmount(decimal? oldApprovedAmount) => OldApprovedAmount = oldApprovedAmount;

  public void SetNewApprovedAmount(decimal? newApprovedAmount) => NewApprovedAmount = newApprovedAmount;
}
