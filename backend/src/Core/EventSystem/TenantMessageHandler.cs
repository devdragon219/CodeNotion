using RealGimm.SharedKernel.Interfaces;
using Rebus.Handlers;

namespace RealGimm.Core.EventSystem;

public abstract class TenantMessageHandler<T> : IHandleMessages<T> where T : DomainEventBase
{
  public required IUserDataProvider UserDataProvider { protected get; init; }
  
  public async Task Handle(T message)
  {
    UserDataProvider.SetTenantId(message.TenantId);

    await HandlePerTenant(message);
  }

  protected abstract Task HandlePerTenant(T message);
}
