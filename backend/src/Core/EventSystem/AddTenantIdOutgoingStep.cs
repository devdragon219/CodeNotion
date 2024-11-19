using Microsoft.Extensions.DependencyInjection;
using RealGimm.SharedKernel.Interfaces;
using Rebus.Messages;
using Rebus.Pipeline;

namespace RealGimm.Core.EventSystem;

[StepDocumentation("Automatically fill-in tenant id data if missing")]
public class AddTenantIdOutgoingStep : IOutgoingStep
{
  public async Task Process(OutgoingStepContext context, Func<Task> next)
  {
    var serviceProvider = context.Load<IServiceProvider>();
    if (serviceProvider is not null)
    {
      var userDataProvider = serviceProvider.GetService<IUserDataProvider>();
      if (userDataProvider is not null)
      {
        var message = context.Load<Message>();
        if (message.Body is not null && message.Body is DomainEventBase domainMessage)
        {
          var msg = new Message(message.Headers, domainMessage with
          {
            TenantId = userDataProvider.TenantId
          });

          context.Save(msg);
        }
      }
    }

    await next();
  }
}