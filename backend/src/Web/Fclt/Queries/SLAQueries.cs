using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.Core.Fclt.SLAAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.WebCommons;
using RealGimm.SharedKernel.Interfaces;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Fclt.PenaltyAggregate.Specifications;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using RealGimm.Core.Fclt.ContractAggregate;

namespace RealGimm.Web.Fclt.Queries;

public class SLAQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Read)]
  public async Task<SLA?> Get(
    int id,
    [Service] IReadRepository<SLA> repository,
    CancellationToken cancellationToken = default)
  {
    var sla = await repository
      .AsQueryable(new GetByIdSpec<SLA>(id), new SLAIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (sla is null)
    {
      return null;
    }

    await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
    await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);

    return sla;
  }

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(SLAFilterType))]
  [UseSorting(typeof(SLASortInputType))]
  public IQueryable<SLA> ListSLAs([Service] IReadRepository<SLA> repository)
    => repository.AsQueryable(new SLAIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Read)]
  [UseFiltering(typeof(SLAFilterType))]
  [UseSorting(typeof(SLASortInputType))]
  public async Task<IEnumerable<SLA>> ListSLAsFull(
    [Service] IReadRepository<SLA> repository,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var slas = await repository
      .AsQueryable(new SLAIncludeForListFullSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    foreach (var sla in slas)
    {
      await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
      await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
    }

    return slas;
  }

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode(
    string[] additionallyOccupiedCodes,
    string? contractInternalCode,
    [Service] ICodeSuggestor<SLA> codeSuggestor)
  {
    SLA? sla = null;

    if (contractInternalCode is not null)
    {
      var contract = new Contract();
      contract.SetInternalCode(contractInternalCode);
      
      sla = new SLA();
      sla.SetContract(contract);
    }

    return codeSuggestor.SuggestNextCode(parentId: null, partialEntity: sla, additionallyOccupiedCodes);
  }

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentSLAId,
    [Service] IReadRepository<SLA> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<SLA>(
      internalCode,
      currentSLAId,
      repository,
      cancellationToken,
      new SLAExcludeContractBound());

  [BackOfficePermission(Features.FCLT_SLA_BASE, Permission.Read)]
  [UseFiltering(typeof(SLAFilterType))]
  [UseSorting(typeof(SLASortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<SLA> repository,
    [Service] IExportService<SLA> exportService,
    CancellationToken cancellationToken = default)
  {
    var slas = await repository
      .AsQueryable(new SLAIncludeForExportToExcelSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(slas, distributedCache, exportService, cancellationToken);
  }
}
