using System.Linq.Expressions;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Interceptors;

public partial class KeyOrderingExpressionInterceptor
{
  private class ApplyKeyOrderingAfterLastOrderingVisitor : ExpressionVisitor
  {
    private bool _isApplied = false;

    private ApplyKeyOrderingAfterLastOrderingVisitor()
    {
    }

    public static bool TryApply(Expression expression, out Expression result)
    {
      var visitor = new ApplyKeyOrderingAfterLastOrderingVisitor();
      result = visitor.Visit(expression);
      
      return visitor._isApplied;
    }

    protected override Expression VisitLambda<T>(Expression<T> node)
    {
      // avoiding processing the lambda expression
      return node;
    }

    protected override Expression VisitMethodCall(MethodCallExpression node)
    {
      if (_isApplied)
      {
        return node;
      }

      if (node.Method.DeclaringType == typeof(Queryable) &&
          node.Method.Name is
            nameof(Queryable.OrderBy) or
            nameof(Queryable.OrderByDescending) or
            nameof(Queryable.ThenBy) or
            nameof(Queryable.ThenByDescending))
      {
        var sourceType = node.Type.GetGenericArguments()[0];
        if (ChekEntityIsIgnored(sourceType))
        {
          return base.VisitMethodCall(node);
        }

        var parameterExpression = Expression.Parameter(sourceType);

        // .ThenBy(x => x.Id)
        var newNode = Expression.Call(
          _thenByMethod.MakeGenericMethod(sourceType, typeof(int)),
          node,
          Expression.Lambda(
            typeof(Func<,>).MakeGenericType(sourceType, typeof(int)),
            Expression.Property(parameterExpression, nameof(IIdentifiable.Id)),
            parameterExpression));
        
        _isApplied = true;

        return newNode;
      }

      return base.VisitMethodCall(node);
    }
  }
}
