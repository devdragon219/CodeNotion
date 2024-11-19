using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Quartz;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public abstract class AnyUserJob : AnyTenantJob
{
  public AnyUserJob(IReadRepository<Tenant> tenantsRepository, IServiceProvider serviceProvider)
    : base(tenantsRepository, serviceProvider)
  {
  }

  public sealed override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var usernames = await scopedProvider.GetRequiredService<IReadRepository<User>>()
      .AsQueryable(new EntityNonDeletedSpec<User>())
      .Select(user => user.UserName)
      .ToArrayAsync();

    foreach (var username in usernames)
    {
      await using var userScope = scopedProvider.CreateAsyncScope();

      var userDataProvider = userScope.ServiceProvider.GetRequiredService<IUserDataProvider>();
      userDataProvider.SetTenantId(tenantId);
      userDataProvider.SetUsername(username);

      await ExecuteUser(context, userScope.ServiceProvider, tenantId, username);
    }
  }

  public abstract Task ExecuteUser(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId, string username);
}
