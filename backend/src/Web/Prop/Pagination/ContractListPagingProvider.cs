using HotChocolate.Internal;
using HotChocolate.Types.Pagination;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.Services;

namespace RealGimm.Web.Prop.Pagination;

internal class ContractListPagingProvider : CursorPagingProvider
{
  private readonly IServiceProvider _serviceProvider;

  public ContractListPagingProvider(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  public override bool CanHandle(IExtendedType source)
    => source.IsArrayOrList &&
      source.TypeArguments.Count == 1 &&
      source.TypeArguments.Single().Type == typeof(Contract);

  protected override CursorPagingHandler CreateHandler(IExtendedType source, PagingOptions options)
    => new ContractListPagingHandler(options, _serviceProvider);
}
