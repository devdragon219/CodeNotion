using System.Globalization;
using System.IO.Compression;
using System.Reflection;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Infrastructure.Common.CityProvider.Models;

namespace RealGimm.Infrastructure.Common.CityProvider;

public class IstatCityProvider : ICityProvider
{
  private const string DefaultPermalinkUrl = "https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.csv";
  private readonly ILogger<IstatCityProvider> _logger;
  private readonly IRepository<City> _repository;
  private readonly HttpClient _httpClient;

  public IstatCityProvider(ILogger<IstatCityProvider> logger,
    IRepository<City> repository,
    IHttpClientFactory httpClientFactory)
  {
    _logger = logger;
    _repository = repository;
    _httpClient = httpClientFactory.CreateClient();
  }

  public Guid Id => new("aff42db1-aa0b-4311-a6f7-16021d722a60");

  public bool CanHandleCountry(string countryIso3)
  {
    return countryIso3.ToUpperInvariant() == CountryISO3.ITA;
  }

  public Task ImportUpdatesBoundaryPolygon(string countryIso3, string? overrideUrl, CancellationToken cancellationToken = default)
  {
    throw new NotImplementedException();
  }

  public async Task ImportUpdatesMasterList(string countryIso3, string? overrideUrl, CancellationToken cancellationToken = default)
  {
    if (countryIso3.ToUpperInvariant() != CountryISO3.ITA)
    {
      throw new ArgumentOutOfRangeException(nameof(countryIso3));
    }

    var cities = await FetchAndParseCsvAsync(
      overrideUrl ?? DefaultPermalinkUrl,
      !await _repository
        .AsQueryable(new CityByProviderIdSpec(Id))
        .AnyAsync(cancellationToken: cancellationToken),
      cancellationToken);

    _logger.LogInformation("Cities fetched, retrieving existing data");

    var actualCities = (await _repository.ListAsync(new CityByCountryISOCodeSpec(CountryISO3.ITA), cancellationToken))
      .ToDictionary(c => c.CityExternalCode!);

    var toInsert = cities.Keys.Except(actualCities.Keys);

    var toUpdate = cities.Keys.Intersect(actualCities.Keys);

    _logger.LogInformation("Performing upsertions");

    //Fetch region Guid / county Guid for new cities
    var regionGuids = actualCities.Values
      .GroupBy(c => c.RegionExternalCode!)
      .ToDictionary(grp => grp.Key, grp => grp.First().RegionGuid);

    var countyGuids = actualCities.Values
      .GroupBy(c => c.CountyExternalCode!)
      .ToDictionary(grp => grp.Key, grp => grp.First().CountyGuid);

    //Add missing guids for new regions/counties
    foreach (var rc in cities
      .Where(kvp => toInsert.Contains(kvp.Key))
      .Select(kvp => kvp.Value.RegionCode)
      .Distinct()
      .Except(regionGuids.Keys))
    {
      regionGuids.Add(rc, Guid.NewGuid());
    }

    foreach (var cc in cities
      .Where(kvp => toInsert.Contains(kvp.Key))
      .Select(kvp => kvp.Value.CountyCode)
      .Distinct()
      .Except(countyGuids.Keys))
    {
      countyGuids.Add(cc, Guid.NewGuid());
    }

    _logger.LogInformation("Inserting new cities...");

    //Insert cities
    int progress = 0, total = toInsert.Count();
    foreach (var newCityBatch in cities
      .Where(kvp => toInsert.Contains(kvp.Key))
      .Select(kvp => kvp.Value)
      .Chunk(750))
    {
      await _repository.AddRangeAsync(
        newCityBatch.Select(newCity =>
        {
          var nc = new City(newCity.Name, Guid.NewGuid(), CountryISO3.ITA, Id);
          nc.SetNames(newCity.Name, newCity.Name2, newCity.Name3);
          nc.SetCountry("Italia", CountryISO3.ITA);
          nc.SetRegion(newCity.RegionName, regionGuids[newCity.RegionCode], newCity.RegionCode);
          nc.SetCounty(newCity.CountyName,
            countyGuids[newCity.CountyCode],
            newCity.CountyCode,
            newCity.CountyShortCode,
            newCity.IsCountyMainCity);
          nc.SetCodes(newCity.CityCode, newCity.CadastralCode);

          return nc;
        }), cancellationToken
      );

      progress += newCityBatch.Length;

      _logger.LogInformation("Inserting cities: at {Progress} out of {Total}",
        progress,
        total);
    }

    _logger.LogInformation("Updating existing cities...");

    //Check updates for cities
    foreach (var newCity in cities
      .Where(kvp => toUpdate.Contains(kvp.Key))
      .Select(kvp => kvp.Value))
    {
      //Only update if anything actually changes.
      var nc = actualCities.FirstOrDefault(ac => ac.Key == newCity.CityCode).Value;
      if (IsChanged(nc, newCity))
      {
        nc.SetNames(newCity.Name, newCity.Name2, newCity.Name3);
        nc.SetCountry("Italia", CountryISO3.ITA);
        nc.SetRegion(newCity.RegionName, regionGuids[newCity.RegionCode], newCity.RegionCode);
        nc.SetCounty(newCity.CountyName,
          countyGuids[newCity.CountyCode],
          newCity.CountyCode,
          newCity.CountyShortCode,
          newCity.IsCountyMainCity);

        await _repository.UpdateAsync(nc, cancellationToken);
      }
    }

    _logger.LogInformation("Cities imported from ISTAT data.");
  }

