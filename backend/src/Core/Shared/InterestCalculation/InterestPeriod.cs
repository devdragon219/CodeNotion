namespace RealGimm.Core.Shared.InterestCalculation;

public record InterestPeriod(
  DateOnly Start,
  DateOnly End,
  decimal OriginalAmount,
  decimal InterestAmount,
  decimal AppliedRate);