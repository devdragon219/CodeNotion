using System.Globalization;
using System.IO.Compression;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Text.Json;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Common.RevaluationDataAggregate;
using RealGimm.Core.Common.RevaluationDataAggregate.Specification;
using RealGimm.Infrastructure.Common.RevaluationDataProvider.Models;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Common.RevaluationDataProvider;

public class RevaluationDataProviderIta : IRevaluationDataProvider
{
  //SDMX Query source:
  // IT1,169_745_DF_DCSP_FOI1B2015_1,1.0
  // Provider IT1, dataset 169_745_DF_DCSP_FOI1B2015_1, version 1.0

  //SDMX Query filter:
  // M.IT.55.4.00ST
  // "Frequenza" Month -> M
  // "Territorio" Italy only (not provinces) -> IT
  // "Indicatore" the only one in the dataset, "Prezzi al consumo FOI base 2015" -> 55
  // "Misura" indices as numbers -> 4
  // "ECOICOP" general index without tobacco products -> 00ST
  private const string DefaultDataUrl = "https://esploradati.istat.it/SDMXWS/rest/data/IT1,169_745_DF_DCSP_FOI1B2015_1,1.0/M.IT.55.4.00ST/ALL/?startPeriod=2023-01-01&endPeriod=";
  public required ILogger<RevaluationDataProviderIta> _logger { protected get; init; }
  public required IRepository<RevaluationData> _repository { protected get; init; }
  public required HttpClient _httpClient { protected get; init; }
  public Guid Id => new("da636779-8705-4c17-af7b-0d2b596fd862");

  public bool CanHandleCountry(string countryIso3)
  {
    return countryIso3.ToUpperInvariant() == CountryISO3.ITA;
  }

  public async Task ImportUpdatesMasterList(string countryIso3, CancellationToken cancellationToken = default)
  {
    if (countryIso3.ToUpperInvariant() != CountryISO3.ITA)
    {
      throw new ArgumentOutOfRangeException(nameof(countryIso3));
    }

    var newData = await FetchAndParseDataAsync(
      !await _repository
        .AsQueryable(new RevaluationDataByProviderIdSpec(Id))
        .AnyAsync(cancellationToken: cancellationToken),
      cancellationToken);

    _logger.LogInformation("Revaluation data fetched, retrieving existing data");

    var actualData = (await _repository
      .ListAsync(new RevaluationDataByProviderIdSpec(Id), cancellationToken))
      .ToDictionary(c => c.Year * 100 + c.Month);

    var toInsert = newData.Keys.Except(actualData.Keys);

    var toUpdate = newData.Keys.Intersect(actualData.Keys);

    _logger.LogInformation("Inserting new data...");

    //Insert revaluation data
    int progress = 0, total = toInsert.Count();
    foreach (var newDataBatch in newData
      .Where(kvp => toInsert.Contains(kvp.Key))
      .Select(kvp => kvp.Value)
      .Chunk(750))
    {
      await _repository.AddRangeAsync(
        newDataBatch.Select(nrd =>
        {
          var nc = new RevaluationData();
          nc.SetData(nrd.Year, nrd.Month, nrd.BaseYear, Id, CountryISO3.ITA, nrd.RevaluationIndex);

          return nc;
        }), cancellationToken
      );

      progress += newDataBatch.Length;

      _logger.LogInformation("Inserting revaluation data: at {Progress} out of {Total}",
        progress,
        total);
    }

    _logger.LogInformation("Updating existing data...");

    //Check updates for data
    foreach (var updData in newData
      .Where(kvp => toUpdate.Contains(kvp.Key))
      .Select(kvp => kvp.Value))
    {
      //Only update if anything actually changes.
      var nc = actualData.FirstOrDefault(ac => ac.Key == updData.Year * 100 + updData.Month).Value;

      if (nc.RevaluationIndex != updData.RevaluationIndex)
      {
        nc.SetRevaluationIndex(updData.RevaluationIndex);
        await _repository.UpdateAsync(nc, cancellationToken);
      }
    }

    _logger.LogInformation("Revaluation data imported from ISTAT data.");
  }

  private async Task<Stream?> DownloadOrReuseJSON(CancellationToken cancellationToken)
  {
    var url = DefaultDataUrl + DateTime.UtcNow.ToString("yyyy-MM-dd");

    var tempFile = Path.Combine(Path.GetTempPath(),
      "revaluation-ita-" + DateTime.UtcNow.ToString("yyyy-MM-dd") + ".json");

    if (!File.Exists(tempFile))
    {
      _httpClient.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));

