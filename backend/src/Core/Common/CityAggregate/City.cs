using System.ComponentModel.DataAnnotations;
using NetTopologySuite.Geometries;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.CityAggregate;

public class City : EntityBase, IAggregateRoot
{
  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME), Required, FuzzySearchable]
  public string Name { get; private set; }
  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME), FuzzySearchable]
  public string? Name2 { get; private set; }
  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME), FuzzySearchable]
  public string? Name3 { get; private set; }
  public Guid Guid { get; private set; }
  public Guid CityProvider { get; private set; }
  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME), FuzzySearchable]
  public string? CountyName { get; private set; }
  public Guid? CountyGuid { get; private set; }
  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME), FuzzySearchable]
  public string? RegionName { get; private set; }
  public Guid? RegionGuid { get; private set; }
  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME), FuzzySearchable]
  public string? CountryName { get; private set; }
  [MaxLength(StrFieldSizes.ISO_COUNTRY)]
  public string CountryISO { get; private set; }
  public DateTime LastUpdated { get; private set; }
  public DateTime CreationDate { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? CadastralCode { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? CityExternalCode { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? CountyExternalCode { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? RegionExternalCode { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? CountyShortCode { get; private set; }
  public bool IsCountyMainCity { get; private set; }
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ClimateZoneCode { get; private set; }

  public Polygon? AdministrativeBoundary { get; private set; }

  public City(string name, Guid guid, string countryISO, Guid cityProvider)
  {
    if (string.IsNullOrEmpty(name)) throw new ArgumentNullException(nameof(name));

    Name = name;
    Guid = guid;
    CityProvider = cityProvider;
    CountryISO = countryISO;

    CreationDate = DateTime.UtcNow;
    LastUpdated = DateTime.UtcNow;
  }

  public void SetNames(string newName1, string? newName2, string? newName3)
  {
    if (string.IsNullOrEmpty(newName1)) throw new ArgumentNullException(nameof(newName1));

    Name = newName1;
    Name2 = newName2;
    Name3 = newName3;
  }

  public void SetRegion(string? regionName, Guid? regionGuid, string? externalCode)
  {
    RegionExternalCode = externalCode;
    RegionGuid = regionGuid;
    RegionName = regionName;
  }

  public void SetCounty(string? countyName, Guid? countyGuid, string? externalCode, string? shortCode, bool isCountyMainCity)
  {
    CountyName = countyName;
    CountyGuid = countyGuid;
    CountyExternalCode = externalCode;
    CountyShortCode = shortCode;
    IsCountyMainCity = isCountyMainCity;
  }

  public void SetCountry(string? countryName, string countryISO)
  {
    CountryName = countryName;
    CountryISO = countryISO;
  }

  public void SetCodes(string? externalCode, string? cadastralCode)
  {
    CityExternalCode = externalCode;
    CadastralCode = cadastralCode;
  }

  public void SetClimateData(string? climateZone)
  {
    ClimateZoneCode = climateZone;
  }

  public void SetAdministrativeBoundary(Polygon? boundary)
  {
    AdministrativeBoundary = boundary;
  }

  public void SetCadastralCode(string? cadastralCode) => CadastralCode = cadastralCode;
}
