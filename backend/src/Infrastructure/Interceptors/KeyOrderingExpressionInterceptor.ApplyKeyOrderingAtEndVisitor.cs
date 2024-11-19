using System.Linq.Expressions;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Interceptors;

public partial class KeyOrderingExpressionInterceptor
{
  private class ApplyKeyOrderingAtEndVisitor : ExpressionVisitor
  {
    private bool _isApplied = false;

    private ApplyKeyOrderingAtEndVisitor()
    {
    }

    public static bool TryApply(Expression expression, out Expression result)
    {
      var visitor = new ApplyKeyOrderingAtEndVisitor();
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

      Type? queryableInterface = null;

      if (node.Method.ReturnType.IsGenericType &&
        node.Method.ReturnType.GetGenericTypeDefinition() == typeof(IQueryable<>))
      {
        queryableInterface = node.Method.ReturnType;
      }
      else
      {
        queryableInterface = node.Method.ReturnType
          .GetInterfaces()
          .FirstOrDefault(@interface =>
            @interface.IsGenericType &&
            @interface.GetGenericTypeDefinition() == typeof(IQueryable<>));
      }

      if (queryableInterface is null)
      {
        return base.VisitMethodCall(node);
      }
      
      var sourceType = queryableInterface.GetGenericArguments().Single();
      if (ChekEntityIsIgnored(sourceType))
      {
        return base.VisitMethodCall(node);
      }

      var isOrderedQueryNode = node.Method.ReturnType.IsAssignableTo(
        typeof(IOrderedQueryable<>).MakeGenericType(sourceType));

      var parameterExpression = Expression.Parameter(sourceType);

      // .OrderBy(x => x.Id) or .ThenBy(x => x.Id)
      var newNode = Expression.Call(
        (isOrderedQueryNode ? _thenByMethod : _orderByMethod).MakeGenericMethod(sourceType, typeof(int)),
        node,
        Expression.Lambda(
          typeof(Func<,>).MakeGenericType(sourceType, typeof(int)),
          Expression.Property(parameterExpression, nameof(IIdentifiable.Id)),
          parameterExpression));

      _isApplied = true;

      return newNode;
    }
  }
}
