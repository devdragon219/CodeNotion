using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.CadastralUnitAggregate;

public class CadastralExpenses : EntityBase
{
  [GraphQLIgnore]
  public CadastralUnit CadastralUnit { get; private set; } = default!;

  public CadastralExpenseType ExpenseType { get; private set; }
  public int ReferenceYear { get; private set; }
  public int? FiscalYear { get; private set; }
  public decimal? Amount { get; private set; }
  public double? RevaluationFactor { get; private set; }

  public void SetReferenceYear(int referenceYear) => ReferenceYear = referenceYear;
  
  public void SetExpenseType(CadastralExpenseType expenseType) => ExpenseType = expenseType;
  
  public void SetAmount(decimal? amount) => Amount = amount;

  public void SetFiscalYear(int? fiscalYear) => FiscalYear = fiscalYear;

  public void SetRevaluationFactor(double? revaluationFactor) => RevaluationFactor = revaluationFactor;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (ReferenceYear is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CadastralExpensesInvalidReferenceYear.ToValidationError();
    }

    if (FiscalYear.HasValue && FiscalYear is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CadastralExpensesInvalidFiscalYear.ToValidationError();
    }

    if (Amount.HasValue && Amount <= 0)
    {
      yield return ErrorCode.CadastralExpensesAmountLessOrEqualZero.ToValidationError();
    }

    if (RevaluationFactor.HasValue && RevaluationFactor <= 0)
    {
      yield return ErrorCode.CadastralExpensesRevaluationFactorLessOrEqualZero.ToValidationError();
    }
  }
}
