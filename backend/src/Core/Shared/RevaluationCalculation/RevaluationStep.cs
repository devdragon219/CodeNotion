namespace RealGimm.Core.Shared.RevaluationCalculation;

public record RevaluationStep(DateOnly ReferenceDate, decimal ReferenceAmount, decimal AppliedRate, decimal CalculatedAmount);
