using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record CadastralExpensesInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public CadastralExpenseType ExpenseType { get; init; }
  public int ReferenceYear { get; init; }
  public int? FiscalYear { get; init; }
  public decimal? Amount { get; init; }
  public double? RevaluationFactor { get; init; }
}
