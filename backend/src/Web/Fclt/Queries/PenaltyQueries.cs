using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.PenaltyAggregate.Specifications;
using RealGimm.Core.Fclt.ContractAggregate;

namespace RealGimm.Web.Fclt.Queries;

public class PenaltyQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Read)]
  public async Task<Penalty?> Get(
    int id,
    [Service] IReadRepository<Penalty> repository,
    CancellationToken cancellationToken = default)
  {
    var penalty = await repository
        .AsQueryable(new GetByIdSpec<Penalty>(id), new PenaltyIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

    if (penalty is null)
    {
      return null;
    }

    await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);

    return penalty;
  }

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Read)]
  [UseFiltering(typeof(PenaltyFilterType))]
  [UseSorting(typeof(PenaltySortInputType))]
  public async Task<IEnumerable<Penalty>> ListPenaltiesFull(
    [Service] IReadRepository<Penalty> repository,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var penalties = await repository
      .AsQueryable(new PenaltyIncludeForListFullSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    foreach (var penalty in penalties)
    {
      await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);
    }

    return penalties;
  }

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(PenaltyFilterType))]
  [UseSorting(typeof(PenaltySortInputType))]
  public IQueryable<Penalty> ListPenalties([Service] IReadRepository<Penalty> repository)
    => repository.AsQueryable(new PenaltyIncludeForListSpec());

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode(
    string[] additionallyOccupiedCodes,
    string? contractInternalCode,
    [Service] ICodeSuggestor<Penalty> codeSuggestor)
  {
    Penalty? penalty = null;

    if (contractInternalCode is not null)
    {
      var contract = new Contract();
      contract.SetInternalCode(contractInternalCode);

      penalty = new Penalty();
      penalty.SetContract(contract);
    }

    return codeSuggestor.SuggestNextCode(parentId: null, partialEntity: penalty, additionallyOccupiedCodes);
  }

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentPenaltyId,
    [Service] IReadRepository<Penalty> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<Penalty>(
      internalCode,
      currentPenaltyId,
      repository,
      cancellationToken,
      new PenaltyExcludeContractBoundSpec());

  [BackOfficePermission(Features.FCLT_PENALTY_BASE, Permission.Read)]
  [UseFiltering(typeof(PenaltyFilterType))]
  [UseSorting(typeof(PenaltySortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<Penalty> repository,
    [Service] IExportService<Penalty> exportService,
    CancellationToken cancellationToken = default)
  {
    var penalties = await repository
      .AsQueryable(new PenaltyIncludeForExportToExcelSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(penalties, distributedCache, exportService, cancellationToken);
  }
}
