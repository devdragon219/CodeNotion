using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.BillAggregate.AccessFilter;

public class BillAccessFilter : AccessFilterBase<Bill>
{
  private static readonly CancellationTokenSource _invalidationSource = new();
  public override CancellationTokenSource InvalidationSource => _invalidationSource;
  private readonly IAccessFilter<Subject> _subjectAccess;
  private readonly IReadRepository<Bill> _repository;

  public BillAccessFilter(IAccessFilter<Subject> subjectAccess,
    IReadRepository<Bill> repository,
    IMemoryCache cache) : base(cache)
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
      .Where(e => (e.Contract != null && allSubjectIds.Contains(e.Contract.ManagementSubjectId))
        //This should be updated
        || e.BillRows.Any(br => br.TermInstallmentSource != null
          && allSubjectIds.Contains(br.TermInstallmentSource!.AdministrationTerm.Administration.AdministratorSubjectId)))
      .Select(s => s.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .TagWith(Constants.SKIP_DEFAULT_ORDERING)
      .ToArrayAsync(cancellationToken);
  }
}
