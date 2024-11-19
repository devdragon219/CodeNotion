using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Taxes.Interfaces;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Taxes.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 0 ? * SUN")]
[Description("Update taxes for all cadastral units")]
public sealed class TaxUpdateJob : AnyTenantJob
{
  private readonly ILogger<TaxUpdateJob> _logger;

  public TaxUpdateJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<TaxUpdateJob> logger)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var cadastralUnits = await scopedProvider
      .GetRequiredService<IRepository<CadastralUnit>>()
      .AsQueryable(new EntityNonDeletedSpec<CadastralUnit>(), new CadastralUnitIncludeAllSpec())
      .ToListAsync();

    foreach (var calculator in scopedProvider.GetServices<ITaxCalculator>())
    {
      try
      {
        await calculator.UpdateBatchAsync(cadastralUnits, CancellationToken.None);        
        _logger.LogInformation(@"""{calculator}"" taxes for tenant {tenantId} are updated.", calculator.Description, tenantId);
      }
      catch
      {
        _logger.LogError(@"Failed to update ""{calculator}"" taxes for tenant {tenantId}.", calculator.Description, tenantId);
      }
    }
  }
}
