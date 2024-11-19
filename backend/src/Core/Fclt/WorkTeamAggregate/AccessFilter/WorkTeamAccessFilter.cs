using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.WorkTeamAggregate.AccessFilter;

public class WorkTeamAccessFilter : AccessFilterBase<WorkTeam>
{
  private static readonly CancellationTokenSource _invalidationSource = new();

  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IReadRepository<WorkTeam> _repository;

  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public WorkTeamAccessFilter(
    IAccessFilter<Subject> subjectAccess,
    IReadRepository<WorkTeam> repository,
    IMemoryCache cache) : base(cache)
  {
    _subjectAccess = subjectAccess;
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var reachableSubjects = await _subjectAccess.ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(workTeam =>
        reachableSubjects.Contains(workTeam.LeaderUserId) ||
        reachableSubjects.Contains(workTeam.ProviderSubjectId))
      .Select(workTeam => workTeam.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
