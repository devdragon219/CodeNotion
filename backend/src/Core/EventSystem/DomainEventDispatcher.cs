using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using Rebus.Bus;

namespace RealGimm.Core.EventSystem;

public class DomainEventDispatcher : IDomainEventDispatcher
{
  private readonly IBus _bus;
  private readonly IUserDataProvider _user;

  public DomainEventDispatcher(IBus bus, IUserDataProvider user)
  {
    _bus = bus;
    _user = user;
  }

  public async Task Dispatch(DomainEventBase eventObject)
  {
    var eventWithTenant = eventObject with
    {
      TenantId = _user.TenantId
    };

    await _bus.Publish(eventWithTenant);
  }

  public async Task DispatchAndClearEvents(IEnumerable<EntityBase> entitiesWithEvents)
  {
    foreach (var entity in entitiesWithEvents)
    {
      var events = entity.DomainEvents.ToArray();

      entity.ClearDomainEvents();

      foreach (var domainEvent in events)
      {
        var eventType = domainEvent.GetType();

        //If the event has the HasEntityId attribute, and the value is zero,
        // apply the ID from the entity
        var entityIdAttr = Attribute.GetCustomAttribute(
          eventType,
          typeof(HasEntityIdAttribute)) as HasEntityIdAttribute;

        if (entityIdAttr is not null)
        {
          var propertyInfo = eventType.GetProperty(entityIdAttr.PropertyName);

          if (propertyInfo is not null && (propertyInfo.PropertyType == typeof(int)
            || propertyInfo.PropertyType == typeof(int?)))
          {
            // Get the value of the property from the event instance
            var value = propertyInfo.GetValue(domainEvent);
            if (value is null || (int)value == 0)
            {
              propertyInfo.SetValue(domainEvent, entity.Id);
            }
          }
        }

        await _bus.Publish(domainEvent).ConfigureAwait(false);
      }
    }
  }
}
