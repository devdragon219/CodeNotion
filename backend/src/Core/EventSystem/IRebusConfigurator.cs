using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RealGimm.Core.EventSystem;

public interface IRebusConfigurator
{
  void ConfigureRGRebus(IServiceCollection services,
    IConfiguration config,
    string? subscribeChannel,
    IEnumerable<Type>? subscribeHandlersOnCreated = null);
}
