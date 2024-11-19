using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Interceptors;

public partial class KeyOrderingExpressionInterceptor : IQueryExpressionInterceptor
{
  private static readonly MethodInfo _orderByMethod = typeof(Queryable)
    .GetMethods()
    .First(method => method.Name == nameof(Queryable.OrderBy) && method.GetParameters().Length == 2);

  private static readonly MethodInfo _thenByMethod = typeof(Queryable)
    .GetMethods()
    .First(method => method.Name == nameof(Queryable.ThenBy) && method.GetParameters().Length == 2);

  // list of entities which implement IIdentifiable, but Id property is not mapped
  private static readonly Type[] _entitiesToIgnore = [typeof(EstateUnitFloor)];

  public Expression QueryCompilationStarting(Expression queryExpression, QueryExpressionEventData eventData)
  {
    if (CheckOrderingSkipedVisitor.Check(queryExpression))
    {
      return queryExpression;
    }

    if (ApplyKeyOrderingAfterLastOrderingVisitor.TryApply(queryExpression, out var newExpression))
    {
      return newExpression;
    }
    
    if (ApplyKeyOrderingBeforeFirstTakeOrSkipVisitor.TryApply(queryExpression, out newExpression))
    {
      return newExpression;
    }
    
    if (ApplyKeyOrderingAtEndVisitor.TryApply(queryExpression, out newExpression))
    {
      return newExpression;
    }

    return queryExpression;
  }

  private static bool ChekEntityIsIgnored(Type entityType)
    => !typeof(IIdentifiable).IsAssignableFrom(entityType) || _entitiesToIgnore.Contains(entityType);
}