      try
      {
        HttpResponseMessage response = await _httpClient.GetAsync(url, cancellationToken);

        if (response.IsSuccessStatusCode)
        {
          using var inStream = await response.Content.ReadAsStreamAsync(cancellationToken);
          using var outStream = File.OpenWrite(tempFile);
          await inStream.CopyToAsync(outStream, cancellationToken);
        }
        else
        {
          _logger.LogError("Failed to fetch CSV from {Url}. HTTP Status Code: {StatusCode}",
            url,
            response.StatusCode);

          return null;
        }
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Unable to retrieve/store data from update service.");
        return null;
      }
    }

    return File.OpenRead(tempFile);
  }

  public async Task<Dictionary<int, RevaluationDataDto>> FetchAndParseDataAsync(
    bool firstLoad,
    CancellationToken cancellationToken)
  {
    Dictionary<int, RevaluationDataDto> resultData = new();

    if (firstLoad)
    {
      using var stream = Assembly
            .GetExecutingAssembly()
            .GetManifestResourceStream("RealGimm.Infrastructure.Common.RevaluationDataProvider.revdata-ita.csv.gz")
            ?? throw new InvalidOperationException("Expected resource cannot be read.");

      using var compressedStream = new GZipStream(stream, CompressionMode.Decompress);
      using var reader = new StreamReader(compressedStream, Encoding.Latin1);

      resultData = await ParseCsv(reader);
    }

    var updateStream = await DownloadOrReuseJSON(cancellationToken);

    if (updateStream is not null)
    {
      var receivedData = await ParseJson(updateStream, cancellationToken);

      updateStream.Close();
      await updateStream.DisposeAsync();

      //Add only values downloaded that are not in the local CSV, if any
      foreach (var kvp in receivedData
        .Where(newKvp => !resultData.ContainsKey(newKvp.Key))
        .ToList())
      {
        resultData.Add(kvp.Key, kvp.Value);
      }
    }

    return resultData;
  }

  private static async Task<Dictionary<int, RevaluationDataDto>> ParseJson(Stream stream, CancellationToken cancellationToken)
  {
    var doc = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken);

    //Don't need to deserialize the full object, just two data collections
    var obserValues = doc.RootElement
      .GetProperty("dataSets")
      .EnumerateArray()
      .First()
      .GetProperty("series")
      .GetProperty("0:0:0:0:0")
      .GetProperty("observations");
    var obserLabels = doc.RootElement
      .GetProperty("structure")
      .GetProperty("dimensions")
      .GetProperty("observation")
      .EnumerateArray()
      .First()
      .GetProperty("values")
      .EnumerateArray()
      .ToArray();

    var result = new List<RevaluationDataDto>();

    foreach (var value in obserValues.EnumerateObject())
    {
      var label = obserLabels[Convert.ToInt32(value.Name)].GetProperty("name").GetString()?.Split('-');
      var index = (decimal)value.Value[0].GetDouble();

      if (label is not null)
      {

        result.Add(new RevaluationDataDto
        {
          BaseYear = 2015,
          RevaluationIndex = index,
          Year = Convert.ToInt32(label[0]),
          Month = Convert.ToInt32(label[1]),
        });
      }
    }

    return result.ToDictionary(rd => rd.Year * 100 + rd.Month);
  }

  private async Task<Dictionary<int, RevaluationDataDto>> ParseCsv(TextReader reader)
  {
    var revData = new List<RevaluationDataDto>();

    CsvReader csvReader = new CsvReader(reader,
        new CsvConfiguration(CultureInfo.InvariantCulture)
        {
          Delimiter = ";",
          NewLine = "\n",
          LineBreakInQuotedFieldIsBadData = false
        });

    try
    {
      while (await csvReader.ReadAsync())
      {
        if (
          !csvReader.TryGetField<int>(0, out var year) ||
          !csvReader.TryGetField<int>(1, out var month) ||
          !csvReader.TryGetField<int>(2, out var baseYear) ||
          !csvReader.TryGetField<decimal>(3, out var index))
        {
          _logger.LogWarning("Skipped invalid or incomplete record.");
          continue;
        }

        revData.Add(new RevaluationDataDto
        {
          Year = year,
          Month = month,
          BaseYear = baseYear,
          RevaluationIndex = index
        });
      }
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error while parsing CSV");
    }

    return revData.ToDictionary(rd => rd.Year * 100 + rd.Month);
  }
}
