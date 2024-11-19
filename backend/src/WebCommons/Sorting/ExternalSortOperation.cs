using System.Linq.Expressions;
using HotChocolate.Data.Sorting.Expressions;

namespace RealGimm.WebCommons.Sorting;

public class ExternalSortOperation : QueryableSortOperation
{
  private readonly bool _isAscending;

  public ExternalSortOperation(bool isAscendingOrdering, Expression selector, ParameterExpression parameter)
    : base(selector, parameter)
  {
    _isAscending = isAscendingOrdering;
  }

  public override Expression CompileOrderBy(Expression expression)
  {
    // Get the OrderBy method
    var orderByMethod = typeof(Queryable)
      .GetMethods()
      .First(method => 
        method.Name == (_isAscending ? nameof(Queryable.OrderBy) : nameof(Queryable.OrderByDescending)) &&
        method.GetParameters().Length == 2)
      .MakeGenericMethod(ParameterExpression.Type, typeof(int));

    // Create the OrderBy expression
    var orderByExpression = Expression.Call(
      null,
      orderByMethod,
      [expression, Expression.Lambda(Selector, ParameterExpression)]);

    return orderByExpression;
  }

  public override Expression CompileThenBy(Expression expression)
  {
    // Get the ThenBy method
    var thenByMethod = typeof(Queryable)
        .GetMethods()
      .First(method =>
        method.Name == (_isAscending ? nameof(Queryable.ThenBy) : nameof(Queryable.ThenByDescending)) &&
        method.GetParameters().Length == 2)
      .MakeGenericMethod(ParameterExpression.Type, typeof(int));

    // Create the ThenBy expression
    var thenByExpression = Expression.Call(
      null,
      thenByMethod,
      [expression, Expression.Lambda(Selector, ParameterExpression)]);

    return thenByExpression;
  }
}
