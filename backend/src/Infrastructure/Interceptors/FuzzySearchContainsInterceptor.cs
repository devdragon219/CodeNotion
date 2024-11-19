using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Infrastructure.Interceptors;

public class FuzzySearchContainsInterceptor : IQueryExpressionInterceptor
{
  public Expression QueryCompilationStarting(Expression queryExpression,
      QueryExpressionEventData eventData)
  {
    return new FuzzySearchContainsVisitor().Visit(queryExpression);
  }

  private class FuzzySearchContainsVisitor : ExpressionVisitor
  {
    private static readonly MethodInfo _unaccent =
        typeof(TrackableDbContext).GetMethod(
            nameof(TrackableDbContext.Unaccent),
            new[] { typeof(string) })!;

    private static readonly MethodInfo _concat =
        typeof(string).GetMethod(
            nameof(string.Concat),
            new[] { typeof(string), typeof(string) })!;

    private static readonly MethodInfo _ilike =
        typeof(NpgsqlDbFunctionsExtensions).GetMethod(
            nameof(NpgsqlDbFunctionsExtensions.ILike),
            new[] { typeof(DbFunctions), typeof(string), typeof(string) })!;

    private static readonly Expression _efFunctions =
        Expression.Constant(EF.Functions);

    private static readonly Expression _percent =
        Expression.Constant("%");

    private static readonly Expression _empty =
            Expression.Constant(string.Empty);

    protected override Expression VisitMethodCall(MethodCallExpression? methodCallExpression)
    {
      var methodInfo = methodCallExpression!.Method;
      if (methodInfo.DeclaringType == typeof(string)
          && (methodInfo.Name == nameof(string.Contains) || methodInfo.Name == nameof(string.StartsWith))
          && methodInfo.GetParameters().Length == 1
          && methodCallExpression.Object != null
          && methodCallExpression.Object.NodeType == ExpressionType.MemberAccess)
      {
        (Expression before, Expression after) wildCards = methodInfo.Name switch
        {
          nameof(string.Contains) => (_percent, _percent),
          nameof(string.StartsWith) => (_empty, _percent),
          _ => (_empty, _empty),
        };

        if (methodCallExpression.Object is MemberExpression memberExpression
            && memberExpression.Member.IsDefined(typeof(FuzzySearchableAttribute), true))
        {
          var unaccentColumn = Expression.Call(null,
              _unaccent,
              memberExpression);

          var unaccentQuery = Expression.Call(null,
              _unaccent,
              Expression.Call(
                  null,
                  _concat,
                  Expression.Call(
                      null,
                      _concat,
                      wildCards.before,
                      methodCallExpression.Arguments[0]),
                  wildCards.after)
              );

          var matchesCall = Expression.Call(null,
              _ilike,
              _efFunctions,
              unaccentColumn,
              unaccentQuery);

          return matchesCall;
        }
      }

      return base.VisitMethodCall(methodCallExpression);
    }
  }
}
