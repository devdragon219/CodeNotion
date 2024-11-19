using HotChocolate.Resolvers;
using RealGimm.Core.IAM;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Fclt.ServiceAggregate.Specifications;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Fclt.Queries;

public class ServiceQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Read)]
  public async Task<Service?> Get(
    int id,
    [Service] IReadRepository<Service> repository,
    CancellationToken cancellationToken = default)
    => await repository
      .AsQueryable(new GetByIdSpec<Service>(id), new ServiceIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(ServiceFilterType))]
  [UseSorting(typeof(ServiceSortInputType))]
  public IQueryable<Service> ListServices([Service] IReadRepository<Service> repository)
    => repository.AsQueryable(new ServiceIncludeAllSpec());

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering]
  [UseSorting]
  public IQueryable<ServiceActivity> ListServiceActivity(
    int? serviceId,
    [Service] IReadRepository<Service> repository)
  {
    var serviceSpecifications = serviceId.HasValue
      ? new[] { new GetByIdSpec<Service>(serviceId.Value) }
      : [];

    return repository
      .AsQueryable(serviceSpecifications)
      .SelectMany(service => service.Activities);
  }

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<Service> codeSuggestor)
    => await codeSuggestor.SuggestNextCode(null, (Service?)null);

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Read)]
  public async Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentServiceId,
    [Service] IReadRepository<Service> repository,
    CancellationToken cancellationToken = default)
  {
    var isCodeInUse = currentServiceId.HasValue
      ? await repository
        .AsQueryable(
          new GetByInternalCodeSpec<Service>(internalCode.Trim()),
          new ExcludeByIdSpec<Service>(currentServiceId.Value))
        .AnyAsync(cancellationToken)
      : await repository.AnyAsync(new GetByInternalCodeSpec<Service>(internalCode.Trim()), cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.FCLT_SERVICE, Permission.Read)]
  [UseFiltering(typeof(ServiceFilterType))]
  [UseSorting(typeof(ServiceSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<Service> repository,
    [Service] IExportService<Service> exportService,
    CancellationToken cancellationToken = default)
  {
    var services = await repository
      .AsQueryable(new ServiceIncludeAllSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(services, distributedCache, exportService, cancellationToken);
  }
}
