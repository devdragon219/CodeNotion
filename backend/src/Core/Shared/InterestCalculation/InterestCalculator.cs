using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Common.InterestRateAggregate.Specification;

namespace RealGimm.Core.Shared.InterestCalculation;

public class InterestCalculator
{
  public required IReadRepository<InterestRate> InterestRates { private get; init; }

  public async Task<InterestPeriod[]> CalculateInterests(decimal baseAmount,
    DateOnly startDate,
    DateOnly endDate,
    string countryIso3)
  {
    var applicableRates = await InterestRates.AsQueryable(
      new InterestRateByCountrySpec(countryIso3))
      .Where(ir => ir.Since.HasValue
        && ir.Since.Value < endDate
        && (!ir.Until.HasValue || ir.Until.Value > startDate))
      .OrderBy(ir => ir.Since)
      .ToListAsync();

    return applicableRates
      .Select(ir =>
      {
        var maxStart = ir.Since!.Value > startDate ? ir.Since!.Value : startDate;
        var minEnd = ir.Until.HasValue && ir.Until.Value < endDate ? ir.Until.Value : endDate;

        var daysOverlap = minEnd.DayNumber - maxStart.DayNumber;

        //This rounding might be sound only for EUR values
        var amount = Math.Round(baseAmount * daysOverlap * ir.Rate / 36500, 2, MidpointRounding.AwayFromZero);

        return new InterestPeriod(maxStart,
          minEnd,
          baseAmount,
          amount,
          ir.Rate);
      })
      .ToArray();
  }
}
