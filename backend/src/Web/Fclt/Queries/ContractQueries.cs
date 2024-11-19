using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.Core.Fclt.ContractAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.WebCommons.Extensions;
using HotChocolate.Resolvers;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Fclt.ContractTemplateAggregate.Specifications;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;

namespace RealGimm.Web.Fclt.Queries;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractQueries)}")]
public class ContractQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  public async Task<Contract?> Get(
    int id,
    [Service] IReadRepository<Contract> repository,
    CancellationToken cancellationToken = default)
  {
    var contract = await repository
        .AsQueryable(new GetByIdSpec<Contract>(id), new ContractIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

    if (contract is null)
    {
      return null;
    }

    foreach (var sla in contract.SLAs)
    {
      await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
      await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
    }

    foreach (var penalty in contract.Penalties)
    {
      await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);
    }

    return contract;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(ContractFilterType))]
  [UseSorting(typeof(ContractSortInputType))]
  public Task<IQueryable<Contract>> ListFcltContracts(
    [Service] IReadRepository<Contract> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository
        .AsQueryable(new ContractIncludeForListSpec())
        .MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<Contract> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (Contract?)null);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentContractId,
    [Service] IReadRepository<Contract> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<Contract>(internalCode, currentContractId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_BASE, Permission.Read)]
  [UseFiltering(typeof(ContractFilterType))]
  [UseSorting(typeof(ContractSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<Contract> repository,
    [Service] IExportService<Contract> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository
      .AsQueryable(new ContractIncludeForExportToExcelSpec())
      .MaterializeIfRequiredAsync(resolverContext);

    var contractTemplates = await query.ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(contractTemplates, distributedCache, exportService, cancellationToken);
  }
}
