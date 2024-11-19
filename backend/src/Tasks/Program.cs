using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PdfSharp.Fonts;
using RealGimm.Core.Resources;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Tasks;

public class Program
{
  public static async Task Main(string[] args)
  {
    var host = HostBuilder.CreateHostBuilder(args).Build();

    // Configure auditing
    using (var scope = host.Services.CreateScope())
    {
      var services = scope.ServiceProvider;
      var auditConfigurator = services.GetRequiredService<IAuditConfigurator>();
      auditConfigurator?.Configure(services);
    }

    await using (var scope = host.Services.CreateAsyncScope())
    {
      var infrastructureSetup = scope.ServiceProvider.GetRequiredService<IInfrastructurePreparer>();
      await infrastructureSetup.PrepareAsync();
    }

    GlobalFontSettings.FontResolver ??= new FontResolver();

    await host.RunAsync();
  }
}
