using System.IO.Compression;
using System.Reflection;
using MaxMind.GeoIP2;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.IAM.LoginLocationProvider;

public class DefaultLoginLocationProvider : INetLocationProvider
{
  //This will never be disposed
  private static readonly DatabaseReader _reader;

  static DefaultLoginLocationProvider()
  {
    var stream = Assembly
              .GetExecutingAssembly()
              .GetManifestResourceStream("RealGimm.Infrastructure.IAM.LoginLocationProvider.GeoLite2-City.mmdb.gz")
              ?? throw new InvalidOperationException("Expected resource cannot be read.");

    var decompressed = new GZipStream(stream, CompressionMode.Decompress);
    _reader = new DatabaseReader(decompressed);
  }

  public Task<string?> DescribeNetLocation(string? ipAddress)
  {
    if (string.IsNullOrEmpty(ipAddress))
    {
      return Task.FromResult<string?>(null);
    }

    try
    {
      if (_reader.TryCity(ipAddress, out var city) && city is not null)
      {
        return Task.FromResult<string?>(
          $"{city.Country.Name} - {city.MostSpecificSubdivision.Name} - {city.City.Name}");
      }
    }
    catch
    {
      //This exception is intentionally ignored
    }

    return Task.FromResult<string?>(null);
  }
}