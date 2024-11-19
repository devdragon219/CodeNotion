using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "copy-from", Description = "Populate data on a given tenant from a previous version.")]
[HelpOption]
class CopyFrom
{
  [Argument(0, Description = "The name or GUID of the tenant to populate.")]
  public string? Identifier { get; }

  private readonly IServiceProvider _services;

  public CopyFrom(IServiceProvider svc)
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

    //Search for the specified tenant
    var tenantRepo = _services.GetRequiredService<IRepository<Tenant>>();
    var tenantName = Identifier!;
    if (!Guid.TryParse(tenantName, out Guid tenantGuid))
    {
      tenantGuid = Guid.NewGuid();
    }

    var tsearch = new TenantByNameOrGuid(tenantGuid, tenantName);
    var searchResults = await tenantRepo.ListAsync(tsearch, ct);

    if (searchResults.Count > 1)
    {
      return ErrorResults.E_TENANTMULTIPLEMATCHES;
    }
    else if (!searchResults.Any())
    {
      return ErrorResults.E_TENANTNOTFOUND;
    }

    var tenant = searchResults.FirstOrDefault()!;

    var udp = _services.GetRequiredService<IUserDataProvider>();

    udp?.SetTenantId(tenant.GUID);

    //This will only lead to an useless amount of auditing data
    var auditConfigurator = _services.GetRequiredService<IAuditConfigurator>();
    auditConfigurator.Disable();

    var importerGroups = _services
      .GetServices<IUpstreamDataImporter>()
      .GroupBy(s => s.ExecutionOrder)
      .OrderBy(grp => grp.Key);

    app.Out.WriteLine($"Begin tenant data copy from upstream - {importerGroups.Count()} importer groups");
    
    //Instantiate all data importers and run
    foreach (var dataImporterGroup in importerGroups)
    {
      var tasks = dataImporterGroup
          .Select(ddf => ddf.PerformUpstreamUpdate(CancellationToken.None))
          .ToArray();
        
      await Task.WhenAll(tasks);
    }

    return 0;
  }
}