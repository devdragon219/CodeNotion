using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.SharedKernel.Interfaces;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "list", Description = "List all defined tenants.")]
[HelpOption]
class List
{
  private readonly IServiceProvider _services;

  public List(IServiceProvider svc)
  {
    _services = svc;
  }

  private async Task<int> OnExecuteAsync(CommandLineApplication app, CancellationToken ct)
  {
    var tenantRepo = _services.GetRequiredService<IRepository<Tenant>>();
    var tenants = await tenantRepo.ListAsync(ct);

    app.Out.WriteLine("-------------------------------------------------------------------------------------------------");
    app.Out.WriteLine("|    GUID                          | Name                     | Creation    | Deletion    | LCK |");
    app.Out.WriteLine("-------------------------------------------------------------------------------------------------");

    foreach (var tenant in tenants)
    {
      app.Out.WriteLine($"| {tenant.GUID:N} | {tenant.Name,-24} | {        tenant.CreationDate,-11:yyyy-MM-dd} | {(
        tenant.DeletionDate.HasValue ? tenant.DeletionDate.Value.ToString("yyyy-MM-dd").PadRight(11) : "-".PadRight(11))} | {(
        tenant.LockedSince.HasValue ? "YES" : " - ")} |");
    }

    app.Out.WriteLine("-------------------------------------------------------------------------------------------------");

    return 0;
  }
}