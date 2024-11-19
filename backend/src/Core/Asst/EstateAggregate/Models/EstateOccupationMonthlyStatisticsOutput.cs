namespace RealGimm.Core.Asst.EstateAggregate.Models;

public record EstateOccupationMonthlyStatisticsOutput(
  DateOnly Date,
  int TotalOccupiedEstatesCount,
  int AverageTotalOccupiedEstatesCount);
