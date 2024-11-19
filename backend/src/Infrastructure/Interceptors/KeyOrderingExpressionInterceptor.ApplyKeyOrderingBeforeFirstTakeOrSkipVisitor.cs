using System.Linq.Expressions;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Interceptors;

public partial class KeyOrderingExpressionInterceptor
{
  private class ApplyKeyOrderingBeforeFirstTakeOrSkipVisitor : ExpressionVisitor
  {
    private bool _isApplied = false;

    private ApplyKeyOrderingBeforeFirstTakeOrSkipVisitor()
    {
    }

    public static bool TryApply(Expression expression, out Expression result)
    {
      var visitor = new ApplyKeyOrderingBeforeFirstTakeOrSkipVisitor();
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
            nameof(Queryable.Take) or
            nameof(Queryable.TakeLast) or
            nameof(Queryable.TakeWhile) or
            nameof(Queryable.Skip) or
            nameof(Queryable.SkipLast) or
            nameof(Queryable.SkipWhile))
      {
        var sourceType = node.Type.GetGenericArguments()[0];
        if (ChekEntityIsIgnored(sourceType))
        {
          return base.VisitMethodCall(node);
        }

        // visiting child nodes in order to find & process previous Take or Skip node if it exists
        var newNode = base.VisitMethodCall(node);
        if (_isApplied)
        {
          return newNode;
        }

        var queryParameterExpression = node.Arguments[0];

        var isOrderedQueryParameter = queryParameterExpression.Type.IsAssignableTo(
          typeof(IOrderedQueryable<>).MakeGenericType(sourceType));

        var parameterExpression = Expression.Parameter(sourceType);

        // .OrderBy(x => x.Id) or .ThenBy(x => x.Id)
        var orderByOrThenByMethod = Expression.Call(
          (isOrderedQueryParameter ? _thenByMethod : _orderByMethod).MakeGenericMethod(sourceType, typeof(int)),
          queryParameterExpression,
          Expression.Lambda(
            typeof(Func<,>).MakeGenericType(sourceType, typeof(int)),
            Expression.Property(parameterExpression, nameof(IIdentifiable.Id)),
            parameterExpression));

        newNode = node.Update(node.Object, node.Arguments.Skip(1).Prepend(orderByOrThenByMethod));

        _isApplied = true;

        return newNode;
      }

      return base.VisitMethodCall(node);
    }
  }
}
