using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Anag.SubjectAggregate;

public class Address : EntityBase, IAddress
{
  [GraphQLIgnore]
  public int SubjectId { get; private set; }
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
  [MaxLength(StrFieldSizes.NUMBERING_OR_POSTCODE)]
  public string? LocalPostCode { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;

  public void SetCreationDate(DateTime newCreationDate) => CreationDate = newCreationDate;

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
  public void SetNumbering(string? newNumbering) => Numbering = newNumbering;

  public void SetCity(string? cityName, Guid? cityReference)
  {
    CityName = cityName;
    CityReference = cityReference;
  }

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

    if (string.IsNullOrWhiteSpace(LocalPostCode))
    {
      yield return ErrorCode.LocalPostCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
