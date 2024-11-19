using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Quartz;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public abstract class ParallelAnyTenantJob : IJob
{
  private readonly IReadRepository<Tenant> _tenantsRepository;
  private readonly IServiceProvider _serviceProvider;

  public ParallelAnyTenantJob(IReadRepository<Tenant> tenantsRepository, IServiceProvider serviceProvider)
  {
    _tenantsRepository = tenantsRepository;
    _serviceProvider = serviceProvider;
  }

  public async Task Execute(IJobExecutionContext context)
  {
    var tenantGuids = await _tenantsRepository
      .AsQueryable(new EntityNonDeletedSpec<Tenant>(), new TenantNonLockedSpec())
      .Select(tenant => tenant.GUID)
      .ToArrayAsync(context.CancellationToken);

    var tasks = tenantGuids
      .Select(async tenantGuid =>
      {
        await using var tenantScope = _serviceProvider.CreateAsyncScope();

        var userDataProvider = tenantScope.ServiceProvider.GetRequiredService<IUserDataProvider>();
        userDataProvider.SetTenantId(tenantGuid);

        await ExecuteTenant(context, tenantScope.ServiceProvider, tenantGuid);
      });

    await Task.WhenAll(tasks);
  }

  public abstract Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId);
}
