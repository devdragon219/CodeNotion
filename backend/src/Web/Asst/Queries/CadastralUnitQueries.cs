using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Asst.Queries.Filters;
using RealGimm.Web.Asst.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Asst.Queries;

public class CadastralUnitQueries : QueriesBase
{
  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Read)]
  public async Task<CadastralUnit?> GetCadastralUnit(
    int id,
    [Service] IReadRepository<CadastralUnit> repository,
    CancellationToken cancellationToken = default)
    => await repository
      .AsQueryable(new GetByIdSpec<CadastralUnit>(id), new CadastralUnitIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(CadastralUnitFilterType))]
  [UseSorting(typeof(CadastralUnitSortInputType))]
  public async Task<IQueryable<CadastralUnit>> ListCadastralUnits(
    [Service] RepositoryWebWrapper<CadastralUnit> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<CadastralUnit>(), new CadastralUnitIncludeAllSpec());

  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode(int parentId, [Service] ICodeSuggestor<CadastralUnit> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(parentId, partialEntity: null);

  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Read)]
  public string ProposeNewInternalCodeByParentCode(string parentCode, [Service] ICodeSuggestor<CadastralUnit> codeSuggestor)
    => codeSuggestor.SuggestNextCode(parentCode);

  [BackOfficePermission(Features.ASST_CADASTRALUNIT_BASE, Permission.Read)]
  [UseFiltering(typeof(CadastralUnitFilterType))]
  [UseSorting(typeof(CadastralUnitSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<CadastralUnit> repository,
    [Service] IDistributedCache distributedCache,
    [Service] IExportService<CadastralUnit> exportService,
    CancellationToken cancellationToken = default)
  {
    var cadastralUnits = await (await repository
      .ListAllAsync(resolverContext, new EntityNonDeletedSpec<CadastralUnit>(), new CadastralUnitIncludeAllSpec()))
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(cadastralUnits, distributedCache, exportService, cancellationToken);
  }
}
