using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Quartz;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Core.Common.NotificationAggregate.Events;
using RealGimm.Core.IAM.Services;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using Rebus.Bus;
using Rebus.Transport;

namespace RealGimm.Core.IAM.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 0 * * ?")]
[Description("Expire passwords according to policies set by tenants")]
public sealed class PasswordExpirationJob : AnyTenantJob
{
  private readonly IStringLocalizer<PasswordExpirationJob> _localizer;

  public PasswordExpirationJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    IStringLocalizer<PasswordExpirationJob> localizer)
    : base(tenantsRepository, serviceProvider)
  {
    _localizer = localizer;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var bus = scopedProvider.GetRequiredService<IBus>();
    using var rebusScope = new RebusTransactionScope();

    var userRepository = scopedProvider.GetRequiredService<IRepository<User>>();
    var configRepository = scopedProvider.GetRequiredService<IReadRepository<Config>>();

    var passExpirationDays = (await configRepository
      .AsQueryable(
        new ConfigByFunctionNameSpec(
          ConfigFunction.PasswordLogin,
          UserLoginService.PARAM_EXPIRATION_DAYS)
      ).FirstOrDefaultAsync())
      ?.Value.ToNullableInt32()
      ?? Constants.DEFAULT_PASSWORD_EXPIRATION_DAYS;

    if(passExpirationDays == 0)
    {
      //This tenant does not have a password expiration policy enabled
      return;
    }
    
    var users = await userRepository
      .AsQueryable()
      .Where(user => user.PasswordHash != null)
      .ToListAsync();

    foreach (var user in users)
    {
      var lastPasswordUpdatedDate = user.LastPasswordUpdated ?? user.CreationDate;
      var passwordExpirationDate = lastPasswordUpdatedDate.AddDays(passExpirationDays);
      if (DateTime.UtcNow >= passwordExpirationDate)
      {
        user.RemovePassword();
        continue;
      }

      var passwordExpirationReminderDate = passwordExpirationDate.AddDays(-Constants.REMINDER_DAYS_BEFORE_PASSWORD_EXPIRATION);
      if (DateTime.UtcNow >= passwordExpirationReminderDate)
      {
        var daysToExpiration = (int)Math.Ceiling((passwordExpirationDate - DateTime.UtcNow).TotalDays);

        var notification = new PasswordExpirationNotificationEvent
        {
          UserName = user.UserName,
          Timestamp = DateTime.UtcNow,
          TenantId = tenantId,          
          PasswordExpirationDate = passwordExpirationDate
        };

        await bus.Publish(notification);

        continue;
      }
    }

    await rebusScope.CompleteAsync();
    await userRepository.SaveChangesAsync();
  }
}
