using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Common;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 0 * * ?")]
[Description("Mark contracts as expired after second term expiration date")]
public sealed class ContractUpdateJob : AnyTenantJob
{
  private readonly ILogger<ContractUpdateJob> _logger;

  public ContractUpdateJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<ContractUpdateJob> logger)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var contractRepository = scopedProvider.GetRequiredService<IRepository<Contract>>();
    var currentDate = DateOnly.FromDateTime(DateTime.UtcNow);

    _logger.LogInformation("Updating contracts for tenant {tenantId}", tenantId);

    var contractsToUpdate = contractRepository
      .AsQueryable()
      .Where(contract => contract.Status == EntryStatus.Working)
      .Where(contract => currentDate > contract.SecondTermExpirationDate);

    await contractsToUpdate.ExecuteUpdateAsync(setters => setters
      .SetProperty(contract => contract.Status, EntryStatus.FrozenClosed)
      .SetProperty(contract => contract.TerminationDate, contract => contract.SecondTermExpirationDate));

    _logger.LogInformation("Contracts for tenant {tenantId} are updated", tenantId);
  }
}
