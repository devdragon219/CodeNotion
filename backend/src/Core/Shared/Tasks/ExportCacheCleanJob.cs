using System.ComponentModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Shared.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 45 0 * * ?")]
[Description("Clean export cache files")]
public sealed class ExportCacheCleanJob : IJob
{
  private readonly IConfiguration _configuration;
  private readonly ILogger<ExportCacheCleanJob> _logger;

  public ExportCacheCleanJob(
    IConfiguration configuration,
    ILogger<ExportCacheCleanJob> logger
  )
  {
    _logger = logger;
    _configuration = configuration;
  }

  public Task Execute(IJobExecutionContext context)
  {
    var directory = _configuration.CachePath();

    var minDate = DateTime.UtcNow.AddDays(-_configuration.CacheDurationDays());

    var filesToRemove = Directory
      .GetFiles(directory)
      .Select(f => new
      {
        FileName = f,
        new FileInfo(f).CreationTimeUtc
      })
      .Where(f => f.CreationTimeUtc < minDate
        && !string.IsNullOrEmpty(f.FileName))
      .Select(f => f.FileName)
      .ToArray();

    _logger.LogInformation("Cleaning {numFiles} files in {cachePath}",
      filesToRemove.Length,
      directory);

    foreach (var filename in filesToRemove)
    {
      try
      {
        if (File.Exists(filename))
        {
          File.Delete(filename);
        }
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Unable to clear file {filename} from cache", filename);
      }
    }

    return Task.CompletedTask;
  }
}
