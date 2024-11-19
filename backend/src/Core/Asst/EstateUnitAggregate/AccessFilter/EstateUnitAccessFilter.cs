using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.EstateUnitAggregate.AccessFilter;

public class EstateUnitAccessFilter : AccessFilterBase<EstateUnit>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IAccessFilter<OrgUnit> _orgUnitAccess;
  private readonly IReadRepository<EstateUnit> _repository;

  public EstateUnitAccessFilter(IAccessFilter<Subject> subjectAccess,
    IAccessFilter<OrgUnit> orgUnitAccess,
    IReadRepository<EstateUnit> repository,
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
    //Include soft deleted entities
    var mgmtSubjectIds = await _subjectAccess
      .ReachableEntitiesAsync(user, cancellationToken);

    var ouIds = await _orgUnitAccess
      .ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(eu => mgmtSubjectIds.Contains(eu.Estate.ManagementSubjectId)
        || ouIds.Contains(eu.Estate.ManagementOrgUnitId!.Value))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
