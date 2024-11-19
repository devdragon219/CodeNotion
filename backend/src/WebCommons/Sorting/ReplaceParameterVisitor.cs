using System.Linq.Expressions;

namespace RealGimm.WebCommons.Sorting;

public class ReplaceParameterVisitor : ExpressionVisitor
{
  private readonly ParameterExpression _oldParam;
  private readonly Expression _newParam;

  private ReplaceParameterVisitor(ParameterExpression oldParam, Expression newParam)
  {
    _oldParam = oldParam;
    _newParam = newParam;
  }

  public static Expression Replace(Expression expression, ParameterExpression oldParam, Expression newParam)
    => new ReplaceParameterVisitor(oldParam, newParam).Visit(expression);

  protected override Expression VisitParameter(ParameterExpression node)
    => (node == _oldParam) ? _newParam : base.VisitParameter(node);
}
