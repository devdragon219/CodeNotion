using RealGimm.Core.IAM;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Web.Fclt.Queries.Filters;
using RealGimm.Web.Fclt.Queries.Sorting;
using RealGimm.Core.Fclt.ContractTemplateAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries;

public class ContractTemplateQueries : QueriesBase
{
  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Read)]
  public async Task<ContractTemplate?> Get(
    int id,
    [Service] IReadRepository<ContractTemplate> repository,
    CancellationToken cancellationToken = default)
  {
    var contractTemplate = await repository
        .AsQueryable(new GetByIdSpec<ContractTemplate>(id), new ContractTemplateIncludeAllSpec())
        .SingleOrDefaultAsync(cancellationToken);

    if (contractTemplate is null)
    {
      return null;
    }

    foreach (var sla in contractTemplate.SLAs)
    {
      await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
      await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
    }

    foreach (var penalty in contractTemplate.Penalties)
    {
      await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);
    }

    return contractTemplate;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(ContractTemplateFilterType))]
  [UseSorting(typeof(ContractTemplateSortInputType))]
  public async Task<IEnumerable<ContractTemplate>> ListContractTemplates(
    [Service] IReadRepository<ContractTemplate> repository,
    [SchemaService] IResolverContext resolverContext,
    CancellationToken cancellationToken = default)
  {
    var contractTemplates = await repository
      .AsQueryable(new ContractTemplateIncludeForListSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    foreach (var contractTemplate in contractTemplates)
    {
      foreach (var sla in contractTemplate.SLAs)
      {
        await repository.LoadNavigationsAsync(sla.IfCondition, cancellationToken);
        await repository.LoadNavigationsAsync(sla.ThenCondition, cancellationToken);
      }

      foreach (var penalty in contractTemplate.Penalties)
      {
        await repository.LoadNavigationsAsync(penalty.IfCondition, cancellationToken);
      }
    }

    return contractTemplates;
  }

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Read)]
  public Task<string?> ProposeNewInternalCode([Service] ICodeSuggestor<ContractTemplate> codeSuggestor)
    => codeSuggestor.SuggestNextCode(null, (ContractTemplate?)null);

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentContractTemplateId,
    [Service] IReadRepository<ContractTemplate> repository,
    CancellationToken cancellationToken = default)
    => CanUseInternalCode<ContractTemplate>(internalCode, currentContractTemplateId, repository, cancellationToken);

  [BackOfficePermission(Features.FCLT_CONTRACT_TEMPLATES, Permission.Read)]
  [UseFiltering(typeof(ContractTemplateFilterType))]
  [UseSorting(typeof(ContractTemplateSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IDistributedCache distributedCache,
    [Service] IReadRepository<ContractTemplate> repository,
    [Service] IExportService<ContractTemplate> exportService,
    CancellationToken cancellationToken = default)
  {
    var query = await repository
      .AsQueryable(new ContractTemplateIncludeForExportToExcelSpec())
      .MaterializeIfRequiredAsync(resolverContext);

    var contractTemplates = await query.ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(contractTemplates, distributedCache, exportService, cancellationToken);
  }
}
