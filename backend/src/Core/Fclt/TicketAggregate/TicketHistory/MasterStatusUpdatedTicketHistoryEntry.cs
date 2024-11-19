namespace RealGimm.Core.Fclt.TicketAggregate.TicketHistory;

public class MasterStatusUpdatedTicketHistoryEntry : TicketHistoryEntry
{
  public TicketMasterStatus? OldMasterStatus { get; private set; }
  public TicketMasterStatus NewMasterStatus { get; private set; }

  public void SetOldMasterStatus(TicketMasterStatus? oldMasterStatus) => OldMasterStatus = oldMasterStatus;

  public void SetNewMasterStatus(TicketMasterStatus newMasterStatus) => NewMasterStatus = newMasterStatus;
}
