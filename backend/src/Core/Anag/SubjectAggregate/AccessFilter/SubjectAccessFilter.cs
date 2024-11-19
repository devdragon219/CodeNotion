using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag.SubjectAggregate.AccessFilter;

public class SubjectAccessFilter : AccessFilterBase<Subject>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IReadRepository<Subject> _repository;
  private readonly IReadRepository<User> _users;

  public SubjectAccessFilter(IReadRepository<Subject> repository,
    IReadRepository<User> users,
    IMemoryCache cache) : base(cache)
  {
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

    var mgmtSubjects = userData?.Subjects ?? [];

    if (userData?.SupplierSubjectId is not null)
    {
      mgmtSubjects = mgmtSubjects.Append(userData.SupplierSubjectId.Value).ToArray();
    }

    //Include soft deleted entities, for now
    return await _repository
      .AsQueryable()
      .Include(s => s.RelationSubordinates)
      .Where(s => mgmtSubjects.Contains(s.Id)
        || s.RelationSubordinates.Any(sr => mgmtSubjects.Contains(sr.MainId)
          && sr.RelationType == SubjectRelationType.ManagementEntityOwned))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
