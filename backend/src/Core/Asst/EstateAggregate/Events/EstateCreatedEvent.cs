using RealGimm.Core.EventSystem;

namespace RealGimm.Core.Asst.EstateAggregate.Events;

public record EstateCreatedEvent : DomainEventBase
{
  public int EstateId { get; set; }
  public string CreatedByUserName { get; set; }

  public EstateCreatedEvent(int estateId, string userName)
  {
    EstateId = estateId;
    CreatedByUserName = userName;
  }
}
