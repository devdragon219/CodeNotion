using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class CadastralExpensesMapper : IMapper<CadastralExpensesInput, CadastralExpenses>
{
  public Task<CadastralExpenses?> MapAsync(
    CadastralExpensesInput? from,
    CadastralExpenses? into,
    CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static CadastralExpenses? Map(CadastralExpensesInput? from, CadastralExpenses? into)
  {
    if (from is null)
    {
      return null;
    }

    var expense = into ?? new CadastralExpenses();
    expense.Id = from.Id.GetValueOrDefault();

    expense.SetExpenseType(from.ExpenseType);
    expense.SetReferenceYear(from.ReferenceYear);
    expense.SetFiscalYear(from.FiscalYear);
    expense.SetAmount(from.Amount);
    expense.SetRevaluationFactor(from.RevaluationFactor);

    return expense;
  }
}
