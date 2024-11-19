namespace RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;

public class AmountUpdatedQuoteHistoryEntry : QuoteHistoryEntry
{
  public decimal? OldAmount { get; private set; }
  public decimal? NewAmount { get; private set; }

  public void SetOldAmount(decimal? oldAmount) => OldAmount = oldAmount;
  
  public void SetNewAmount(decimal? newAmount) => NewAmount = newAmount;
}
