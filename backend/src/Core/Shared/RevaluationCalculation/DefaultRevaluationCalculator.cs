using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.RevaluationDataAggregate;

namespace RealGimm.Core.Shared.RevaluationCalculation;

public class DefaultRevaluationCalculator : IRevaluationCalculator
{
  public required IReadRepository<RevaluationData> RevaluationData { private get; init; }

  public async Task<RevaluationStep[]> CalculateRevaluations(
    Dictionary<DateOnly, decimal> baseAmounts,
    DateOnly startDate,
    DateOnly endDate,
    decimal incrementFactor,
    bool useRoundedPercent,
    int periodDurationMonths,
    string countryIso3)
  {
    if (incrementFactor > 5)
    {
      throw new ArgumentOutOfRangeException($"{nameof(incrementFactor)}", "The value must be a normalized factor (no more than 5.0x)");
    }

    if (periodDurationMonths < 1 || periodDurationMonths > 50)
    {
      throw new ArgumentOutOfRangeException($"{nameof(periodDurationMonths)}", "The value must be a positive number, less than 50");
    }

    if (!baseAmounts.Any())
    {
      throw new ArgumentException("There must be at least one base amount", $"{nameof(baseAmounts)}");
    }

    var baseAmountStartDate = baseAmounts.Keys.Min();
    var periodStartDate = startDate.AddMonths(-periodDurationMonths);

    //If we have the contract begin on 1/1/2001, but the period starts on 1/1/2005
    // with 12 month periodicity, we will apply the first revaluation
    // on 1/1/2005 bringing the amount up with revaluation from 1/1/2004 -> 1/1/2005

    //If instead both dates have the same value, or the dates are not far apart
    // enough (e.g. contract begin 31/8/2001, period start 1/1/2002, 12 month)
    // we will have to have the first revaluation at 1/1/2003, with rate
    // from 1/1/2002 -> 1/1/2003
    var dateStart = baseAmountStartDate > periodStartDate
      ? baseAmountStartDate
      : periodStartDate;

    //Due to the reasoning above, if there is less than periodDurationMonths
    // between dateStart and startDate, align (move forward) the dateStart
    // to startDate
    if (dateStart < startDate
      && dateStart.AddMonths(periodDurationMonths) > startDate)
    {
      //Align dateStart
      dateStart = startDate;
    }

    //dateEnd is also the calculation date for the revaluation
    var dateEnd = dateStart.AddMonths(periodDurationMonths);

    //If we don't have enough data, just error out.
    if (!baseAmounts.Any(kvp => kvp.Key < dateEnd))
    {
      throw new InvalidOperationException("Unable to calculate revaluations without a base amount.");
    }

    var revaluationSteps = new List<RevaluationStep>();

    //Then cycle to the end
    while (dateEnd <= endDate)
    {
      decimal rawRevalDate;

      try
      {
        rawRevalDate = await GetRevaluationRate(countryIso3, dateStart, dateEnd, useRoundedPercent);
      }
      catch (InvalidOperationException ex)
      {
        throw new InvalidOperationException($"Unable to get revaluation rate between {dateStart} and {dateEnd} for {countryIso3}.", ex);
      }

      //Get the base amount that was valid at the dateEnd
      var baseAmount = baseAmounts
        .Where(kvp => kvp.Key <= dateEnd)
        .OrderBy(kvp => kvp.Key)
        .LastOrDefault()
        .Value;

      var calculatedAmount = baseAmount * incrementFactor * (rawRevalDate - 1.0M);

      revaluationSteps.Add(new RevaluationStep(dateEnd,
        baseAmount,
        rawRevalDate,
        calculatedAmount));

      dateStart = dateStart.AddMonths(periodDurationMonths);
      dateEnd = dateEnd.AddMonths(periodDurationMonths);
    }

    return revaluationSteps.ToArray();
  }

  /// <summary>
  /// This handles the raw rate between two dates. It also handles base changes and per-country specifics.
  /// </summary>
  private async Task<decimal> GetRevaluationRate(string countryIso3,
    DateOnly start,
    DateOnly end,
    bool useRoundedPercent)
  {
    var startYear = start.Year;
    var endYear = end.Year;

    var applicableIndices = await RevaluationData
      .AsQueryable()
      .Where(rd => rd.CountryISO3 == countryIso3
        && rd.Year >= startYear
        && rd.Year <= endYear)
      .ToListAsync();

    var startRate = applicableIndices
      .First(rd => rd.Year == startYear && rd.Month == start.Month);

    var endRate = applicableIndices
      .First(rd => rd.Year == endYear && rd.Month == end.Month);

    //Get all base changes (all base years, skipping the first)
    // if the base year does not change, this list is empty
    var changes = applicableIndices
      .Select(rd => rd.BaseYear)
      .Distinct()
      .OrderBy(k => k)
      .Skip(1)
      .ToList();

    //Get all coefficients
    var coefficients = changes
      .Select(newBase => Math.Round(applicableIndices
        .Where(rd => rd.Year == newBase)
        .Select(rd => rd.RevaluationIndex)
        .Average() / 100M,
        3,
        MidpointRounding.AwayFromZero));

    //Special fixes by country
    if (countryIso3 == CountryISO3.ITA)
    {
      var cutoffFOITabacchi = new DateOnly(1992, 2, 1);
      if (start < cutoffFOITabacchi && end > cutoffFOITabacchi)
      {
        coefficients = coefficients.Concat(new[] { 1.0009M });
      }
    }

    //Multiply all together
    decimal result = endRate.RevaluationIndex / startRate.RevaluationIndex;

    foreach (var coeff in coefficients)
    {
      result *= coeff;
    }

    if (useRoundedPercent)
    {
      result = (Math.Round(result * 100M - 100M, 1, MidpointRounding.AwayFromZero) + 100M) / 100M;
    }

    return Math.Round(result, 3, MidpointRounding.AwayFromZero);
  }
}
