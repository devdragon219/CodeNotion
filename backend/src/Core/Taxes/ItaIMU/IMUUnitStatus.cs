namespace RealGimm.Core.Taxes.ItaIMU;

public record IMUUnitStatus(
  DateOnly FirstPaymentDate,
  /// <summary>
  /// If this is null, the second payment is not yet able to be calculated
  /// </summary>
  DateOnly? SecondPaymentDate,
  IMUUnitSemester FirstHalf,
  IMUUnitSemester? SecondHalf);