  private static bool IsChanged(City nc, CityDto ncc)
  {
    return nc.Name != ncc.Name
      || nc.Name2 != ncc.Name2
      || nc.Name3 != ncc.Name3
      || nc.RegionName != ncc.RegionName
      || nc.RegionExternalCode != ncc.RegionCode
      || nc.CountyName != ncc.CountyName
      || nc.CountyExternalCode != ncc.CountyCode;
  }

  public async Task<Dictionary<string, CityDto>> FetchAndParseCsvAsync(
    string url,
    bool firstLoad,
    CancellationToken cancellationToken)
  {
    List<CityDto> cities = new();

    if (firstLoad)
    {
      using var stream = Assembly
            .GetExecutingAssembly()
            .GetManifestResourceStream("RealGimm.Infrastructure.Common.CityProvider.elenco-comuni-italiani.csv.gz")
            ?? throw new InvalidOperationException("Expected resource cannot be read.");

      using var compressedStream = new GZipStream(stream, CompressionMode.Decompress);
      using var reader = new StreamReader(compressedStream, Encoding.Latin1);

      cities = await ParseCsv(reader);
      return cities.ToDictionary(c => c.CityCode);
    }
    else
    {
      HttpResponseMessage response = await _httpClient.GetAsync(url, cancellationToken);

      if (response.IsSuccessStatusCode)
      {
        using var reader = new StreamReader(
          await response.Content.ReadAsStreamAsync(cancellationToken),
          Encoding.Latin1);

        cities = await ParseCsv(reader);
      }
      else
      {
        _logger.LogError("Failed to fetch CSV from {Url}. HTTP Status Code: {StatusCode}",
          url,
          response.StatusCode);
      }

      return cities.ToDictionary(c => c.CityCode);
    }
  }

  private async Task<List<CityDto>> ParseCsv(TextReader reader)
  {
    var cities = new List<CityDto>();

    CsvReader csvReader = new CsvReader(reader,
        new CsvConfiguration(CultureInfo.InvariantCulture)
        {
          Delimiter = ";",
          Quote = '"',
          NewLine = "\r\n",
          LineBreakInQuotedFieldIsBadData = false
        });

    try
    {
      //Skip header row
      await csvReader.ReadAsync();

      while (await csvReader.ReadAsync())
      {
        string? cityCode = csvReader.GetField(4);
        string? name = csvReader.GetField(5);
        string? name2 = csvReader.GetField(6);
        string? name3 = csvReader.GetField(7);
        string? region = csvReader.GetField(10);
        string? county = csvReader.GetField(11);
        string? countyShort = csvReader.GetField(14);
        bool isCountyMainCity = (csvReader.GetField(13) ?? string.Empty) == "1";
        string? cadastralCode = csvReader.GetField(19);
        string? regionCode = csvReader.GetField(24);
        string? countyCode = csvReader.GetField(25);

        if (string.IsNullOrWhiteSpace(name) ||
            string.IsNullOrWhiteSpace(region) ||
            string.IsNullOrWhiteSpace(county) ||
            string.IsNullOrWhiteSpace(cadastralCode) ||
            string.IsNullOrWhiteSpace(regionCode) ||
            string.IsNullOrWhiteSpace(cityCode) ||
            string.IsNullOrWhiteSpace(countyShort) ||
            string.IsNullOrWhiteSpace(countyCode))
        {
          _logger.LogWarning("Skipped invalid or incomplete record.");
          continue;
        }

        cities.Add(new CityDto
        {
          Name = name,
          Name2 = name2,
          Name3 = name3,
          RegionName = region,
          CountyName = county,
          CadastralCode = cadastralCode,
          RegionCode = regionCode,
          CityCode = cityCode,
          CountyCode = countyCode,
          CountyShortCode = countyShort,
          IsCountyMainCity = isCountyMainCity
        });
      }
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error while parsing CSV");
    }

    return cities;
  }
}
