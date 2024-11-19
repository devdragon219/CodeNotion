using RealGimm.Core;
using RealGimm.Core.IAM;
using RealGimm.Web.Prop.Queries.Filters;
using RealGimm.Web.Prop.Queries.Sorting;
using RealGimm.WebCommons;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.WebCommons.Models;
using Ardalis.Specification;
using RealGimm.Core.Prop.Services;
using RealGimm.Web.Prop.Models;
using Ardalis.Result;
using RealGimm.SharedKernel;

namespace RealGimm.Web.Prop.Queries;

public class BillQueries : QueriesBase
{
  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  public Task<Bill?> Get(int id, [Service] IReadRepository<Bill> repository, CancellationToken cancellationToken)
    => repository
        .AsQueryable(new BillIncludeAllSpec(), new GetByIdSpec<Bill>(id))
        .SingleOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(BillFilterType))]
  [UseSorting(typeof(BillSortInputType))]
  public Task<IQueryable<Bill>> ListBills(
    [Service] RepositoryWebWrapper<Bill> repository,
    [SchemaService] IResolverContext? resolverContext)
    => repository.ListAllAsync(resolverContext, new BillIncludeAllSpec());

  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  [UseFiltering(typeof(BillFilterType))]
  [UseSorting(typeof(BillSortInputType))]
  public IQueryable<BillFullListOutput> ListBillsFull(
    [Service] IReadRepository<Bill> repository,
    [SchemaService] IResolverContext resolverContext)
  {
    return repository
      .AsQueryable()
      .Where(bill => bill.Contract != null)
      .Filter(resolverContext)
      .Sort(resolverContext)
      .Select(bill => new BillFullListOutput
      {
        Id = bill.Id,
        ContractId = bill.Contract!.Id,
        ContractInternalCode = bill.Contract.InternalCode,
        ContractManagementSubjectId = bill.Contract.ManagementSubjectId,
        MainCounterpartSubjectId = bill.MainCounterpartSubjectId,
        Since = bill.Since,
      });
  }

  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  [UseFiltering(typeof(BillFilterType))]
  [UseSorting(typeof(BillSortInputType))]
  public Task<FileUrlOutput> ExportActiveToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<Bill> repository,
    [Service] ActiveBillExportService exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
    => ExportToExcel(new ActiveBillSpec(), resolverContext, repository, exportService, distributedCache, cancellationToken);
  
  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  [UseFiltering(typeof(BillFilterType))]
  [UseSorting(typeof(BillSortInputType))]
  public Task<FileUrlOutput> ExportPassiveToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] RepositoryWebWrapper<Bill> repository,
    [Service] PassiveBillExportService exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
    => ExportToExcel(new PassiveBillSpec(), resolverContext, repository, exportService, distributedCache, cancellationToken);

  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  public async Task<BillStateStatisticsOutput> GetBillStateStatisticsOutput(
    [Service] IReadRepository<Bill> repository,
    CancellationToken cancellationToken)
  {
    var finalBillsCount = await repository.AsQueryable().CountAsync(bill => bill.FinalDate.HasValue, cancellationToken);
    var temporaryBillsCount = await repository.AsQueryable().CountAsync(bill => !bill.FinalDate.HasValue, cancellationToken);
    var totalBillsCount = finalBillsCount + temporaryBillsCount;

    double finalBillsPecentage;
    double temporaryBillsPercentage;

    if (totalBillsCount == 0)
    {
      finalBillsPecentage = 50d;
      temporaryBillsPercentage = 50d;
    }
    else
    {
      finalBillsPecentage = Math.Round(finalBillsCount * 100d / totalBillsCount, 2);
      temporaryBillsPercentage = 100d - finalBillsPecentage;
    }

    return new BillStateStatisticsOutput(finalBillsCount, finalBillsPecentage, temporaryBillsCount, temporaryBillsPercentage);
  }

  [BackOfficePermission(Features.PROP_BILL_BASE, Permission.Read)]
  public async Task<Result<FileUrlOutput>> GeneratePdf(
    int billId,
    [Service] IReadRepository<Bill> repository,
    [Service] IDistributedCache distributedCache,
    [Service] IPdfGenerator<Bill> pdfGenerator,
    CancellationToken cancellationToken)
  {
    var bill = await repository
      .AsQueryable(new GetByIdSpec<Bill>(billId), new BillIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (bill is null)
    {
      return Result<FileUrlOutput>.NotFound();
    }

    var fileEntry = await pdfGenerator.GeneratePdfAsync(bill);
    var fileId = Guid.NewGuid();
    var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_EXPORT_DURATION_EXCEL);

    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);

    return new FileUrlOutput($"{API_FILE_BASE}{fileId}");
  }

  private async Task<FileUrlOutput> ExportToExcel(
    Specification<Bill> billTypeSpecification,
    IResolverContext resolverContext,
    RepositoryWebWrapper<Bill> repository,
    IExportService<Bill> exportService,
    IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  { 
    var bills = await (await repository.ListAllAsync(resolverContext, new BillIncludeAllForExportSpec(), billTypeSpecification)).ToListAsync(cancellationToken);
    return await ExportToExcelAsync(bills, distributedCache, exportService, cancellationToken);
  }
}
