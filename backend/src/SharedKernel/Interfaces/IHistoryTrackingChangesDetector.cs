namespace RealGimm.SharedKernel.Interfaces;

public interface IHistoryTrackingChangesDetector<out THistoryEntry>
{
  public IEnumerable<THistoryEntry> CreateHistoryEntries();
}
