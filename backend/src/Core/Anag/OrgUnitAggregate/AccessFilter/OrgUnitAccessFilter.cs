using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag.OrgUnitAggregate.AccessFilter;

public class OrgUnitAccessFilter : AccessFilterBase<OrgUnit>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IReadRepository<User> _users;
  private readonly IReadRepository<OrgUnit> _repository;

  public OrgUnitAccessFilter(
    IAccessFilter<Subject> subjectAccess,
    IReadRepository<OrgUnit> repository,
    IReadRepository<User> users,
    IMemoryCache cache) : base(cache)
  {
    _subjectAccess = subjectAccess;
    _repository = repository;
    _users = users;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var userData = await _users
      .AsQueryable(new UserByUsernameSpec(user.Username))
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .FirstOrDefaultAsync(cancellationToken);

    var orgUnits = userData?.OrgUnits ?? Array.Empty<int>();

    //Include soft deleted entities
    var totalSubjectsIds = await _subjectAccess
      .ReachableEntitiesAsync(user, cancellationToken);

    var reachableOrgUnits = await _repository
      .AsQueryable()
      .Where(ou => totalSubjectsIds.Contains(ou.ParentSubjectId))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);

    return orgUnits.Any()
      ? reachableOrgUnits.Intersect(orgUnits).ToArray()
      : reachableOrgUnits;
  }
}
