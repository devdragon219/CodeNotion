using GreenDonut;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.Interfaces;

namespace RealGimm.Web.Prop.DataLoaders;

public class AdministrationTermDataLoader : GroupedDataLoader<int, TermGroupedInstallmentPayment>
{
  private readonly IServiceProvider _serviceProvider;

  public AdministrationTermDataLoader(
    IServiceProvider serviceProvider,
    IBatchScheduler batchScheduler,
    DataLoaderOptions? options = null)
    : base(batchScheduler, options)
  {
    _serviceProvider = serviceProvider;
  }

  protected override async Task<ILookup<int, TermGroupedInstallmentPayment>> LoadGroupedBatchAsync(
    IReadOnlyList<int> keys,
    CancellationToken cancellationToken)
  {
    var tasks = keys
      .Select(id => Task.Run(async () =>
      {
        await using var scope = _serviceProvider.CreateAsyncScope();
        var termService = scope.ServiceProvider.GetRequiredService<IAdministrationTermService>();
        return await termService.GetInstallmentPaymentsGroupedByBill(
        id,
        cancellationToken);
      }))
      .ToList();

    var results = await Task.WhenAll(tasks);


    return keys
      .SelectMany((key, index) => results[index].Select(
          termGroup => new
          {
            TermGroup = termGroup,
            Key = key
          }
        ))
      .ToLookup(pair => pair.Key, pair => pair.TermGroup);
  }
}
