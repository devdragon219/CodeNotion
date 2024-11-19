using GreenDonut;
using Ardalis.Specification;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Web.Asst.DataLoaders;

public class EstateUnitSurfacesDataLoader : GroupedDataLoader<int, EstateUnitSurfaceSummary>
{

  private readonly IServiceProvider _serviceProvider;

  public EstateUnitSurfacesDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(batchScheduler, options)
  {
    _serviceProvider = serviceProvider;
  }

  protected override async Task<ILookup<int, EstateUnitSurfaceSummary>> LoadGroupedBatchAsync(
    IReadOnlyList<int> keys,
    CancellationToken cancellationToken)
  {
    var tasks = keys
      .Select(id => Task.Run(async () =>
      {
        await using var scope = _serviceProvider.CreateAsyncScope();
        var euService = scope.ServiceProvider.GetRequiredService<IEstateUnitService>();
        return await euService.EstateUnitSurfacesTreeAsync(id, cancellationToken);
      }))
      .ToList();

    var results = await Task.WhenAll(tasks);

    return keys
      .SelectMany((key, index) => results[index].Select(
          surfaceTree => new
          {
            SurfaceTree = surfaceTree,
            Key = key
          }
        ))
      .ToLookup(pair => pair.Key, pair => pair.SurfaceTree);
  }
}
