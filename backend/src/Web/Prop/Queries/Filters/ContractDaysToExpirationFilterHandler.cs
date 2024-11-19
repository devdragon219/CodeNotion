using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Data.Sorting;
using HotChocolate.Language.Visitors;
using HotChocolate.Language;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Web.Prop.Queries.Filters;

public class ContractDaysToExpirationFilterHandler : QueryableDefaultFieldHandler
{
  public override bool TryHandleEnter(
    QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    if (node.Value is not ObjectValueNode { Fields: IEnumerable<ObjectFieldNode> filterNodes })
    {
      throw new NotSupportedException();
    }

    var filters = filterNodes
      .Select(filterNode => new
      {
        Value = filterNode.Value switch
        {
          IntValueNode { Value: var daysToExpirationString } => int.Parse(daysToExpirationString),
          NullValueNode => (int?)null,

          _ => throw new NotSupportedException()
        },
        BinaryExpressionType = filterNode.Name.Value switch
        {
          "eq" => ExpressionType.Equal,
          "neq" => ExpressionType.NotEqual,
          "gt" => ExpressionType.GreaterThan,
          "gte" => ExpressionType.GreaterThanOrEqual,
          "lt" => ExpressionType.LessThan,
          "lte" => ExpressionType.LessThanOrEqual,
          _ => throw new NotSupportedException()
        }
      })
      .ToArray();

    var contractParameterExpression = Expression.Parameter(typeof(Contract));
    var predicateExpression = CreatePredicateExpression(filters[0].Value, filters[0].BinaryExpressionType, contractParameterExpression);

    foreach (var filter in filters.Skip(1))
    {
      predicateExpression = Expression.AndAlso(
        predicateExpression,
        CreatePredicateExpression(filter.Value, filter.BinaryExpressionType, contractParameterExpression));
    }

    var lambdaExpression = Expression.Lambda(predicateExpression, contractParameterExpression);
    var invokeExpression = Expression.Invoke(lambdaExpression, context.GetInstance());

    context.GetLevel().Enqueue(invokeExpression);

    action = SyntaxVisitor.SkipAndLeave;
    return true;
  }

  public override bool TryHandleLeave(
    QueryableFilterContext context,
    IFilterField field,
    ObjectFieldNode node,
    [NotNullWhen(true)] out ISyntaxVisitorAction? action)
  {
    action = SyntaxVisitor.Skip;
    return true;
  }

  private static Expression CreatePredicateExpression(
    int? daysToExpiration,
    ExpressionType binaryExpressionType,
    ParameterExpression contractParameterExpression)
  {
    // contract.SecondTermExpirationDate
    var expirationDateExpression = Expression.MakeMemberAccess(
      contractParameterExpression,
      typeof(Contract).GetProperty(nameof(Contract.SecondTermExpirationDate))!);

    if (!daysToExpiration.HasValue)
    {
      var nullDateExpression = Expression.Constant(null, typeof(DateOnly?));

      return Expression.MakeBinary(binaryExpressionType, expirationDateExpression, nullDateExpression);
    }

    // contract.SecondTermExpirationDate.Value
    var expirationDateValueExpression = Expression.MakeMemberAccess(
      expirationDateExpression,
      typeof(DateOnly?).GetProperty(nameof(Nullable<DateOnly>.Value))!);

    // contract.SecondTermExpirationDate.HasValue
    var expirationDateHasValueExpression = Expression.MakeMemberAccess(
      expirationDateExpression,
      typeof(DateOnly?).GetProperty(nameof(Nullable<DateOnly>.HasValue))!);

    // DateTime.UtcNow
    var dateTimeNowExpression = Expression.MakeMemberAccess(
      null,
      typeof(DateTime).GetProperty(nameof(DateTime.UtcNow))!);

    // DateOnly.FromDateTime(DateTime.UtcNow)
    var dateNowExpression = Expression.Call(
      typeof(DateOnly).GetMethod(nameof(DateOnly.FromDateTime))!,
      dateTimeNowExpression);

    // DateOnly.FromDateTime(DateTime.UtcNow).AddDays(daysToExpiration)
    var targetExpirationDateExrpression = Expression.Call(
      dateNowExpression,
      typeof(DateOnly).GetMethod(nameof(DateOnly.AddDays))!,
      Expression.Constant(daysToExpiration.Value));

    // contract.SecondTermExpirationDate.Value {comparison} DateOnly.FromDateTime(DateTime.UtcNow).AddDays(daysToExpiration)
    var comparingExpression = Expression.MakeBinary(
      binaryExpressionType,
      expirationDateValueExpression,
      targetExpirationDateExrpression);

    // contract.SecondTermExpirationDate.HasValue && contract.SecondTermExpirationDate.Value {comparison} DateOnly.FromDateTime(DateTime.UtcNow).AddDays(daysToExpiration)
    return Expression.AndAlso(expirationDateHasValueExpression, comparingExpression);
  }
}
