namespace RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

public class NewReplyTicketHistoryEntry : TicketHistoryEntry
{
  public Reply Reply { get; private set; } = default!;

  public void SetReply(Reply reply) => Reply = reply;
}
