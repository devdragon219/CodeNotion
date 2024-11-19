using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.EstateSubUnitAggregate.AccessFilter;

public class EstateSubUnitAccessFilter : AccessFilterBase<EstateSubUnit>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IAccessFilter<OrgUnit> _orgUnitAccess;
  private readonly IReadRepository<EstateSubUnit> _repository;

  public EstateSubUnitAccessFilter(IAccessFilter<Subject> subjectAccess,
    IAccessFilter<OrgUnit> orgUnitAccess,
    IReadRepository<EstateSubUnit> repository,
    IMemoryCache cache) : base(cache)
  {
    _subjectAccess = subjectAccess;
    _orgUnitAccess = orgUnitAccess;
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var allSubjectIds = await _subjectAccess
      .ReachableEntitiesAsync(user, cancellationToken);

    var ouIds = await _orgUnitAccess
      .ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(esu => allSubjectIds.Contains(esu.EstateUnit.Estate.ManagementSubjectId)
        || ouIds.Contains(esu.EstateUnit.Estate.ManagementOrgUnitId!.Value)
        || ouIds.Contains(esu.OccupantId!.Value))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToArrayAsync(cancellationToken);
  }
}