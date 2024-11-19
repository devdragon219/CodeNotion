using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rebus.Config;
using Rebus.Pipeline;
using Rebus.Pipeline.Send;
using Rebus.Routing.TypeBased;
using RealGimm.Core.EventSystem;
using Rebus.Persistence.InMem;
using Rebus.Handlers;

namespace RealGimm.Infrastructure.MessageBus;

public class RebusConfigurator : IRebusConfigurator
{
  public virtual void ConfigureRGRebus(IServiceCollection services,
    IConfiguration config,
    string? subscribeChannel,
    IEnumerable<Type>? subscribeHandlersOnCreated)
  {
    if (subscribeHandlersOnCreated is not null)
    {
      foreach (var t in subscribeHandlersOnCreated)
      {
        services.AddRebusHandler(t);
      }
    }

    services.AddRebus(configure =>
      configure
        .Transport(t =>
        {
          if (string.IsNullOrEmpty(subscribeChannel))
          {
            t.UseRabbitMqAsOneWayClient(
              config.GetConnectionString("RabbitMq") ?? "amqp://guest:guest@localhost");
          }
          else
          {
            t.UseRabbitMq(
              config.GetConnectionString("RabbitMq") ?? "amqp://guest:guest@localhost",
              subscribeChannel);
          }
        })
        .Routing(r =>
        {
          var typeBasedRouter = r.TypeBased();
          typeBasedRouter.MapAssemblyDerivedFrom<DomainEventBase>(MessageQueues.WEB_QUEUE_NAME);
          typeBasedRouter.Map(typeof(RunTaskEvent), MessageQueues.TASKS_QUEUE_NAME);
        })
        .Timeouts(t => t.StoreInMemory())
        .Options(opt =>
        {
          opt.Decorate<IPipeline>(c =>
          {
            var pipeline = c.Get<IPipeline>();
            var stepInjector = new PipelineStepInjector(pipeline);
            stepInjector.OnSend(new AddTenantIdOutgoingStep(),
              PipelineRelativePosition.Before,
              typeof(SerializeOutgoingMessageStep));
            return stepInjector;
          });
        }),
      onCreated: async bus =>
      {
        //Subscribe to all required event types
        if (subscribeHandlersOnCreated is not null)
        {
          foreach (var t in subscribeHandlersOnCreated)
          {
            var interfaces = t.GetInterfaces();

            foreach (var intf in interfaces)
            {
              if (intf.IsGenericType
                && intf.GetGenericTypeDefinition() == typeof(IHandleMessages<>))
              {
                var messageType = intf.GetGenericArguments()[0];
                await bus.Subscribe(messageType);
              }
            }
          }
        }
      }
    );
  }
}
