using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.UtilityServiceAggregate.AccessFilter;

public class UtilityServiceAccessFilter : AccessFilterBase<UtilityService>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Estate> _estateAccess;
  private readonly IReadRepository<UtilityService> _repository;

  public UtilityServiceAccessFilter(IAccessFilter<Estate> estateAccess,
    IReadRepository<UtilityService> repository,
    IMemoryCache cache) : base(cache)
  {
    _estateAccess = estateAccess;
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var reachableEstates = await _estateAccess
      .ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(utilityService => utilityService.EstateIds
        .Any(estateId => reachableEstates.Contains(estateId)))
      .Select(utilityService => utilityService.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
