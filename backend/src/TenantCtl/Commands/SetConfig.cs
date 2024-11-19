using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Core;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "set-config", Description = "Set a configuration value for a tenant.")]
[HelpOption]
class SetConfig
{
  [Argument(0, Description = "The name or GUID of the tenant to populate.")]
  public string Identifier { get; } = default!;

  [Argument(1, Description = "The category (function id) for the value to set.")]
  public int CodeCategory { get; } = default!;

  [Argument(2, Description = "The name for the value to set.")]
  public string CodeName { get; } = default!;

  [Argument(3, Description = "The value to set.")]
  public string CodeValue { get; } = default!;

  private readonly IServiceProvider _services;

  public SetConfig(IServiceProvider svc)
  {
    _services = svc;
  }

  private async Task<int> OnExecuteAsync(CommandLineApplication app, CancellationToken ct)
  {
    if (string.IsNullOrEmpty(Identifier)
      || string.IsNullOrEmpty(CodeName)
      || string.IsNullOrEmpty(CodeValue))
    {
      app.Error.WriteLine("Please enter required data (tenant identifier, category id, name, value).");
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

    var configRepo = _services.GetRequiredService<IRepository<Config>>();

    var function = (ConfigFunction)CodeCategory;

    //Get existing, if any
    var code = await configRepo.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(function, CodeName), ct);

    if (code is not null)
    {
      code.SetValue(CodeValue);
      await configRepo.UpdateAsync(code, ct);
    }
    else
    {
      code = new Config();
      code.SetReferenceData(CodeName, function);
      code.SetValue(CodeValue);
      await configRepo.AddAsync(code, ct);
    }

    app.Out.WriteLine($"Configuration parameter {CodeName} updated successfully");

    return 0;
  }
}
