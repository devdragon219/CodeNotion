using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.AccessFilter;

public class CadastralUnitAccessFilter : AccessFilterBase<CadastralUnit>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IAccessFilter<OrgUnit> _orgUnitAccess;
  private readonly IReadRepository<CadastralUnit> _repository;

  public CadastralUnitAccessFilter(
    IAccessFilter<Subject> subjectAccess,
    IAccessFilter<OrgUnit> orgUnitAccess,
    IReadRepository<CadastralUnit> repository,
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
    var allSubjectIds = await _subjectAccess.ReachableEntitiesAsync(user, cancellationToken);

    var ouIds = await _orgUnitAccess.ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(cu => allSubjectIds.Contains(cu.EstateUnit!.Estate.ManagementSubjectId)
        || ouIds.Contains(cu.EstateUnit!.Estate.ManagementOrgUnitId!.Value))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
