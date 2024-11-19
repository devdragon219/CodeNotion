using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "delete", Description = "Delete a tenant by name or GUID.")]
[HelpOption]
class Delete
{
  [Argument(0, Description = "The name or GUID of the tenant.")]
  public string? Identifier { get; }

  private readonly IServiceProvider _services;

  public Delete(IServiceProvider svc)
  {
    _services = svc;
  }

  private async Task<int> OnExecuteAsync(CommandLineApplication app, CancellationToken ct)
  {
    if (string.IsNullOrEmpty(Identifier))
    {
      app.Error.WriteLine("Please enter the tenant identifier.");
      return ErrorResults.E_MISSING_PARAMETERS;
    }

    var tenantRepo = _services.GetRequiredService<IRepository<Tenant>>();
    var tenantName = Identifier!;
    if (!Guid.TryParse(tenantName, out Guid tenantGuid))
    {
      tenantGuid = Guid.NewGuid();
    }
    var tsearch = new TenantByNameOrGuid(tenantGuid, tenantName);
    var searchResults = await tenantRepo.ListAsync(tsearch, ct);

    if (searchResults.Count == 1)
    {
      var tenant = searchResults.FirstOrDefault()!;

      if (!tenant.DeletionDate.HasValue)
      {
        tenant.MarkAsDeleted();
        await tenantRepo.UpdateAsync(tenant, ct);
      }
      else
      {
        app.Out.WriteLine($"Tenant {tenant.GUID} already deleted (since {tenant.DeletionDate})");
      }

      return 0;
    }
    else if (searchResults.Count > 1)
    {
      return ErrorResults.E_TENANTMULTIPLEMATCHES;
    }
    else
    {
      return ErrorResults.E_TENANTNOTFOUND;
    }
  }
}