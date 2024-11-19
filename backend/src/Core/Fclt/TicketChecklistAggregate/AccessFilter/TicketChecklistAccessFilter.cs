using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketChecklistAggregate.AccessFilter;

public class TicketChecklistAccessFilter : AccessFilterBase<TicketChecklist>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  
  private readonly IReadRepository<TicketChecklist> _repository;
  private readonly IAccessFilter<Contract> _contractAccess;

  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public TicketChecklistAccessFilter(
    IReadRepository<TicketChecklist> repository,
    IAccessFilter<Contract> contractAccess,
    IMemoryCache cache)
    : base(cache)
  {
    _repository = repository;
    _contractAccess = contractAccess;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken)
  {
    var reacheableContractIds = await _contractAccess.ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(ticketChecklist => reacheableContractIds.Contains(ticketChecklist.Contract.Id))
      .Select(ticketChecklist => ticketChecklist.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
