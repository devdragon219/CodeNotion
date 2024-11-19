using RealGimm.SharedKernel.Interfaces;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RealGimm.Core.Resources;
using PdfSharp.Fonts;

namespace RealGimm.TenantCtl;

[Command(Name = "TenantCtl", Description = "Tenant management tool", ExtendedHelpText = "Usage: TenantCtl [options] [command] [command-options]")]
[HelpOption]
[Subcommand(
  typeof(Commands.Add),
  typeof(Commands.List),
  typeof(Commands.Delete),
  typeof(Commands.Lock),
  typeof(Commands.MakeDemo),
  typeof(Commands.CopyFrom),
  typeof(Commands.Fix),
  typeof(Commands.SetConfig),
  typeof(Commands.RunTask),
  typeof(Commands.UnlockAdmin)
)]
public class Program
{
  public static async Task<int> Main(string[] args)
  {
    var host = HostBuilder.CreateHostBuilder(args).Build();

    var infrastructureSetup = host.Services.GetRequiredService<IInfrastructurePreparer>();

    await infrastructureSetup.PrepareAsync(CancellationToken.None);

    // Configure auditing
    using (var scope = host.Services.CreateScope())
    {
      var services = scope.ServiceProvider;
      var auditConfigurator = services.GetRequiredService<IAuditConfigurator>();
      auditConfigurator?.Configure(services);
    }

    GlobalFontSettings.FontResolver ??= new FontResolver();
    
    return await host.RunCommandLineApplicationAsync(CancellationToken.None);
  }
}
