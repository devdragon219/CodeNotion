using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Nrgy.UtilityServiceAggregate.AccessFilter;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.ReadingAggregate.AccessFilter;

public class ReadingAccessFilter : AccessFilterBase<Reading>
{
  private static readonly CancellationTokenSource _invalidationSource = new();

  private readonly UtilityServiceAccessFilter _utilityServiceAccessFilter;
  private readonly IReadRepository<Reading> _readingRepository;
  
  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public ReadingAccessFilter(
    UtilityServiceAccessFilter utilityServiceAccessFilter,
    IReadRepository<Reading> readingRepository,
    IMemoryCache cache) : base(cache)
  {
    _utilityServiceAccessFilter = utilityServiceAccessFilter;
    _readingRepository = readingRepository;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var reachableUtilityServices = await _utilityServiceAccessFilter.ReachableEntitiesAsync(user, cancellationToken);

    return await _readingRepository
      .AsQueryable()
      .Where(reading => reachableUtilityServices.Contains(reading.UtilityService.Id))
      .Select(reading => reading.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
