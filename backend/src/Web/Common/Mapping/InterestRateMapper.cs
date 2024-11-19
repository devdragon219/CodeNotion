using RealGimm.Core;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mapping;

public sealed class InterestRateMapper : IMapper<InterestRateInput, InterestRate>
{
  public InterestRate? Map(InterestRateInput? from, InterestRate? into)
  {
    if (from is null)
    {
      return null;
    }

    var interestRate = into ?? new InterestRate();
    interestRate.SetRate(from.Rate);
    interestRate.SetCountry(CountryISO3.ITA);
    interestRate.SetDates(from.Since, from.Until);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      interestRate.Id = from.Id!.Value;
    }

    return interestRate;
  }

  Task<InterestRate?> IMapper<InterestRateInput, InterestRate>.MapAsync(
    InterestRateInput? from,
    InterestRate? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
