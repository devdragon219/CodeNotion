namespace RealGimm.Core.Asst.EstateAggregate.Models;

public record EstateOccupationStatisticsOutput(
  EstateOccupationMonthlyStatisticsOutput[] LastMonth,
  EstateOccupationYearlyStatisticsOutput[] LastYear,
  int? PercentageIncreaseComparedToLastYear,
  int? PercentageIncreaseComparedToTwoYears);
