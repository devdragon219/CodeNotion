using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel;

namespace RealGimm.Infrastructure.Interceptors;

public partial class KeyOrderingExpressionInterceptor
{
  private class CheckOrderingSkipedVisitor : ExpressionVisitor
  {
    private bool _isOrderingSkiped = false;
    private CheckOrderingSkipedVisitor()
    {
    }

    public static bool Check(Expression expression)
    {
      var visitor = new CheckOrderingSkipedVisitor()
      {
        _isOrderingSkiped = false
      };

      visitor.Visit(expression);

      return visitor._isOrderingSkiped;
    }

    protected override Expression VisitLambda<T>(Expression<T> node)
    {
      // avoiding processing the lambda expression
      return node;
    }

    protected override Expression VisitMethodCall(MethodCallExpression node)
    {
      if (_isOrderingSkiped)
      {
        return node;
      }

      if (node.Method.DeclaringType == typeof(EntityFrameworkQueryableExtensions) &&
        node.Method.Name == nameof(EntityFrameworkQueryableExtensions.TagWith) &&
        node.Arguments[1] is ConstantExpression constant &&
        (string?)constant.Value == Constants.SKIP_DEFAULT_ORDERING)
      {
        _isOrderingSkiped = true;
        return node;
      }

      return base.VisitMethodCall(node);
    }
  }
}
