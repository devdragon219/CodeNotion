using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.Common.Services;

public class AccountingItemDeleteRestrictionChecker : IDeleteRestrictionChecker<AccountingItem>
{
  private readonly IRepository<Contract> _contractRepository;
  private readonly IRepository<UtilityService> _utilityServiceRepository;

  public AccountingItemDeleteRestrictionChecker(
    IRepository<Contract> contractRepository,
    IRepository<UtilityService> utilityServiceRepository)
  {
    _contractRepository = contractRepository;
    _utilityServiceRepository = utilityServiceRepository;
  }

  public async Task<bool> HasRestrictionsAsync(int entityId, CancellationToken cancellationToken = default)
    => await IsUsedInAnyContract(entityId, cancellationToken) || await IsUsedInAnyUtilityService(entityId, cancellationToken);

  private Task<bool> IsUsedInAnyContract(int accountingItemId, CancellationToken cancellationToken)
    => _contractRepository
        .AsQueryable()
        .Where(contract =>
          contract.OneshotAdditions.Any(addition => addition.AccountingItemId == accountingItemId) ||
          contract.RecurringAdditions.Any(addition => addition.AccountingItemId == accountingItemId))
        .AnyAsync(cancellationToken);
  
  private Task<bool> IsUsedInAnyUtilityService(int accountingItemId, CancellationToken cancellationToken)
    => _utilityServiceRepository
        .AsQueryable()
        .AnyAsync(utilityService => utilityService.AccountingItemId == accountingItemId, cancellationToken);
}
