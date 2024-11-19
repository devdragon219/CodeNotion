using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.OfficialActAggregate.AccessFilter;

public class OfficialActAccessFilter : AccessFilterBase<OfficialAct>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IReadRepository<OfficialAct> _repository;
  private readonly IAccessFilter<EstateUnit> _estateUnitAccessFilter;

  public OfficialActAccessFilter(IReadRepository<OfficialAct> repository,
    IAccessFilter<EstateUnit> estateUnitAccessFilter,
    IMemoryCache cache) : base(cache)
  {
    _repository = repository;
    _estateUnitAccessFilter = estateUnitAccessFilter;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken)
  {
    var euData = await _estateUnitAccessFilter
      .ReachableEntitiesAsync(user, cancellationToken);

    return euData is null
      ? await _repository
        .AsQueryable()
        .Where(s => !s.EstateUnitId.HasValue)
        .Select(s => s.Id)
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .TagWith(Constants.SKIP_DEFAULT_ORDERING)
        .ToArrayAsync(cancellationToken)
      : await _repository
        .AsQueryable()
        .Where(s => !s.EstateUnitId.HasValue
          || euData.Contains(s.EstateUnitId!.Value))
        .Select(s => s.Id)
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .TagWith(Constants.SKIP_DEFAULT_ORDERING)
        .ToArrayAsync(cancellationToken);
  }
}
