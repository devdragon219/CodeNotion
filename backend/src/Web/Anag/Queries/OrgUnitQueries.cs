using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.Interfaces;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Anag.Queries.Filters;
using RealGimm.Web.Anag.Queries.Sorting;

namespace RealGimm.Web.Anag.Queries;

public class OrgUnitQueries
{
  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Read)]
  public async Task<OrgUnit?> GetOrgUnit(
    int orgUnitId,
    [Service] IReadRepository<OrgUnit> repository,
    CancellationToken cancellationToken = default)
    => await repository
        .AsQueryable(new GetByIdSpec<OrgUnit>(orgUnitId), new EntityNonDeletedSpec<OrgUnit>(), new OrgUnitIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Read)]
  public Task<List<OrgUnitTreeNode>> ListOrgUnitsTree(
    [Service] IOrgUnitService orgUnitService,
    OrgUnitType orgUnitType,
    CancellationToken cancellationToken = default)
    => orgUnitService.ListOrgUnitTreeAsync(orgUnitType, cancellationToken);

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(OrgUnitFilterType))]
  [UseSorting(typeof(OrgUnitSortInputType))]
  public IQueryable<OrgUnit> ListOrgUnits([Service] IReadRepository<OrgUnit> repository)
    => repository.AsQueryable(new OrgUnitIncludeAllForListSpec(), new EntityNonDeletedSpec<OrgUnit>());

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Read)]
  [UseFiltering(typeof(OrgUnitFilterType))]
  [UseSorting(typeof(OrgUnitSortInputType))]
  public async Task<IQueryable<OrgUnit>> ListOrgUnitsByManagementSubject(
    int[] managementSubjectIds,
    int? excludeChildrenOfId,
    [Service] IOrgUnitService orgUnitService,
    CancellationToken cancellationToken = default)
  {
    return await orgUnitService.ListOrgUnitByManagementSubjects(
      managementSubjectIds,
      excludeChildrenOfId,
      cancellationToken);
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Read)]
  [UseFiltering(typeof(OrgUnitFilterType))]
  [UseSorting(typeof(OrgUnitSortInputType))]
  public IQueryable<OrgUnit> ListOrgUnitsFull([Service] IReadRepository<OrgUnit> repository)
    => repository.AsQueryable(new OrgUnitIncludeAllForListSpec(), new EntityNonDeletedSpec<OrgUnit>());


  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<OrgUnit> codeSuggest)
  {
    return await codeSuggest.SuggestNextCode(null, (OrgUnit?)null);
  }

  [BackOfficePermission(Features.ANAG_SUBJECT_ORGUNIT, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentOrgUnitId,
    [Service] IReadRepository<OrgUnit> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentOrgUnitId.HasValue
      ? await repository
          .AsQueryable(new OrgUnitByInternalCodeSpec(internalCode.Trim()), new ExcludeByIdSpec<OrgUnit>(currentOrgUnitId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new OrgUnitByInternalCodeSpec(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }
}
