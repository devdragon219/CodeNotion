using Autofac;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Builder;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web;
using RealGimm.Web.HostBuilderConfiguration;
using RealGimm.WebCommons;

namespace RealGimm.FunctionalTests.TenantCtl;

public static class WebBackendHost
{
  private static IRequestExecutor? _requestExecutor;
  private static WebApplication? _webApplication;

  public static async Task<(IRequestExecutor, WebApplication)> StartWebServer(params string[] args)
  {
    if (_requestExecutor == null)
    {
      Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Development");
      var builder = HostBuilder.CreateHostBuilder(
        args,
        typeof(Auth).Assembly,
        Auth.ISSUER,
        Auth.AUDIENCE,
        true);

      
      builder.Host.ConfigureContainer<ContainerBuilder>((ctx, containerBuilder) =>
          {
            containerBuilder.RegisterType<Auth>()
              .As<IAuthSettingsProvider>()
              .InstancePerLifetimeScope();
          });

      var gqlBuilder = builder.Services.ConfigureRGGraphQL();

      TestHostConfigurator.ConfigureBuilder(builder.Host, args);
      _requestExecutor = await gqlBuilder.BuildRequestExecutorAsync();
      _webApplication = builder.Build();
    }

    return (_requestExecutor!, _webApplication!);
  }
}
