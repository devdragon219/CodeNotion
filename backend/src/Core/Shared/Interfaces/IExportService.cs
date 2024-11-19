using System.Collections;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Shared.Interfaces;

public interface IExportService<TEntity> : IExportService
{
  public Task<FileCacheEntry> ExportToExcelAsync(
    IEnumerable<TEntity> entities,
    string worksheetName,
    string downloadFileName,
    CancellationToken cancellationToken = default);

  public Task<FileCacheEntry> ExportToExcelAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default);

  Task<FileCacheEntry> IExportService.ExportToExcelAsync(
    IEnumerable entities,
    string worksheetName,
    string downloadFileName,
    CancellationToken cancellationToken)
    => ExportToExcelAsync(entities.Cast<TEntity>(), worksheetName, downloadFileName, cancellationToken);

  Task<FileCacheEntry> IExportService.ExportToExcelAsync(IEnumerable entities, CancellationToken cancellationToken)
    => ExportToExcelAsync(entities.Cast<TEntity>(), cancellationToken);
}

public interface IExportService
{
  public Task<FileCacheEntry> ExportToExcelAsync(
    IEnumerable entities,
    string worksheetName,
    string downloadFileName,
    CancellationToken cancellationToken = default);

  public Task<FileCacheEntry> ExportToExcelAsync(IEnumerable entities, CancellationToken cancellationToken = default);

  public IEnumerable<string> GetHeaderTranslationKeys();
}
