using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "make-demo", Description = "Populate demo data on a given tenant.")]
[HelpOption]
class MakeDemo
{
  [Argument(0, Description = "The name or GUID of the tenant to populate.")]
  public string? Identifier { get; }

  [Option("-u|--users", Description = "The number of users to generate. By default 5.")]
  public int Users { get; } = 5;

  [Option("-c|--country", Description = "The country to use for country-specific data seed operations.")]
  public string? Country { get; }
  
  [Option("-s|--short", Description = "Perform just a short version of demo data entry.")]
  public bool IsShort { get; }

  private readonly IServiceProvider _services;

  public MakeDemo(IServiceProvider svc)
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

    CountryCulture.SetCountry(Country);

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

    var tenantPreparer = _services.GetRequiredService<ITenantPreparer>();

    await tenantPreparer.FillWithDemoDataAsync(IsShort, ct);

    return 0;
  }
}