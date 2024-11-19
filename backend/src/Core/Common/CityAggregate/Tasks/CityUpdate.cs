using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.CityAggregate.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 1 * * ?")]
[Description("Update cities from upstream provider")]
public class CityUpdate : AnyTenantJob
{
  private readonly ILogger<CityUpdate> _logger;

  public CityUpdate(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<CityUpdate> logger)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var cityProviders = scopedProvider.GetServices<ICityProvider>();
    var cityRepository = scopedProvider.GetRequiredService<IReadRepository<City>>();

    var importedCountries = await cityRepository
      .AsQueryable()
      .Select(city => city.CountryISO)
      .Distinct()
      .ToListAsync();

    _logger.LogInformation("Updating cities for tenant {tenantId}", tenantId);

    foreach (var cp in cityProviders
      .GroupBy(cprov => cprov.Id)
      .Select(grp => grp.First()))
    {
      foreach (var countryIso3 in importedCountries.Where(cp.CanHandleCountry))
      {
        await cp.ImportUpdatesMasterList(countryIso3, null, context.CancellationToken);

        _logger.LogInformation("Per-country data updated via {Importer} for country {Country}",
          cp.GetType().Name,
          countryIso3);
      }
    }
  }
}
