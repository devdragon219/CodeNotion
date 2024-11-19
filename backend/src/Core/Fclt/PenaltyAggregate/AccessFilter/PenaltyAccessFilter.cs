using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.PenaltyAggregate.AccessFilter;

public class PenaltyAccessFilter : AccessFilterBase<Penalty>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  
  private readonly IReadRepository<Penalty> _repository;
  private readonly IAccessFilter<Contract> _accessFilter;
  
  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public PenaltyAccessFilter(
    IReadRepository<Penalty> repository,
    IAccessFilter<Contract> accessFilter,
    IMemoryCache cache)
    : base(cache)
  {
    _repository = repository;
    _accessFilter = accessFilter;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var contractIds = await _accessFilter.ReachableEntitiesAsync(user, cancellationToken);
      
    return await _repository
      .AsQueryable()
      //Allow all generic Penalties and those for reachable contracts
      .Where(penalty => penalty.Contract == null || contractIds.Contains(penalty.Contract.Id))
      .Select(penalty => penalty.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
