using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.AdministrationAggregate.AccessFilter;

public class AdministrationAccessFilter : AccessFilterBase<Administration>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Estate> _estateAccess;
  private readonly IReadRepository<Administration> _repository;

  public AdministrationAccessFilter(IAccessFilter<Estate> estateAccess,
    IReadRepository<Administration> repository,
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
      .Where(adm => reachableEstates.Contains(adm.EstateId))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToArrayAsync(cancellationToken);
  }
}