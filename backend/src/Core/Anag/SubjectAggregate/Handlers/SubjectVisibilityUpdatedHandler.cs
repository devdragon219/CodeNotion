using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate.Events;
using RealGimm.SharedKernel.Attributes;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Anag.SubjectAggregate.AccessFilter;

namespace RealGimm.Core.Anag.SubjectAggregate.Handlers;

[WebEventHandler]
public class SubjectVisibilityUpdatedHandler : TenantMessageHandler<SubjectVisibilityUpdatedEvent>
{
  public required ILogger<SubjectVisibilityUpdatedHandler> Logger { protected get; init; }
  public required SubjectAccessFilter SubjectAccessFilter {protected get; init;}

  protected override Task HandlePerTenant(SubjectVisibilityUpdatedEvent message)
  {
    Logger.LogInformation("Updating access caches");

    SubjectAccessFilter.InvalidationSource.Cancel();

    return Task.CompletedTask;
  }
}