using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Quartz;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public abstract class AnyTenantJob : IJob
{
  private readonly IReadRepository<Tenant> _tenantsRepository;
  private readonly IServiceProvider _serviceProvider;

  public AnyTenantJob(IReadRepository<Tenant> tenantsRepository, IServiceProvider serviceProvider)
  {
    _tenantsRepository = tenantsRepository;
    _serviceProvider = serviceProvider;
  }

  public async Task Execute(IJobExecutionContext context)
  {
    var guidList = await _tenantsRepository
      .AsQueryable(new EntityNonDeletedSpec<Tenant>(), new TenantNonLockedSpec())
      .Select(t => t.GUID)
      .ToArrayAsync();

    foreach (var tenant in guidList)
    {
      await using var tenantScope = _serviceProvider.CreateAsyncScope();

      var userDataProvider = tenantScope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      userDataProvider.SetTenantId(tenant);

      await ExecuteTenant(context, tenantScope.ServiceProvider, tenant);
    }
  }

  public abstract Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId);
}
