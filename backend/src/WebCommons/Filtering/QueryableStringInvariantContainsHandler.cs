using System.Linq.Expressions;
using System.Reflection;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;
using HotChocolate.Language;

namespace RealGimm.WebCommons.Filtering;

public class QueryableStringInvariantContainsHandler : QueryableStringOperationHandler
{
  //Reimplemented from https://chillicream.com/docs/hotchocolate/v13/api-reference/extending-filtering
  public QueryableStringInvariantContainsHandler(InputParser inputParser) : base(inputParser)
  {
  }

  // For creating a expression tree we need the `MethodInfo` of the `ToLower` method of string
  private static readonly MethodInfo _toLower = typeof(string)
      .GetMethods()
      .Single(
          x => x.Name == nameof(string.ToLower) &&
          x.GetParameters().Length == 0);

  private static readonly MethodInfo _contains =
          typeof(string).GetMethod(
              nameof(string.Contains),
              new[] { typeof(string) })!;

  // This is used to match the handler to all `eq` fields
  protected override int Operation => DefaultFilterOperations.Contains;

  public override Expression HandleOperation(
      QueryableFilterContext context,
      IFilterOperationField field,
      IValueNode value,
      object? parsedValue)
  {
    // We get the instance of the context. This is the expression path to the propert
    // e.g. ~> y.Street
    Expression property = context.GetInstance();

    // the parsed value is what was specified in the query
    // e.g. ~> eq: "221B Baker Street"
    if (parsedValue is string str)
    {
      // Creates and returnes the operation
      // e.g. ~> "221b baker street".Contains(y.Street.ToLower())
      
      return
        Expression.Condition(
          Expression.Equal(property, Expression.Constant(null)),
          Expression.Constant(false),
          Expression.Call(
            Expression.Call(property, _toLower),
            _contains,
            Expression.Constant(str.ToLower())
            )
        );
    }

    throw new InvalidOperationException();
  }
}