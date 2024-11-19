using System.Linq.Expressions;
using HotChocolate.Data.Filters;
using HotChocolate.Resolvers;

namespace RealGimm.WebCommons.Extensions;

public static class ResolverContextExtensions
{
  public static Expression<Func<T, bool>>? GetFilterExpression<T>(this IResolverContext resolverContext)
  {
    ArgumentNullException.ThrowIfNull(resolverContext);

    var filterContext = resolverContext.GetFilterContext()!;
    if (filterContext is null)
    {
      throw new ArgumentException("Filtering is not supported for this field.", nameof(resolverContext));
    }

    filterContext.Handled(false);

    var filteredFakeQuery = Enumerable.Empty<T>().AsQueryable().Filter(resolverContext);
    if (filteredFakeQuery.Expression is not MethodCallExpression { Method: { Name: nameof(Queryable.Where) } } whereExpression)
    {
      return null;
    }

    var quoteExpression = (UnaryExpression)whereExpression.Arguments[1];
    var predicateExpression = (Expression<Func<T, bool>>)quoteExpression.Operand;

    return predicateExpression;
  }
}
