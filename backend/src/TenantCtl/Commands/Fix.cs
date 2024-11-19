using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.SharedKernel.Interfaces;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "fix", Description = "Fix tenant databases. If the relevant environment variables are set, and no database is available, creates a new one with the specified settings.")]
[HelpOption]
class Fix
{
  public static readonly string SINGLE_TENANT_ENVVAR = "RG5_ST_";

  [Option("-g|--guid", Description = "The GUID of a tenant to fix. If unspecified, all tenants will be fixed.")]
  public string? Guid { get; }

  private readonly IServiceProvider _services;

  public Fix(IServiceProvider svc)
  {
    _services = svc;
  }

  private async Task<int> OnExecuteAsync(CommandLineApplication app, CancellationToken ct)
  {
    var singleTenantHandler = _services.GetRequiredService<ISingleTenantHandler>();

    if (singleTenantHandler.CanHandle)
    {
      app.Out.WriteLine("Ensuring single tenant situation is set before fixing.");
      if(!await singleTenantHandler.HandleSingleTenant(ct))
      {
        return ErrorResults.E_TENANTFIXFAILURE;
      }
    }

    return await FixExisting(app, ct);
  }

  private async Task<int> FixExisting(
    CommandLineApplication app,
    CancellationToken ct)
  {
    var tenantRepo = _services.GetRequiredService<IRepository<Tenant>>();

    var tenantGuid = !string.IsNullOrEmpty(Guid)
      ? System.Guid.Parse(Guid)
      : System.Guid.NewGuid();

    foreach (var tenant in (await tenantRepo.ListAsync(ct))
      .Where(t => string.IsNullOrEmpty(Guid) || t.GUID == tenantGuid))
    {
      await using var tenantScope = _services.CreateAsyncScope();
      
      var udp = tenantScope.ServiceProvider.GetRequiredService<IUserDataProvider>();

      udp.SetTenantId(tenant.GUID);

      app.Out.WriteLine($"Fixing tenant {tenant.GUID}");

      //This will only lead to an useless amount of auditing data
      var auditConfigurator = tenantScope.ServiceProvider.GetRequiredService<IAuditConfigurator>();
      auditConfigurator.Disable();

      try
      {
        var tenantPreparer = tenantScope.ServiceProvider.GetRequiredService<ITenantPreparer>();

        await tenantPreparer.PrepareAsync(ct);

        app.Out.WriteLine("Tenant data fixed if needed.");
      }
      catch (Exception ex)
      {
        app.Error.WriteLine($"An error occurred fixing the DB. {ex}");
        return ErrorResults.E_TENANTFIXFAILURE;
      }

      try
      {
        var seeder = tenantScope.ServiceProvider.GetRequiredService<IDataSeeder>();

        await seeder.UpdateAsync(ct);

        app.Out.WriteLine("Tenant data updated successfully.");
      }
      catch (Exception ex)
      {
        app.Error.WriteLine($"An error occurred updating the DB. {ex}");
        return ErrorResults.E_TENANTSEEDFAILURE;
      }
    }

    return 0;
  }
}
