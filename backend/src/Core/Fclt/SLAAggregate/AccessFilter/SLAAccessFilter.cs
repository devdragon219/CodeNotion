using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.SLAAggregate.AccessFilter;

public class SLAAccessFilter : AccessFilterBase<SLA>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  
  private readonly IReadRepository<SLA> _repository;
  private readonly IAccessFilter<Contract> _accessFilter;
  
  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public SLAAccessFilter(
    IReadRepository<SLA> repository,
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
      //Allow all generic SLAs and those for reachable contracts
      .Where(sla => sla.Contract == null || contractIds.Contains(sla.Contract.Id))
      .Select(sla => sla.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
