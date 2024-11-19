namespace RealGimm.Core.EventSystem;

public abstract record DomainEventBase
{
  public DateTime DateOccurred { get; set; } = DateTime.UtcNow;
  public Guid TenantId { get; set; }
  public int? CultureId { get; set; }
}
