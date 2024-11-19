using RealGimm.Core.EventSystem;

namespace RealGimm.Core.Anag.SubjectAggregate.Events;

public record SubjectCreatedEvent : DomainEventBase
{
  public int SubjectId { get; private set; }
  public string CreatedByUserName { get; private set; }

  public SubjectCreatedEvent(int subjectId, string createdByUserName)
  {
    SubjectId = subjectId;
    CreatedByUserName = createdByUserName;
  }
}
