using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Prop.ContractAggregate.Models;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Prop.DataLoaders;
using RealGimm.WebCommons;
using RealGimm.WebCommons.Models;
using RealGimm.Web.Prop.Pagination;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Web.Prop.Models;
using RealGimm.SharedKernel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Queries.Filters;
using RealGimm.Web.Prop.Queries.Sorting;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Common;
using RealGimm.Core.Prop.Services;

namespace RealGimm.Web.Prop.Queries;

public class ContractQueries : QueriesBase
{
  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  [UsePaging(typeof(NonNullType<ObjectType<ContractListOutput>>), IncludeTotalCount = true, MaxPageSize = 100, ProviderName = nameof(ContractListPagingProvider))]
  [UseFiltering<ContractFilterType>]
  [UseSorting<ContractSortInputType>]
  public Task<IQueryable<Contract>> ListContracts(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<Contract> repository)
    => repository.ListAllAsync(resolverContext, new ContractIncludeAllSpec());

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  [UseFiltering<ContractFilterType>]
  [UseSorting<ContractSortInputType>]
  public Task<IQueryable<Contract>> ListContractsFull(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<Contract> repository)
    => repository.ListAllAsync(resolverContext, new ContractIncludeAllSpec());

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  public async Task<Contract?> GetContract(
    int contractId,
    ContractDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(contractId, cancellationToken);

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  [UseFiltering<ContractFilterType>]
  [UseSorting<ContractSortInputType>]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<Contract> repository,
    [Service] IExportService<Contract> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var contracts = await repository
      .AsQueryable(new ContractIncludeAllSpec())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToListAsync(cancellationToken);

    return await ExportToExcelAsync(contracts, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  public Task<bool> CanUseInternalCode(
    string internalCode,
    int? currentContractId,
    [Service] IReadRepository<Contract> repository,
    CancellationToken cancellationToken = default)
    => base.CanUseInternalCode(internalCode, currentContractId, repository, cancellationToken);

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  public async Task<string?> ProposeNewInternalCode(bool isActiveContract, [Service] ICodeSuggestor<Contract> codeSuggestor)
  {
    var partialEntity = new Contract();
    partialEntity.SetType(new());
    partialEntity.Type.SetIsActive(isActiveContract);
    
    return await codeSuggestor.SuggestNextCode(null, partialEntity);
  }
  
  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  public async Task<IEnumerable<ContractExpiryOutput>> GetLastContractExpiries(
     bool isActive,
     [Service] IReadRepository<Contract> contractRepository,
     [Service] IReadRepository<Subject> subjectRepository,
     CancellationToken cancellationToken = default)
  {
    var contracts = await contractRepository
      .AsQueryable()
      .Where(contract => contract.Type.IsActive == isActive)
      .Where(contract => contract.Status == EntryStatus.Working)
      .Where(contract => contract.SecondTermExpirationDate.HasValue)
      .OrderBy(contract => contract.SecondTermExpirationDate)
      .Select(contract => new
      {
        contract.Id,
        contract.InternalCode,
        contract.SecondTermExpirationDate,
        TypeDescription = contract.Type.Description,
        contract.ManagementSubjectId,
        contract.BillingBaseFee
      })
      .Take(Constants.COUNT_OF_LAST_CONTRACT_EXPIRIES_TO_SHOW)
      .ToListAsync(cancellationToken);

    var subjectsIds = contracts.Select(contract => contract.ManagementSubjectId).Distinct().ToList();

    var subjects = await subjectRepository
      .AsQueryable(new GetByIdsSpec<Subject>(subjectsIds))
      .ToDictionaryAsync(subject => subject.Id, cancellationToken);

    var dateNow = DateOnly.FromDateTime(DateTime.UtcNow);

    return contracts.Select(contract =>
      new ContractExpiryOutput(
        contract.Id,
        contract.InternalCode,
        contract.TypeDescription,
        contract.SecondTermExpirationDate!.Value.DayNumber - dateNow.DayNumber,
        subjects.TryGetValue(contract.ManagementSubjectId, out var subject) ? subject.Name : null,
        contract.BillingBaseFee));
  }

  [BackOfficePermission(Features.PROP_CONTRACT_BASE, Permission.Read)]
  public Task<ContractStatisticsOutput> GetStatistics(
    [Service] IContractStatisticsService statisticsService,
    CancellationToken cancellationToken)
    => statisticsService.GetCurrentStatisticsAsync(cancellationToken);
}
