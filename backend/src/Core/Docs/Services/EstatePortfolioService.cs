using System.IO.Compression;
using System.Net.Mime;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Extensions;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.Extensions;
using RealGimm.Core.Resources;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Docs.Services;

public sealed class EstatePortfolioService : IEstatePortfolioService
{
  public required IReadRepository<Estate> _estateRepository { private get; init; }
  public required IReadRepository<Document> _documentRepository { private get; init; }
  public required IStringLocalizer<SharedResources> _sharedLocalizer { private get; init; }
  public required IStringLocalizer<EstatePortfolioService> _localizer { private get; init; }
  public required IConfiguration configuration { private get; init; }
  public required IDistributedCache distributedCache { private get; init; }
  public required ILogger<EstatePortfolioService> _logger { private get; init; }

  public async Task<Guid?> ExportToFile(int? preferredLCID, int estateId, string[] cmisIds, CancellationToken cancellationToken = default)
  {
    if (_sharedLocalizer is JsonStringLocalizer sharedJsonStringLocalizer)
    {
      sharedJsonStringLocalizer.OverrideLCID = preferredLCID;
    }
    
    if (_localizer is JsonStringLocalizer jsonStringLocalizer)
    {
      jsonStringLocalizer.OverrideLCID = preferredLCID;
    }

    var estate = await _estateRepository
      .AsQueryable(new GetByIdSpec<Estate>(estateId))
      .AsNoTracking()
      .Select(estate => new
      {
        estate.Id,
        estate.Name,
        EstateUnits = estate.EstateUnits.Select(estateUnit => new
        {
          estateUnit.Id,
          estateUnit.InternalCode
        }),
        CatalogueItems = estate.CatalogueItems.Select(catalogueItem => new
        {
          catalogueItem.Id,
          catalogueItem.InternalCode
        })
      })
      .SingleOrDefaultAsync(cancellationToken);

    if (estate is null)
    {
      _logger.LogWarning("Estate {estateId} not found", estateId);
      return null;
    }

    var sharedFileName = $"{Guid.NewGuid()}.zip";
    using var fileStream = File.OpenWrite(Path.Combine(configuration.CachePath(), sharedFileName));

    using (var archive = new ZipArchive(fileStream, ZipArchiveMode.Create))
    {
      await AddDocumentsToArchiveAsync<Estate>(archive, cmisIds, estateId, _localizer["Estate"], cancellationToken);

      foreach (var estateUnit in estate.EstateUnits)
      {
        await AddDocumentsToArchiveAsync<EstateUnit>(
          archive,
          cmisIds,
          estateUnit.Id,
          $"{_localizer["EstateUnit"]}/{estateUnit.InternalCode}", cancellationToken);
      }

      foreach (var catalogueItem in estate.CatalogueItems)
      {
        await AddDocumentsToArchiveAsync<CatalogueItem>(
          archive,
          cmisIds,
          catalogueItem.Id,
          $"{_localizer["Catalogue"]}/{catalogueItem.InternalCode}", cancellationToken);
      }
    }

    var fileEntry = new FileCacheEntry($"{estate.Name}.zip",
      MediaTypeNames.Application.Zip,
      sharedFileName);

    var fileId = Guid.NewGuid();

    var cacheEntryOptions = new DistributedCacheEntryOptions()
      .SetAbsoluteExpiration(Constants.DEFAULT_EXPORT_DURATION_ZIP);

    distributedCache.Set(fileId.ToString(), fileEntry.ToByteArray(), cacheEntryOptions);

    return fileId;
  }

  private async Task AddDocumentsToArchiveAsync<TEntity>(
    ZipArchive archive,
    string[] cmisIds,
    int entityId,
    string baseFolderName,
    CancellationToken cancellationToken)
    where TEntity : IIdentifiable
  {
    var documents = await _documentRepository.ListAsync(new DocumentsByEntityIdSpec<TEntity>(entityId), cancellationToken);

    documents = documents
      .Where(document => cmisIds.Contains(document.CmisId))
      .Where(document => document.Data != null)
      .ToList();

    foreach (var document in documents)
    {
      var entryName = Path.Combine(
        baseFolderName,
        _sharedLocalizer.LocalizeContentCategoryGroup(document.ContentCategory.GetGroupName()),
        _sharedLocalizer.LocalizeEnumValue(document.ContentCategory),
        document.FileName ?? document.Name);

      var entry = archive.CreateEntry(entryName, CompressionLevel.Optimal);
      entry.Comment = document.Name;

      using var documentStream = entry.Open();
      await document.Data!.CopyToAsync(documentStream, cancellationToken);
    }
  }
}
