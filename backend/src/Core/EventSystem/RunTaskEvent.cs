namespace RealGimm.Core.EventSystem;

public record RunTaskEvent
{
  public DateTime Date { get; set; } = DateTime.UtcNow;
  public string JobIdentifier { get; set; } = default!;
}
