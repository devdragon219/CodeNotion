using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using RealGimm.Core;
using RealGimm.SharedKernel;

namespace RealGimm.WebCommons;

public sealed class FileDownloadHandler
{
  public required IDistributedCache distributedCache { private get; init; }
  public required IConfiguration configuration { private get; init; }

  public IResult GetFile(Guid id)
  {
    var data = distributedCache.Get(id.ToString());
    var fce = FileCacheEntry.FromByteArray(data);

    if (fce is null)
    {
      return Results.NotFound();
    }

    return Results.File(
      System.IO.Path.Combine(configuration.CachePath(), fce.SharedAreaPath),
      fce.MimeType,
      fce.FileName);
  }
}