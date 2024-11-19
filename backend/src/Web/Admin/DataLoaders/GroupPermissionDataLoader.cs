using RealGimm.Core.IAM.GroupAggregate;
using GreenDonut;
using Ardalis.Specification;
using RealGimm.Core.IAM.Services;

namespace RealGimm.Web.Admin.DataLoaders;

public class GroupPermissionDataLoader : GroupedDataLoader<int, PermissionSummary>
{
  private readonly IServiceProvider _serviceProvider;

  public GroupPermissionDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(batchScheduler, options)
  {
    _serviceProvider = serviceProvider;
  }

  protected override async Task<ILookup<int, PermissionSummary>> LoadGroupedBatchAsync(
    IReadOnlyList<int> keys,
    CancellationToken cancellationToken)
  {
    var tasks = keys
      .Select(id => Task.Run(async () =>
      {
        await using var scope = _serviceProvider.CreateAsyncScope();
        var permService = scope.ServiceProvider.GetRequiredService<GroupPermissionService>();

        return new
        {
          Id = id,
          PermGroups = await permService.GetPermissionSummaryAsync(
            new[] { id },
            cancellationToken)
        };
      }))
      .ToList();

    var results = await Task.WhenAll(tasks);


    return results
      .SelectMany(r => r.PermGroups.Select(pg => new { r.Id, PermGroup = pg }))
      .ToLookup(pair => pair.Id, pair => pair.PermGroup);
  }
}
