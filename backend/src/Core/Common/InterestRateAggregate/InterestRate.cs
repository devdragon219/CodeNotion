using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common.InterestRateAggregate;

public class InterestRate : EntityBase, IAggregateRoot, IDateOnlyRanged
{
  public decimal Rate { get; private set; }
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }
  [MaxLength(StrFieldSizes.ISO_COUNTRY), Required]
  public string CountryISO3 { get; private set; } = default!;

  public void SetRate(decimal rate) => Rate = rate;

  public void SetDates(DateOnly? since, DateOnly? until)
  {
    Since = since;
    Until = until;
  }

  public void SetCountry(string countryIso3) => CountryISO3 = countryIso3;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Since == Until)
    {
      yield return ErrorCode.InterestRateDatesMustBeDifferent.ToValidationError();
    }

    if (Since > Until)
    {
      yield return ErrorCode.InterestRateUntilMustBeGreaterThanSince.ToValidationError();
    }
  }
}
