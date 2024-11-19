namespace RealGimm.Core.Taxes.ItaILIA;

public record ILIAUnitStatus(
  DateOnly FirstPaymentDate,
  /// <summary>
  /// If this is null, the second payment is not yet able to be calculated
  /// </summary>
  DateOnly? SecondPaymentDate,
  ILIAUnitSemester FirstHalf,
  ILIAUnitSemester? SecondHalf);
