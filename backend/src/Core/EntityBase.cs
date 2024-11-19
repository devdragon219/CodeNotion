using System.ComponentModel.DataAnnotations.Schema;
using HotChocolate;
using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public abstract class EntityBase : IIdentifiable
{
  public int Id { get; set; }

  private readonly List<DomainEventBase> _domainEvents = new();
  [NotMapped]
  [GraphQLIgnore]
  public IEnumerable<DomainEventBase> DomainEvents => _domainEvents.AsReadOnly();

  protected void RegisterDomainEvent(DomainEventBase domainEvent) => _domainEvents.Add(domainEvent);
  internal void ClearDomainEvents() => _domainEvents.Clear();
  protected bool HasDomainEvent<T>() => _domainEvents.Any(de => de is T);

  public virtual void UpdateDomainEventsBeforeSave() { }
}
