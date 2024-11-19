using System.Reflection;
using HotChocolate.Resolvers;
using HotChocolate.Types.Pagination;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.Services;

namespace RealGimm.Web.Prop.Pagination;

internal class ContractListPagingHandler : CursorPagingHandler
{
  private static readonly MethodInfo s_isTotalCountSelected = typeof(CursorPagingHandler)
    .Assembly
    .GetTypes()
    .Single(type => type.Name == "CursorPaginationResolverContextExtensions")!
    .GetMethod("IsTotalCountSelected", BindingFlags.Static | BindingFlags.Public)!;

  private readonly ContractListPagination _pagination;  

  public ContractListPagingHandler(PagingOptions options, IServiceProvider serviceProvider) : base(options)
  {
    _pagination = new(serviceProvider);
  }

  protected override async ValueTask<Connection> SliceAsync(
    IResolverContext context,
    object source,
    CursorPagingArguments arguments)
  {
    var query = (IQueryable<Contract>)source;

    int? totalCount = null;
    if (IncludeTotalCount && IsTotalCountSelected(context))
    {
      totalCount = query.Count();
    }

    return await _pagination
      .ApplyPaginationAsync(query, arguments, totalCount, context.RequestAborted)
      .ConfigureAwait(false);
  }

  private static bool IsTotalCountSelected(IResolverContext context)
    => (bool)s_isTotalCountSelected.Invoke(null, new[] { context })!;
}
