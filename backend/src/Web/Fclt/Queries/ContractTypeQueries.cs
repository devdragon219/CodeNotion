using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Fclt.Queries;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractTypeQueries)}")]
public class ContractTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONTRACT_TYPES, Permission.Read)]
  public async Task<ContractType?> Get(
    int id,
    [Service] IReadRepository<ContractType> repository,
    CancellationToken cancellationToken = default)
    => await repository.SingleOrDefaultAsync(new GetByIdSpec<ContractType>(id), cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_TYPES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(ContractTypeFilterType))]
  [UseSorting(typeof(ContractTypeSortInputType))]
  public IQueryable<ContractType> ListFcltContractTypes([Service] IReadRepository<ContractType> repository)
    => repository.AsQueryable();

  [BackOfficePermission(Features.FCLT_CONTRACT_TYPES, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<ContractType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (ContractType?)null);

  [BackOfficePermission(Features.FCLT_CONTRACT_TYPES, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentContractTypeId,
    [Service] IReadRepository<ContractType> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<ContractType>(internalCode, currentContractTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_TYPES, Permission.Read)]
  [UseFiltering(typeof(ContractTypeFilterType))]
  [UseSorting(typeof(ContractTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<ContractType> repository,
    [Service] IExportService<ContractType> exportService,
    CancellationToken cancellationToken = default)
  {
    var contractTypes = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(contractTypes, distributedCache, exportService, cancellationToken);
  }
}
