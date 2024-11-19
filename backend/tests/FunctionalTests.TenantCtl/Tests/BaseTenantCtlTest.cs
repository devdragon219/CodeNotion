using Autofac;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RealGimm.SharedKernel.Interfaces;
using HostBuilder = RealGimm.TenantCtl.HostBuilder;

namespace RealGimm.FunctionalTests.TenantCtl.Tests;

public abstract class BaseTenantCtlTest
{
  protected readonly TenantCtlFactory Factory;

  public BaseTenantCtlTest(TenantCtlFactory factory)
  {
    Factory = factory;
    BaseArgs = new()
    {
      {"ConnectionStrings:TenantConnection", Factory.DbConnection.ConnectionString.Replace("realgimm_5", "realgimm_{Tenant}")},
      {"ConnectionStrings:DefaultConnection", Factory.DbConnection.ConnectionString},
      {"JwtSigningKey", "yk3TVjUqQ7XQ7tlSLYCb5xRNGH0YH7LM+RXG9"}
    };
  }

  protected Dictionary<string, string?> BaseArgs;

  protected string[] GetWebHostArgs()
  {
    return BaseArgs.Select(kvp => $"--{kvp.Key}={kvp.Value}").ToArray();
  }

  protected async Task<IHost> MakeHost(IConsole console, params string[] args)
  {
    if (!BaseArgs.ContainsKey("ConnectionStrings:RabbitMq"))
    {
      BaseArgs.Add("ConnectionStrings:RabbitMq", "amqp://guest:guest@"
        + RabbitMqContainer.Instance.GetConnectionStringHostPort());
    }

    var builder = HostBuilder.CreateHostBuilder(args, BaseArgs);

    builder.ConfigureServices(cd =>
    {
      cd.AddSingleton(console);
    });

    builder.ConfigureContainer<ContainerBuilder>(builder =>
    {
      builder.RegisterInstance<IUserDataProvider>(UserDataProvider.Instance);
    });

    var host = builder.Build();
    var infrastructureSetup = host.Services.GetRequiredService<IInfrastructurePreparer>();
    await infrastructureSetup.PrepareAsync(default);
    return host;
  }
}
