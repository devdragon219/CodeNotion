using System.Globalization;
using System.IO.Compression;
using System.Reflection;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Infrastructure.Common.RegistrationOfficeProvider.Models;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Common.RegistrationOfficeProvider;

public class RegOfficeProviderIta : IRegistrationOfficeProvider
{
  private ILogger<RegOfficeProviderIta> _logger;
  private IRepository<RegistrationOffice> _repository;
  private IRepository<City> _cities;

  public RegOfficeProviderIta(ILogger<RegOfficeProviderIta> logger,
    IRepository<RegistrationOffice> repository,
    IRepository<City> cities)
  {
    _logger = logger;
    _repository = repository;
    _cities = cities;
  }

  public Guid Id => new("0089d404-7bc7-42c0-a47b-0fff58002c16");

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

    var localData = await ReadEmbeddedData();

    _logger.LogInformation("Local Registration Offices data read, binding to cities");

    var cityByCadastralCode = (await _cities
        .AsQueryable()
        .Where(ct => ct.CountryISO == CountryISO3.ITA && ct.CadastralCode != null)
        .Select(ct => new { ct.Id, ct.CadastralCode })
        .ToArrayAsync(cancellationToken: cancellationToken))
      .GroupBy(c => c.CadastralCode)
      .ToDictionary(grp => grp.Key!, grp => grp.First().Id);

    foreach (var regOffice in localData)
    {
      if (regOffice.CityCadastralCode is not null
        && cityByCadastralCode.ContainsKey(regOffice.CityCadastralCode))
      {
        regOffice.CityId = cityByCadastralCode[regOffice.CityCadastralCode];
      }
    }

    //ExternalCode is required -> nullability coalescence should not be a problem

    var existingRegOffices = await _repository.AsQueryable()
      .ToDictionaryAsync(
        ro => ro.ExternalCode ?? string.Empty,
        ro => ro,
        cancellationToken);

    foreach (var toUpdate in localData.Where(ld => existingRegOffices.ContainsKey(ld.Code ?? string.Empty)))
    {
      //If changed, update
      var existing = existingRegOffices[toUpdate.Code ?? string.Empty];

      if (!string.Equals(existing.Description, toUpdate.Description) || existing.CityId != toUpdate.CityId)
      {
        //Should happen rarely
        existing.SetCity(toUpdate.CityId);
        existing.SetDescription(toUpdate.Description);
        await _repository.UpdateAsync(existing, cancellationToken);
      }
    }

    //Insert any missing
    await _repository.AddRangeAsync(localData
      .Where(ld => !existingRegOffices.ContainsKey(ld.Code ?? string.Empty))
      .Select(ro =>
      {
        var newRegOffice = new RegistrationOffice();
        newRegOffice.SetCity(ro.CityId);
        newRegOffice.SetDescription(ro.Description);
        newRegOffice.SetExternalCode(ro.Code);
        return newRegOffice;
      }), cancellationToken);

    _logger.LogInformation("Registration Offices imported ({howMany}) for Italy.", localData.Length);
  }

  private async Task<RegOfficeDto[]> ReadEmbeddedData()
  {
    using var stream = Assembly
      .GetExecutingAssembly()
      .GetManifestResourceStream("RealGimm.Infrastructure.Common.RegistrationOfficeProvider.regoffice-ita.csv.gz")
      ?? throw new InvalidOperationException("Expected resource cannot be read.");

    using var compressedStream = new GZipStream(stream, CompressionMode.Decompress);
    using var reader = new StreamReader(compressedStream);

    CsvReader csvReader = new CsvReader(reader,
      new CsvConfiguration(CultureInfo.InvariantCulture)
      {
        Delimiter = ";",
        Quote = '"',
        LineBreakInQuotedFieldIsBadData = false
      });

    var outList = new List<RegOfficeDto>();

    try
    {
      //Skip header row
      await csvReader.ReadAsync();

      while (await csvReader.ReadAsync())
      {
        var admCode = csvReader.GetField(0);
        var cadCode = csvReader.GetField(1);

        outList.Add(new RegOfficeDto
        {
          CityAdministrativeCode = admCode == "NULL" ? null : admCode,
          CityCadastralCode = cadCode == "NULL" ? null : cadCode,
          Code = csvReader.GetField(2),
          Description = csvReader.GetField(3)
        });
      }
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error while parsing CSV");
    }

    return outList.ToArray();
  }
}