using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using HotChocolate.Types;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Asst.EstateAggregate;

[ObjectType(nameof(Asst) + nameof(Address))]
public class Address : EntityBase, IAddress
{
  private static readonly GeometryFactory _geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
  
  [GraphQLIgnore]
  public Estate? Estate { get; private set; }

  [GraphQLIgnore]
  public List<EstateUnit>? EstateUnit { get; private set; }

  public AddressType AddressType { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME)]
  public string? CityName { get; private set; }
  public Guid? CityReference { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME)]
  public string? CountyName { get; private set; }
  public Guid? CountyReference { get; private set; }

  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME)]
  public string? RegionName { get; private set; }
  public Guid? RegionReference { get; private set; }

  [MaxLength(StrFieldSizes.LARGE_TOPONYMY_NAME)]
  public string? CountryName { get; private set; }
  [MaxLength(StrFieldSizes.ISO_COUNTRY)]
  public string? CountryISO { get; private set; }


  [FuzzySearchable, MaxLength(StrFieldSizes.SMALL_TOPONYMY_NAME)]
  public string? Toponymy { get; private set; }

  [MaxLength(StrFieldSizes.NUMBERING_OR_POSTCODE)]
  public string? Numbering { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NUMBERING_OR_POSTCODE)]
  public string? LocalPostCode { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateTime CreationDate { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public Point? LocationLatLon { get; private set; }

  public void SetCounty(string? newCountyName, Guid? countyGuid)
  {
    CountyName = newCountyName;
    CountyReference = countyGuid;
  }

  public void SetRegion(string? newRegionName, Guid? regionGuid)
  {
    RegionName = newRegionName;
    RegionReference = regionGuid;
  }

  public void SetCountry(string? countryIso, string? newCountryName)
  {
    CountryName = newCountryName;
    CountryISO = countryIso;
  }

  public void SetLocalPostCode(string? newLocalPostCode) => LocalPostCode = newLocalPostCode;

  public void SetNotes(string? newNotes) => Notes = newNotes;
  public void SetNumbering(string? newNumbering)
  {
    Numbering = newNumbering;
  }

  public void SetCity(string? cityName, Guid? cityReference)
  {
    CityName = cityName;
    CityReference = cityReference;
  }
  
  public void SetLocation(Point? location) => LocationLatLon = location;

  public void SetLocation(double latitude, double longitude) => LocationLatLon = 
    _geometryFactory.CreatePoint(
        new Coordinate(longitude, latitude));

  public void SetToponymy(string? toponymy) => Toponymy = toponymy;

  public void SetType(AddressType type) => AddressType = type;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(CityName))
    {
      yield return ErrorCode.CityNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(Toponymy))
    {
      yield return ErrorCode.ToponymyIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(CountryISO))
    {
      yield return ErrorCode.CountryIsNotProvided.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(Numbering))
    {
      yield return ErrorCode.NumberingIsNotProvided.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(LocalPostCode))
    {
      yield return ErrorCode.LocalPostcodeIsNotProvided.ToValidationError();
    }
  }
}
