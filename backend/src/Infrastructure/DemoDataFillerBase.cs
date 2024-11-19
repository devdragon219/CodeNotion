using Bogus;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure;

public abstract class DemoDataFillerBase<TContext, TSelf> : IDemoDataFiller
  where TContext : DbContext
  where TSelf : DemoDataFillerBase<TContext, TSelf>
{
  public abstract int ExecutionOrder { get; }
  
  protected TContext Context { get; }
  protected ILogger<TSelf> Logger { get; }

  public DemoDataFillerBase(TContext context, ILogger<TSelf> logger)
  {
    Context = context;
    Logger = logger;
  }

  public abstract Task FillAsync(bool shortData, CancellationToken cancellationToken);

  protected async Task FillEntitiesAsync<TEntity>(
    Faker<TEntity> faker,
    int entitiesToGenerateCount,
    CancellationToken cancellationToken)
    where TEntity : class, IAggregateRoot
  {
    var entities = faker.Generate(entitiesToGenerateCount);
    await Context.Set<TEntity>().AddRangeAsync(entities, cancellationToken);

    await Context.SaveChangesAsync(cancellationToken);

    Logger.LogInformation("{entity} added", typeof(TEntity).Name.Humanize().Pluralize());
  }
}
