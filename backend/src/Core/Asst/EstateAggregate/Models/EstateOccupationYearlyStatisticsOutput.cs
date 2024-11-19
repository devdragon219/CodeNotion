namespace RealGimm.Core.Asst.EstateAggregate.Models;

public record EstateOccupationYearlyStatisticsOutput(
  int Month,
  int TotalOccupiedEstatesCount,
  int AverageTotalOccupiedEstatesCount);
