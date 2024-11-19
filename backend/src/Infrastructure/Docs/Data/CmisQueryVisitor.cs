using System.Linq.Expressions;
using System.Text;
using RealGimm.Infrastructure.Docs.Types;

namespace RealGimm.Infrastructure.Docs.Data;

public class CmisQueryVisitor : ExpressionVisitor
{
  public List<string> WhereExpressions { get; private set; } = new();
  public List<string> OrderByExpressions { get; private set; } = new();

  public string WhereExpression { get; private set; } = string.Empty;
  public string OrderByExpression { get; private set; } = string.Empty;
  
  private readonly CmisQueryClauseVisitor _cmisQueryClauseVisitor = new();
  private readonly Guid _tenantId;

  public CmisQueryVisitor(Guid tenantId)
  {
    _tenantId = tenantId;
  }

  public string ToSql(Expression expression)
  {
    WhereExpressions.Clear();
    OrderByExpressions.Clear();

    Visit(expression);

    var _sql = new StringBuilder();

    WhereExpressions.Add(CmisTypes.RG_TENANT_ID + $" = '{_tenantId}'");

    if (WhereExpressions.Any())
    {
      WhereExpressions.Reverse();
      _sql.Append("WHERE ");
      WhereExpression = string.Join(" AND ", WhereExpressions);
      _sql.Append(WhereExpression);
    }

    if (OrderByExpressions.Any())
    {
      OrderByExpressions.Reverse();
      if (_sql.Length > 0)
      {
        _sql.Append(" ");
      }

      _sql.Append("ORDER BY ");
      OrderByExpression = string.Join(", ", OrderByExpressions);
      _sql.Append(OrderByExpression);
    }
    return _sql.ToString();
  }

  protected override Expression VisitMethodCall(MethodCallExpression node)
  {
    if (node.Method.DeclaringType == typeof(Queryable) && node.Method.Name == nameof(Queryable.Where))
    {
      WhereExpressions.Add(_cmisQueryClauseVisitor.ToSql(node.Arguments[1]));
    }
    else if (node.Method.DeclaringType == typeof(Queryable)
      && (node.Method.Name == nameof(Queryable.OrderBy)
        || node.Method.Name == nameof(Queryable.ThenBy)))
    {
      OrderByExpressions.Add(_cmisQueryClauseVisitor.ToSql(node.Arguments[1]) + " ASC");
    }
    else if (node.Method.DeclaringType == typeof(Queryable)
      && (node.Method.Name == nameof(Queryable.OrderByDescending)
        || node.Method.Name == nameof(Queryable.ThenByDescending)))
    {
      OrderByExpressions.Add(_cmisQueryClauseVisitor.ToSql(node.Arguments[1]) + " DESC");
    }

    return base.VisitMethodCall(node);
  }
}
