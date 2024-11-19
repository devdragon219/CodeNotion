using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Common.NotificationAggregate.Events;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using Rebus.Bus;
using Rebus.Transport;

namespace RealGimm.Core.Prop.ContractAggregate.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 0 * * ?")]
[Description("Notify Users of approaching contracts expiration")]
public sealed class ContractExpirationJob : AnyUserJob
{
  private readonly ILogger<ContractExpirationJob> _logger;
  private readonly IStringLocalizer<ContractExpirationJob> _localizer;

  public ContractExpirationJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<ContractExpirationJob> logger,
    IStringLocalizer<ContractExpirationJob> localizer)
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

    var contractRepository = scopedProvider.GetRequiredService<IRepository<Contract>>();

    var today = DateTime.UtcNow.ToDateOnly();
    var maxExpirationDate = today.AddDays(Constants.CONTRACTS_EXPIRATION_DAYS_ARRAY.Max());

    var contracts = await contractRepository
      .AsQueryable(new WorkingContractSpec(), new NonTerminatedContractSpec())
      .Where(contract => contract.SecondTermExpirationDate >= today)
      .Where(contract => contract.SecondTermExpirationDate <= maxExpirationDate)
      .Select(contract => new
      {
        contract.Id,
        contract.Type.IsActive,
        contract.SecondTermExpirationDate
      })
      .ToListAsync(context.CancellationToken);

    foreach (var contractsPerType in contracts.GroupBy(contract => contract.IsActive))
    {
      var contractsPerDaysToExpiration = Constants.CONTRACTS_EXPIRATION_DAYS_ARRAY
        .Select(daysToExpiration => (
          DaysToExpiration: daysToExpiration,
          Contracts: contractsPerType
            .Where(contract => contract.SecondTermExpirationDate <= today.AddDays(daysToExpiration))
            .ToList()))
        .Where(contracts => contracts.Contracts.Count > 0);

      foreach (var (daysToExpiration, contractsForNotification) in contractsPerDaysToExpiration)
      {
        var notification = new ContractsExpirationNotificationEvent
        {
          UserName = username,
          Timestamp = DateTime.UtcNow,
          TenantId = tenantId,
          ContractIds = contractsForNotification.Select(contract => contract.Id).ToArray(),
          IsActiveContracts = contractsPerType.Key,
          DaysToExpiration = daysToExpiration
        };

        await bus.Publish(notification);
      }
    }
    
    await rebusScope.CompleteAsync();
  }
}
