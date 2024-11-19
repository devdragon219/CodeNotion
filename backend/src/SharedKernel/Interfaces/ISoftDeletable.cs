namespace RealGimm.SharedKernel.Interfaces;

public interface ISoftDeletable
{
  public DateTime? DeletionDate { get; }
  
  public void MarkAsDeleted();
}
