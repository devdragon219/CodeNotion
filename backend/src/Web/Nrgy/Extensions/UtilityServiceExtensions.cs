using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Common.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Nrgy.Extensions;

[ExtendObjectType(typeof(UtilityService))]
public class UtilityServiceExtensions
{
  public async Task<IReadOnlyList<Estate>> GetEstates(
    [Parent] UtilityService utilityService,
    [Service] EstateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => utilityService.EstateIds is not null && utilityService.EstateIds.Any() ? await dataLoader.LoadAsync(utilityService.EstateIds, cancellationToken) : Array.Empty<Estate>().ToList();
  
  public async Task<IReadOnlyList<EstateUnit>> GetEstateUnits(
    [Parent] UtilityService utilityService,
    [Service] EstateUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => utilityService.EstateUnitIds is not null && utilityService.EstateUnitIds.Any() ? await dataLoader.LoadAsync(utilityService.EstateUnitIds, cancellationToken) : Array.Empty<EstateUnit>().ToList();

  public async Task<ISubject> GetProviderSubject(
    [Parent] UtilityService utilityService,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(utilityService.ProviderSubjectId, cancellationToken);

  public async Task<ISubject> GetReferenceSubject(
    [Parent] UtilityService utilityService,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(utilityService.ReferenceSubjectId, cancellationToken);

  public Task<OrgUnit> GetOrgUnit(
    [Parent] UtilityService utilityService,
    [Service] OrgUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(utilityService.OrgUnitId, cancellationToken);

  public Task<AccountingItem> GetAccountingItem(
    [Parent] UtilityService utilityService,
    [Service] AccountingItemDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(utilityService.AccountingItemId, cancellationToken);
}
