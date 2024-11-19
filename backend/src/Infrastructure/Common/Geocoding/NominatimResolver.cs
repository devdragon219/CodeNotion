using System.Globalization;
using System.Text.Json;
using System.Web;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.CrossModule;
using RealGimm.Infrastructure.Common.Geocoding.Models;

namespace RealGimm.Infrastructure.Common.Geocoding;

public class NominatimResolver : IGeocodingResolver, IConfigurableModule
{
  public static readonly string PARAM_URL = "nominatim-search-url";

  public ConfigFunction Function => ConfigFunction.Geocoder;
  public string[] ConfigurationParameters
  {
    get
    {
      return new[] {
        PARAM_URL
      };
    }
  }

  private string? _url;
  private readonly ILogger<NominatimResolver> _logger;
  private readonly HttpClient _httpClient;
  private readonly IReadRepository<Config> _configRepository;

  public NominatimResolver(
    IReadRepository<Config> configRepository,
    ILogger<NominatimResolver> logger,
    IHttpClientFactory httpClientFactory)
  {
    _configRepository = configRepository;

    _logger = logger;

    _httpClient = httpClientFactory.CreateClient();
  }

  private async Task EnsureInitializedAsync(CancellationToken cancellationToken)
  {
    if (!string.IsNullOrEmpty(_url)) return;

    var nominatimUrl = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(ConfigFunction.Geocoder, PARAM_URL),
      cancellationToken);

    if (nominatimUrl is null || string.IsNullOrEmpty(nominatimUrl.Value))
    {
      throw new ArgumentNullException("Nominatim endpoint configuration is missing");
    }

    _url = nominatimUrl.Value;
  }

  public async Task<GeocodingResult?> ResolveAddress(IAddress address, CancellationToken cancellationToken = default)
  {
    await EnsureInitializedAsync(cancellationToken);

    if (string.IsNullOrEmpty(_url)) return null;

    var ub = new UriBuilder(_url!);

    var countryName = address.CountryName;

    if (countryName is null && !string.IsNullOrEmpty(address.CountryISO))
    {
      countryName = ISO3166.Country.List
        .FirstOrDefault(c => c.ThreeLetterCode.ToLowerInvariant() == address.CountryISO.ToLowerInvariant())
        ?.Name;
    }

    var q = string.Join('&', new Dictionary<string, string?> {
        {"format", "jsonv2"},
        {"country", countryName},
        {"city", address.CityName},
        {"street", address.Toponymy is null
          ? null
          : (address.Toponymy +
            (address.Numbering is null
              ? string.Empty
              : (' ' + address.Numbering))) }
      }.Where(kvp => kvp.Value is not null)
      .Select(kvp => kvp.Key + '=' + HttpUtility.UrlEncode(kvp.Value))
    );

    ub.Query += q;

    HttpResponseMessage response = await _httpClient.GetAsync(ub.ToString(), cancellationToken);

    if (response.IsSuccessStatusCode)
    {
      try
      {
        var result = await JsonSerializer.DeserializeAsync<NominatimResponseItem[]>(
          await response.Content.ReadAsStreamAsync(cancellationToken),
          cancellationToken: cancellationToken);

        if (result is null || !result.Any())
        {
          return null;
        }

        var mainResult = result[0];

        var p = new GeocodingResult
        {
          BoundingBox = new[] {
            (float)Convert.ToDouble(mainResult.BoundingBox[0],
              CultureInfo.InvariantCulture.NumberFormat),
            (float)Convert.ToDouble(mainResult.BoundingBox[1],
              CultureInfo.InvariantCulture.NumberFormat),
            (float)Convert.ToDouble(mainResult.BoundingBox[2],
              CultureInfo.InvariantCulture.NumberFormat),
            (float)Convert.ToDouble(mainResult.BoundingBox[3],
              CultureInfo.InvariantCulture.NumberFormat),
          }
        };

        if (mainResult.OsmType is not null && mainResult.OsmType is "way" or "node")
        {
          p.Position = new[]{
            (float)Convert.ToDouble(mainResult.Latitude,
              CultureInfo.InvariantCulture.NumberFormat),
            (float)Convert.ToDouble(mainResult.Longitude,
              CultureInfo.InvariantCulture.NumberFormat)
          };
        }

        return p;
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Error parsing Nominatim response for query url {url}",
          ub.ToString());
      }
    }
    else
    {
      _logger.LogInformation("Unsuccessful response from Nominatim for query url {url}",
        ub.ToString());
    }

    return null;
  }
}