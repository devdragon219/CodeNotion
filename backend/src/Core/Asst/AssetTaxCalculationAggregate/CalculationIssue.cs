namespace RealGimm.Core.Asst.AssetTaxCalculationAggregate;

public enum CalculationIssue
{
  MissingOrZeroRate,
  MissingOrInvalidOwnershipDates,
  MissingCadastralCategory,
  MissingCadastralIncomeData,
}
