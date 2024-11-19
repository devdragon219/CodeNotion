using System.ComponentModel;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Taxes;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Common.TaxConfigAggregate.Tasks;

[DisallowConcurrentExecution]
//Every day of the first 7 days of Jan, at 4:30 am
[DefaultCronSchedule("0 30 4 1,2,3,4,5,6,7 1 ?")]
[Description("Replicate tax configuration from one year to the next, to begin calculating taxes with some data until updates arrive")]
public class TaxConfigYearlyDuplicate : AnyTenantJob
{
  private readonly ILogger<TaxConfigYearlyDuplicate> _logger;

  public TaxConfigYearlyDuplicate(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<TaxConfigYearlyDuplicate> logger)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var tcService = scopedProvider.GetRequiredService<TaxCalculatorService>();

    var didDuplicate = await tcService.DuplicateYearlyConfiguration(CancellationToken.None);

    if (!didDuplicate)
    {
      _logger.LogInformation("Tenant {tenantId} was already configured", tenantId);
    }
    else
    {
      _logger.LogInformation("Tenant {tenantId} configuration was duplicated", tenantId);
    }
  }
}
