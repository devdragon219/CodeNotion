using HotChocolate.Resolvers;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Web.Docs.Queries.Filters;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Docs.Extensions;

internal static class EnumerableExtensions
{
  public static IEnumerable<T> FilterPatched<T>(
    this IEnumerable<T> source,
    IResolverContext resolverContext,
    IRepository<Document> documentRepository)
  {
    ArgumentNullException.ThrowIfNull(source);

    var filterExpression = resolverContext.GetFilterExpression<T>();
    if (filterExpression is null)
    {
      return source;
    }

    var patchedFilterExpression = PatchDocumentFiltersVisitor.Patch(filterExpression, documentRepository);

    return source.Where(patchedFilterExpression.Compile());
  }
}
