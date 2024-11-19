using Microsoft.Extensions.Configuration;

namespace RealGimm.Core;

public static class ConfigurationExtensions
{
  public static string CachePath(this IConfiguration configuration)
  {
    var path = configuration["CachePath"] ?? "/opt/rg5-cache";

    if (!Directory.Exists(path))
    {
      try
      {
        Directory.CreateDirectory(path);
      }
      catch
      {
        //Ignore failure, will crash later in a more appropriate place
      }
    }

    return path;
  }

  public static int CacheDurationDays(this IConfiguration configuration)
  {
    var duration = configuration["CacheDurationDays"] ?? "30";

    return Convert.ToInt32(duration);
  }

  public static string FilesPath(this IConfiguration configuration)
  {
    var path = configuration["FilesPath"] ?? "/opt/rg5-files";

    if (!Directory.Exists(path))
    {
      try
      {
        Directory.CreateDirectory(path);
      }
      catch
      {
        // ignore failure, will crash later in a more appropriate place
      }
    }

    return path;
  }
}
