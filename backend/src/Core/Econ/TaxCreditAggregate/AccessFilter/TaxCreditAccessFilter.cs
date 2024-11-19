using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Econ.TaxCreditAggregate.AccessFilter;

public class TaxCreditAccessFilter : AccessFilterBase<TaxCredit>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IReadRepository<TaxCredit> _repository;

  public TaxCreditAccessFilter(IAccessFilter<Subject> subjectAccess,
    IReadRepository<TaxCredit> repository,
    IMemoryCache cache) : base (cache)
  {
    _subjectAccess = subjectAccess;
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(
    IUserDataProvider user,
    CancellationToken cancellationToken = default)
  {
    var allSubjectIds = await _subjectAccess
      .ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(s => allSubjectIds.Contains(s.ManagementSubjectId))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
