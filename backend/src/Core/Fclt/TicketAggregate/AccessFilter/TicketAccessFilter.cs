using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.TicketAggregate.AccessFilter;

public class TicketAccessFilter : AccessFilterBase<Ticket>
{
  private static readonly CancellationTokenSource _invalidationSource = new();

  private readonly IReadRepository<Ticket> _ticketRepository;
  private readonly IReadRepository<User> _userRepository;
  private readonly IAccessFilter<EstateUnit> _estateUnitAccess;

  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public TicketAccessFilter(
    IReadRepository<Ticket> ticketRepository,
    IReadRepository<User> userRepository,
    IAccessFilter<EstateUnit> estateUnitAccess,
    IMemoryCache cache)
    : base(cache)
  {
    _ticketRepository = ticketRepository;
    _userRepository = userRepository;
    _estateUnitAccess = estateUnitAccess;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var reachableEstateUnits = await _estateUnitAccess.ReachableEntitiesAsync(user, cancellationToken);

    var userData = await _userRepository
      .AsQueryable(new UserByUsernameSpec(user.Username))
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .FirstOrDefaultAsync(cancellationToken);

    //Include soft deleted entities, for now
    return await _ticketRepository
      .AsQueryable()
      .Where(ticket =>
        reachableEstateUnits.Contains(ticket.LocationEstateUnitId) ||
        ticket.SupplierSubjectId == userData!.SupplierSubjectId)
      .Select(ticket => ticket.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
