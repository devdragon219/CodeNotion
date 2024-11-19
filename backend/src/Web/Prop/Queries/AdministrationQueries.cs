using HotChocolate.Resolvers;
using RealGimm.Core.IAM;
using RealGimm.Web.Prop.Queries.Filters;
using RealGimm.Web.Prop.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.AdministrationAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate.Specifications;

namespace RealGimm.Web.Prop.Queries;

public class AdministrationQueries : QueriesBase
{
  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  public async Task<Administration?> Get(int id, [Service] IReadRepository<Administration> repository, CancellationToken cancellationToken)
    => await repository.AsQueryable(new AdministrationIncludeAllSpec(), new GetByIdSpec<Administration>(id)).SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(AdministrationFilterType))]
  [UseSorting(typeof(AdministrationSortInputType))]
  public Task<IQueryable<Administration>> ListAdministrations(
    [Service] RepositoryWebWrapper<Administration> repository,
    [SchemaService] IResolverContext? resolverContext)
    => repository.ListAllAsync(resolverContext, new AdministrationIncludeAllSpec());

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Read)]
  [UseFiltering(typeof(AdministrationFilterType))]
  [UseSorting(typeof(AdministrationSortInputType))]
  public IQueryable<Administration> ListAdministrationsFull([Service] IReadRepository<Administration> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(AdministrationTermFilterType))]
  [UseSorting(typeof(AdministrationTermSortInputType))]
  public IQueryable<AdministrationTerm> ListAdministrationTerms(
    int administrationId,
    [Service] IReadRepository<AdministrationTerm> repository)
    => repository 
        .AsQueryable(new AdministrationTermIncludeAllSpec())
        .Where(administrationTerm => administrationTerm.Administration.Id == administrationId);

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Read)]
  [UseFiltering(typeof(AdministrationFilterType))]
  [UseSorting(typeof(AdministrationSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<Administration> repository,
    [Service] IExportService<Administration> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var administrations = (await repository.ListAllAsync(resolverContext, new AdministrationIncludeAllSpec())).ToArray();
    return await ExportToExcelAsync(administrations, distributedCache, exportService, cancellationToken);
  }
}
