using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CityAggregate.Specifications;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.Common.CustomCodeAggregate.Specification;
using RealGimm.Plugin.Import.Common.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Common;

public partial class DefaultCommonDataImporter
{
  internal virtual async Task<IEnumerable<CityDTO>> GetCitiesFromAnag(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return await dbConnection.QueryAsync<CityDTO>(
      @"SELECT
          city.[IdComune] [CityExternalIdentifier],
          city.[CodIstatComune] [CityExternalCode],
          city.[CodCatastaleComune] [CadastralCode],
          city.[DescComune] [Name],
          county.[DescProvincia] [CountyName],
          county.[CodProvincia] [CountyShortCode],
          country.[DescNazione] [CountryName],
          country.[SiglaStatoNazione] [Iso3316Alpha2]
        FROM [dbo].[AnagraficaSoggetto] anag
          JOIN [dbo].[Comune] city
            ON city.[IdComune] = anag.[fk_Comune_Id]
              AND anag.[fk_Comune_Id] IS NOT NULL
          JOIN [dbo].[Provincia] county
            ON city.[fk_Provincia_Id] = county.[IdProvincia]
          JOIN [dbo].[Nazione] country
            ON city.[fk_Nazione_Id] = country.[IdNazione]
      UNION SELECT
          city.[IdComune] [CityExternalIdentifier],
          city.[CodIstatComune] [CityExternalCode],
          city.[CodCatastaleComune] [CadastralCode],
          city.[DescComune] [Name],
          county.[DescProvincia] [CountyName],
          county.[CodProvincia] [CountyShortCode],
          country.[DescNazione] [CountryName],
          country.[SiglaStatoNazione] [Iso3316Alpha2]
        FROM [dbo].[IndirizzoSoggetto] ind
          JOIN [dbo].[AnagraficaSoggetto] anag
            ON ind.[fk_AnagraficaSoggetto_Id] = anag.[IdAnagraficaSoggetto]
          JOIN [dbo].[Comune] city
            ON city.[IdComune] = ind.[fk_Comune_Id]
              AND ind.[fk_Comune_Id] IS NOT NULL
          JOIN [dbo].[Provincia] county
            ON city.[fk_Provincia_Id] = county.[IdProvincia]
          JOIN [dbo].[Nazione] country
            ON city.[fk_Nazione_Id] = country.[IdNazione]
      UNION SELECT
          city.[IdComune] [CityExternalIdentifier],
          city.[CodIstatComune] [CityExternalCode],
          city.[CodCatastaleComune] [CadastralCode],
          city.[DescComune] [Name],
          county.[DescProvincia] [CountyName],
          county.[CodProvincia] [CountyShortCode],
          country.[DescNazione] [CountryName],
          country.[SiglaStatoNazione] [Iso3316Alpha2]
        FROM [dbo].[AnagraficaSoggetto] anag
          JOIN [dbo].[Comune] city
            ON city.[CapGenericoComune] = anag.[CapSoggetto]
              AND anag.[CapSoggetto] IS NOT NULL
              AND anag.[CapSoggetto] <> ''
              AND anag.[CapSoggetto] <> '99999'
          JOIN [dbo].[Provincia] county
            ON city.[fk_Provincia_Id] = county.[IdProvincia]
          JOIN [dbo].[Nazione] country
            ON city.[fk_Nazione_Id] = country.[IdNazione]
      UNION SELECT
          city.[IdComune] [CityExternalIdentifier],
          city.[CodIstatComune] [CityExternalCode],
          city.[CodCatastaleComune] [CadastralCode],
          city.[DescComune] [Name],
          county.[DescProvincia] [CountyName],
          county.[CodProvincia] [CountyShortCode],
          country.[DescNazione] [CountryName],
          country.[SiglaStatoNazione] [Iso3316Alpha2]
        FROM [dbo].[AnagraficaSoggetto] anag
          JOIN [dbo].[Comune] city
            ON CASE
                WHEN CHARINDEX('(', city.[DescComune]) > 0 THEN TRIM(LEFT(city.[DescComune], CHARINDEX('(', city.[DescComune]) - 1))
                ELSE city.[DescComune]
            END
            COLLATE SQL_Latin1_General_CP1_CS_AS = anag.[ComuneSoggetto]
              AND anag.[ComuneSoggetto] IS NOT NULL
          JOIN [dbo].[Provincia] county
            ON city.[fk_Provincia_Id] = county.[IdProvincia]
          JOIN [dbo].[Nazione] country
            ON city.[fk_Nazione_Id] = country.[IdNazione]
        WHERE county.[CodProvincia] = anag.[ProvinciaSoggetto]
          AND country.[SiglaStatoNazione] = anag.[NazioneSoggetto]", cancellationToken);
  }

  internal virtual async Task<IEnumerable<CityDTO>> GetCitiesFromAsst(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return await dbConnection.QueryAsync<CityDTO>(
      @"SELECT
          city.[IdComune] [CityExternalIdentifier],
          city.[CodIstatComune] [CityExternalCode],
          city.[CodCatastaleComune] [CadastralCode],
          city.[DescComune] [Name],
          county.[DescProvincia] [CountyName],
          county.[CodProvincia] [CountyShortCode],
          country.[DescNazione] [CountryName],
          country.[SiglaStatoNazione] [Iso3316Alpha2]
        FROM [dbo].[Immobile] i
          JOIN [dbo].[Comune] city
            ON city.[IdComune] = i.[fk_Comune_Id]
              AND i.[fk_Comune_Id] IS NOT NULL
          JOIN [dbo].[Provincia] county
            ON city.[fk_Provincia_Id] = county.[IdProvincia]
          JOIN [dbo].[Nazione] country
            ON city.[fk_Nazione_Id] = country.[IdNazione]
      UNION SELECT
          city.[IdComune] [CityExternalIdentifier],
          city.[CodIstatComune] [CityExternalCode],
          city.[CodCatastaleComune] [CadastralCode],
          city.[DescComune] [Name],
          county.[DescProvincia] [CountyName],
          county.[CodProvincia] [CountyShortCode],
          country.[DescNazione] [CountryName],
          country.[SiglaStatoNazione] [Iso3316Alpha2]
        FROM [dbo].[UnitaImmobiliare] ui
          JOIN [dbo].[Comune] city
            ON city.[IdComune] = ui.[fk_Comune_Id]
              AND ui.[fk_Comune_Id] IS NOT NULL
          JOIN [dbo].[Provincia] county
            ON city.[fk_Provincia_Id] = county.[IdProvincia]
          JOIN [dbo].[Nazione] country
            ON city.[fk_Nazione_Id] = country.[IdNazione]
      ", cancellationToken);
  }

  private async Task UpdateCities(CancellationToken cancellationToken)
  {
    var allCitiesList = (await GetCitiesFromAnag(cancellationToken))
      .Concat(await GetCitiesFromAsst(cancellationToken))
      .DistinctBy(c => c.CityExternalIdentifier);

    _logger.LogInformation("Received {cityCount} cities from upstream",
      allCitiesList.Count());

    //Cleanup specifics.
    allCitiesList = allCitiesList
      .Where(city => !(city.Iso3316Alpha2 == "IT"
        && (city.CountyShortCode == "XX" || city.CountyShortCode == "EE")));

    var cityTranscodings = await FixExistingCityTranscoding(
      allCitiesList,
      cancellationToken);

    _logger.LogInformation("Existing cities transcoding was fixed");

    //This code will not update cities from upstream, as of now.
    //The right logic would be to check if the data provider for any existing city
    // is the current data provider, and update only if data was updated.
    //If the city is managed by another provider, and the transcoding exists,
    // do not update any data but output a suitable warning log entry.
    // (it will most likely be updated by that data provider anyway sometime soon)

    //Add any missing cities, and store transcoding
    var externalExistingCodes = cityTranscodings
      .Where(ct => !string.IsNullOrEmpty(ct.ExternalCode))
      .Select(ct => ct.ExternalCode)
      .ToArray();

    var newCities = allCitiesList
      .Where(c => !externalExistingCodes.Contains(c.CityExternalIdentifier))
      .ToArray();

    int successes = 0, failures = 0;
    foreach (var newCity in newCities)
    {
      if (await HandleNewCity(newCity, cancellationToken))
      {
        successes++;
      }
      else
      {
        failures++;
      }
    }

    _logger.LogInformation("COMMON City data synced from upstream ({ok} successes, {fail} failures)",
      successes, failures);
  }

  private async Task<bool> HandleNewCity(CityDTO city, CancellationToken cancellationToken)
  {
    if (string.IsNullOrEmpty(city.Name)
      || string.IsNullOrEmpty(city.CountyShortCode)
      || string.IsNullOrEmpty(city.Iso3316Alpha2))
    {
      _logger.LogError("City {externalId} could not be imported; incomplete minimum data.",
        city.CityExternalIdentifier);
      return false;
    }

    if (!_isoDictionary.ContainsKey(city.Iso3316Alpha2))
    {
      _logger.LogError("City {externalId} could not be imported; country {country} not found.",
        city.CityExternalIdentifier,
        city.Iso3316Alpha2);
      return false;
    }

    var country = _isoDictionary[city.Iso3316Alpha2];

    var localCity = new City(
      city.Name.Trim(),
      Guid.NewGuid(),
      country,
      IMPORT_CITY_PROVIDER);

    //Search for existing county/country combination
    var existingCounty = await _cities.AsQueryable(
      new CityByCountryISOCodeSpec(country),
      new CityByCountyShortCodeSpec(city.CountyShortCode!)
    ).FirstOrDefaultAsync(cancellationToken);

    if (existingCounty is null)
    {
      //Will have to register anything - maybe search for country name?
      var existingCountry = await _cities.AsQueryable(
        new CityByCountryISOCodeSpec(country)
      ).FirstOrDefaultAsync(cancellationToken);

      if (existingCountry is not null)
      {
        localCity.SetCountry(existingCountry.CountryName, existingCountry.CountryISO);
      }

      if (city.CountyName is not null)
      {
        localCity.SetCounty(city.CountyName,
          Guid.NewGuid(),
          null,
          city.CountyShortCode,
          city.CountyName!.ToLowerInvariant() == city.Name
          );
      }

      //No region data
    }
    else
    {
      //Copy county/region/country data from existing match
      localCity.SetCountry(existingCounty.CountryName,
        existingCounty.CountryISO);

      localCity.SetRegion(existingCounty.RegionName,
        existingCounty.RegionGuid,
        existingCounty.RegionExternalCode);

      localCity.SetCounty(existingCounty.CountyName,
        existingCounty.CountyGuid,
        existingCounty.CountyExternalCode,
        existingCounty.CountyShortCode,
        existingCounty.CountyName is not null
          && existingCounty.CountyName.ToLowerInvariant() == localCity.Name.ToLowerInvariant()
        );
    }

    var newCity = await _cities.AddAsync(localCity, cancellationToken);

    var newCode = new CustomCode();
    newCode.SetData(localCity.Name,
      IMPORT_CITY_PROVIDER,
      nameof(City),
      CustomCodeFunction.Transcoding);

    newCode.SetCodes(localCity.Id.ToString(), city.CityExternalIdentifier);

    await _codeRepository.AddAsync(newCode, cancellationToken);

    return true;
  }

  private async Task<IEnumerable<CustomCode>> FixExistingCityTranscoding(
    IEnumerable<CityDTO> externalCities,
    CancellationToken cancellationToken)
  {
    //Try to find transcoding for existing internal entities
    var cityTranscodings = await _codeRepository.AsQueryable(
      new CustomCodeTranscoding<City>(IMPORT_CITY_PROVIDER)
    ).ToListAsync(cancellationToken);

    //Fix transcodings for cities that already exist
    var internalEntityIds = cityTranscodings
      .Where(code => !string.IsNullOrEmpty(code.InternalCode))
      .Select(code => Convert.ToInt32(code.InternalCode))
      .Distinct()
      .ToArray();

    var existingNonTranscodedCities = await _cities
      .AsQueryable()
      .Where(city => !internalEntityIds.Contains(city.Id))
      .ToArrayAsync(cancellationToken);

    var transcodingsToAdd = existingNonTranscodedCities
      //If this city can be found in the external cities,
      // store the transcoding
      .Select(internalCity => new
      {
        internalId = internalCity.Id,
        internalName = internalCity.Name,
        externalId = externalCities
          .FirstOrDefault(ec => !string.IsNullOrEmpty(ec.Iso3316Alpha2)
            && _isoDictionary.ContainsKey(ec.Iso3316Alpha2)
            && _isoDictionary[ec.Iso3316Alpha2] == internalCity.CountryISO
            && (ec.CadastralCode == internalCity.CadastralCode
              || ec.CityExternalCode == internalCity.CityExternalCode))
          ?.CityExternalIdentifier
      })
      .Where(t => !string.IsNullOrEmpty(t.externalId))
      .ToArray();

    if (transcodingsToAdd.Length > 0)
    {
      await _codeRepository.AddRangeAsync(
        transcodingsToAdd.Select(t =>
        {
          var newCode = new CustomCode();
          newCode.SetData(t.internalName,
            IMPORT_CITY_PROVIDER,
            nameof(City),
            CustomCodeFunction.Transcoding);

          newCode.SetCodes(t.internalId.ToString(), t.externalId!);

          return newCode;
        }), cancellationToken
      );

      _logger.LogInformation("{txAdded} transcodings added", transcodingsToAdd.Length);
    }

    return await _codeRepository.AsQueryable(
        new CustomCodeTranscoding<City>(IMPORT_CITY_PROVIDER)
      ).ToListAsync(cancellationToken);
  }
}
