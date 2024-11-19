namespace RealGimm.Core.EventSystem;

public interface IDomainEventDispatcher
{
  Task DispatchAndClearEvents(IEnumerable<EntityBase> entitiesWithEvents);
  Task Dispatch(DomainEventBase eventObject);
}
