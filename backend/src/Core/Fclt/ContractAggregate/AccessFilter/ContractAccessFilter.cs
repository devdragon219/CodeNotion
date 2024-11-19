using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.ContractAggregate.AccessFilter;

public class ContractAccessFilter : AccessFilterBase<Contract>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  
  private readonly IReadRepository<Contract> _repository;
  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IAccessFilter<EstateUnit> _estateUnitAccess;

  public override CancellationTokenSource InvalidationSource => _invalidationSource;

  public ContractAccessFilter(
    IReadRepository<Contract> repository,
    IAccessFilter<Subject> subjectAccess,
    IAccessFilter<EstateUnit> estateUnitAccess,
    IMemoryCache cache)
    : base(cache)
  {
    _repository = repository;
    _subjectAccess = subjectAccess;
    _estateUnitAccess = estateUnitAccess;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken)
  {
    var reacheableSubjectIds = await _subjectAccess.ReachableEntitiesAsync(user, cancellationToken);
    var reacheableEstateUnitIds = await _estateUnitAccess.ReachableEntitiesAsync(user, cancellationToken);

    //Include soft deleted entities, for now
    return await _repository
      .AsQueryable()
      .Where(contract =>
        reacheableSubjectIds.Contains(contract.ProviderSubjectId) ||
        contract.EstateUnitIds.Any(estateUnitId => reacheableEstateUnitIds.Contains(estateUnitId)))
      .Select(contract => contract.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
