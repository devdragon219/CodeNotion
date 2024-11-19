using System.Collections;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using RealGimm.Core;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.Models;

namespace RealGimm.WebCommons;

public abstract class QueriesBase
{
  public const string FILE_DOWNLOAD_POLICY = "FileDownloadPolicy";
  public const string API_FILE_BASE = "/api/v1/files/";
  public const string API_DOCS_BASE = "/api/v1/documents/";

  protected async Task<FileUrlOutput> ExportToExcelAsync<TEntity>(
    IEnumerable<TEntity> entities,
    IDistributedCache distributedCache,
    IExportService<TEntity> exportService,
    CancellationToken cancellationToken = default)
  {
    var fileEntry = await exportService.ExportToExcelAsync(entities, cancellationToken);
    var fileId = Guid.NewGuid();
    var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_EXPORT_DURATION_EXCEL);

    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);

    return new FileUrlOutput($"{API_FILE_BASE}{fileId}");
  }
  
  protected async Task<FileUrlOutput> ExportToExcelAsync<TEntity>(
    IEnumerable<TEntity> entities,
    string worksheetName,
    string downloadFileName,
    IDistributedCache distributedCache,
    IExportService<TEntity> exportService,
    CancellationToken cancellationToken = default)
    => await ExportToExcelAsync(entities, worksheetName, downloadFileName, distributedCache, (IExportService)exportService, cancellationToken);
  
  protected async Task<FileUrlOutput> ExportToExcelAsync(
    IEnumerable entities,
    string worksheetName,
    string downloadFileName,
    IDistributedCache distributedCache,
    IExportService exportService,
    CancellationToken cancellationToken = default)
  {
    var fileEntry = await exportService.ExportToExcelAsync(entities, worksheetName, downloadFileName, cancellationToken);
    var fileId = Guid.NewGuid();
    var cacheEntryOptions = new DistributedCacheEntryOptions().SetAbsoluteExpiration(Constants.DEFAULT_EXPORT_DURATION_EXCEL);

    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);

    return new FileUrlOutput($"{API_FILE_BASE}{fileId}");
  }

  protected async Task<bool> CanUseInternalCode<TEntity>(
    string internalCode,
    int? entityToExcludeId,
    IReadRepository<TEntity> repository,
    CancellationToken cancellationToken,
    params ISpecification<TEntity>[] additionalSpec)
    where TEntity : class, IAggregateRoot, IIdentifiable, IInternallyCoded
  {
    var getByInternalCodeSpec = new GetByInternalCodeSpec<TEntity>(internalCode.Trim());

    var isCodeInUse = entityToExcludeId.HasValue
      ? await repository
          .AsQueryable(
            [getByInternalCodeSpec,
            new ExcludeByIdSpec<TEntity>(entityToExcludeId.Value),
            ..additionalSpec])
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(getByInternalCodeSpec, cancellationToken);

    return !isCodeInUse;
  }
}
