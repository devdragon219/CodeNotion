using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.AdministrationTermAggregate.AccessFilter;

public class AdministrationTermAccessFilter : AccessFilterBase<AdministrationTerm>
{
  private readonly IAccessFilter<Administration> _administrationAccessFilter;
  private readonly IReadRepository<AdministrationTerm> _repository;

  public override CancellationTokenSource InvalidationSource { get; } = new();

  public AdministrationTermAccessFilter(
    IAccessFilter<Administration> administrationAccessFilter,
    IReadRepository<AdministrationTerm> repository,
    IMemoryCache cache)
    : base(cache)
  {
    _administrationAccessFilter = administrationAccessFilter;
    _repository = repository;
  }

  protected override async Task<int[]> ActualEntities(IUserDataProvider user, CancellationToken cancellationToken = default)
  {
    var allAdminsIds = await _administrationAccessFilter.ReachableEntitiesAsync(user, cancellationToken);

    return await _repository
      .AsQueryable()
      .Where(at => allAdminsIds.Contains(at.Administration.Id))
      .Select(administrationTerm => administrationTerm.Id)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToArrayAsync(cancellationToken);
  }
}
