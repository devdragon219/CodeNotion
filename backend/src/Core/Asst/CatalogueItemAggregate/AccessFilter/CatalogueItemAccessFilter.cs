using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Asst.CatalogueItemAggregate.AccessFilter;

public class CatalogueItemAccessFilter : AccessFilterBase<CatalogueItem>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  
  private readonly IAccessFilter<Estate> _estateAccess;
  private readonly IReadRepository<CatalogueItem> _repository;
  
  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public CatalogueItemAccessFilter(
    IAccessFilter<Estate> estateAccess,
    IReadRepository<CatalogueItem> repository,
    IMemoryCache cache) : base (cache)
  {
    _estateAccess = estateAccess;
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var reachableEstateIds = await _estateAccess.ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(catalogueItem => reachableEstateIds.Contains(catalogueItem.Estate.Id))
      .Select(catalogueItem => catalogueItem.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
