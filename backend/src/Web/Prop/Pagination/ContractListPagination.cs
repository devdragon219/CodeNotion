using Ardalis.Specification;
using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Models;
using RealGimm.Core.Prop.Services;

namespace RealGimm.Web.Prop.Pagination;

internal class ContractListPagination : CursorPaginationAlgorithm<IQueryable<Contract>, ContractListOutput>
{
  private readonly IServiceProvider _serviceProvider;

  public ContractListPagination(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  protected override IQueryable<Contract> ApplySkip(IQueryable<Contract> query, int skip)
    => query.Skip(skip);

  protected override IQueryable<Contract> ApplyTake(IQueryable<Contract> query, int take)
    => query.Take(take);

  protected override async ValueTask<int> CountAsync(IQueryable<Contract> query, CancellationToken cancellationToken)
    => await query.CountAsync(cancellationToken);

  protected override async ValueTask<IReadOnlyList<Edge<ContractListOutput>>> ExecuteAsync(
    IQueryable<Contract> query,
    int offset,
    CancellationToken cancellationToken)
  {
    await using var scope = _serviceProvider.CreateAsyncScope();
    var contractService = scope.ServiceProvider.GetRequiredService<ContractService>();

    var list = new List<IndexEdge<ContractListOutput>>();
    var index = offset;

    await foreach (var item in contractService.ToAsyncEnumerable(query, cancellationToken))
    {
      list.Add(IndexEdge<ContractListOutput>.Create(item, index++));
    }

    return list;
  }
}
