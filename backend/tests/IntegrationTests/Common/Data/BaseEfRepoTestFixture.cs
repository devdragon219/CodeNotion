using RealGimm.Core.Common.CityAggregate;
using RealGimm.Infrastructure.Common.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Infrastructure.Prop.Data;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Common.Data;

public abstract class BaseEfRepoTestFixture
{
  protected CommonDbContext _dbContext;
  protected PropDbContext _propDbContext;

  protected BaseEfRepoTestFixture()
  {
    var mockEventDispatcher = new Mock<IDomainEventDispatcher>();

    _dbContext = new CommonDbContext(
      CreateContextOptions<CommonDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      mockEventDispatcher.Object, null);
    _propDbContext = new PropDbContext(
      CreateContextOptions<PropDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object, null);
  }

  protected static DbContextOptions<TDbContext> CreateContextOptions<TDbContext>()
    where TDbContext : DbContext
  {
    // Create a fresh service provider, and therefore a fresh
    // InMemory database instance.
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    // Create a new options instance telling the context to use an
    // InMemory database and the new service provider.
    var builder = new DbContextOptionsBuilder<TDbContext>();
    builder.UseInMemoryDatabase("cleanarchitecture")
           .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }

  protected CommonEfRepository<T> GetRepository<T>()
    where T : class, IAggregateRoot
  {
    return new CommonEfRepository<T>(_dbContext);
  }

  protected PropEfRepository<T> GetPropRepository<T>()
    where T : class, IAggregateRoot
  {
    return new PropEfRepository<T>(_propDbContext);
  }
}
