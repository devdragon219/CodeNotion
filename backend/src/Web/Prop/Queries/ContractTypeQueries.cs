using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;
using RealGimm.Web.Prop.Queries.Filters;
using RealGimm.Web.Prop.Queries.Sorting;
using RealGimm.Core;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Prop.Queries;

public class ContractTypeQueries : QueriesBase
{
  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Read)]
  public Task<ContractType?> Get(int id,
    [Service] IReadRepository<ContractType> repository,
    CancellationToken cancellationToken = default)
    => repository.SingleOrDefaultAsync(new GetByIdSpec<ContractType>(id), cancellationToken);

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(ContractTypeFilterType))]
  [UseSorting(typeof(ContractTypeSortInputType))]
  public Task<IQueryable<ContractType>> ListContractTypes(
    [Service] IReadRepository<ContractType> repository,
    [SchemaService] IResolverContext resolverContext)
    => repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Read)]
  [UseFiltering(typeof(ContractTypeFilterType))]
  [UseSorting(typeof(ContractTypeSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<ContractType> repository,
    [Service] IExportService<ContractType> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var query = await repository.AsQueryable().MaterializeIfRequiredAsync(resolverContext);
    var contractTypes = await query.ToListAsync(cancellationToken);

    return await ExportToExcelAsync(contractTypes, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentContractTypeId,
    [Service] IReadRepository<ContractType> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentContractTypeId, repository, cancellationToken);

  [BackOfficePermission(Features.PROP_CONTRACT_TYPES, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<ContractType> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, partialEntity: null);
}
