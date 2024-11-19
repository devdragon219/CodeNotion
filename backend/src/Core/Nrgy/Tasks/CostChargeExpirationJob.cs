using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Common.NotificationAggregate.Events;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using Rebus.Bus;
using Rebus.Transport;

namespace RealGimm.Core.Nrgy.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 0 * * ?")]
[Description("Mark overdue cost charges")]
public sealed class CostChargeExpirationJob : AnyUserJob
{
  private readonly ILogger<CostChargeExpirationJob> _logger;
  private readonly IStringLocalizer<CostChargeExpirationJob> _localizer;

  public CostChargeExpirationJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<CostChargeExpirationJob> logger,
    IStringLocalizer<CostChargeExpirationJob> localizer)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
    _localizer = localizer;
  }

  public override async Task ExecuteUser(
    IJobExecutionContext context,
    IServiceProvider scopedProvider,
    Guid tenantId,
    string username)
  {
    var bus = scopedProvider.GetRequiredService<IBus>();
    using var rebusScope = new RebusTransactionScope();

    var costChargesRepository = scopedProvider.GetRequiredService<IRepository<CostCharge>>();

    var today = DateTime.UtcNow.ToDateOnly();
    var maxExpirationDate = today.AddDays(Constants.COST_CHARGES_EXPIRATION_DAYS_ARRAY.Max());

    var costCharges = await costChargesRepository
      .AsQueryable()
      .Where(costCharges => costCharges.DueDate >= today)
      .Where(costCharges => costCharges.DueDate <= maxExpirationDate)
      .Select(contract => new
      {
        contract.Id,
        contract.DueDate
      })
      .ToListAsync(context.CancellationToken);

    var costChargesPerDaysToExpiration = Constants.COST_CHARGES_EXPIRATION_DAYS_ARRAY
      .Select(daysToExpiration => (
        DaysToExpiration: daysToExpiration,
        CostCharges: costCharges
          .Where(costCharge => costCharge.DueDate <= today.AddDays(daysToExpiration))
          .ToList()))
      .Where(costCharges => costCharges.CostCharges.Count > 0);

    foreach (var (daysToExpiration, costChargesForNotification) in costChargesPerDaysToExpiration)
    {
      var notification = new CostChargesExpirationNotificationEvent
      {
        UserName = username,
        Timestamp = DateTime.UtcNow,
        TenantId = tenantId,
        CostChargeIds = costChargesForNotification.Select(costCharge => costCharge.Id).ToArray(),
        DaysToExpiration = daysToExpiration
      };

      await bus.Publish(notification);
    }

    await rebusScope.CompleteAsync();
  }
}
