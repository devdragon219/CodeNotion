using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.CostChargeAggregate.AccessFilter;

public class CostChargeAccessFilter : AccessFilterBase<CostCharge>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  private readonly IAccessFilter<UtilityService> _utilityServiceAccessFilter;
  private readonly IReadRepository<CostCharge> _repository;

  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public CostChargeAccessFilter(
    IAccessFilter<UtilityService> utilityServiceAccessFilter,
    IReadRepository<CostCharge> repository,
    IMemoryCache cache)
    : base(cache)
  {
    _utilityServiceAccessFilter = utilityServiceAccessFilter;
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(IUserDataProvider user, CancellationToken cancellationToken = default)
  {
    var reachableUtilityServices = await _utilityServiceAccessFilter.ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(costCharge => reachableUtilityServices.Contains(costCharge.Service.Id))
      .Select(costCharge => costCharge.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
