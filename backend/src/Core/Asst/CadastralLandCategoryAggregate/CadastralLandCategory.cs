using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using Elders.Iso3166;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.CadastralLandCategoryAggregate;
public class CadastralLandCategory : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string Description { get; private set; } = default!;

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.ISO_COUNTRY)]
  public string CountryISO { get; private set; } = default!;
  public int Ordering { get; private set; }

  public void SetData(string description, string internalCode, string countryISO, int ordering)
  {
    Description = description;
    InternalCode = internalCode;
    CountryISO = countryISO;
    Ordering = ordering;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    var countries = Country.GetAllCountries().Select(e => e.ThreeLetterCode);
    if (!countries.Contains(CountryISO, StringComparer.OrdinalIgnoreCase))
    {
      yield return ErrorCode.CadastralLandCategoryInvalidCountryISO.ToValidationError();
    }
  }
}
