using RealGimm.Infrastructure.Prop.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Prop.RegistrationOfficeData;

public abstract class BaseEfRepoTestFixture
{
  protected PropDbContext _dbContext;

  protected BaseEfRepoTestFixture()
  {
    var options = CreateNewContextOptions();
    var mockEventDispatcher = new Mock<IDomainEventDispatcher>();

    _dbContext = new PropDbContext(
      options,
      null,
      SupportedDbDialect.InMemory,
      mockEventDispatcher.Object, null);
  }

  protected static DbContextOptions<PropDbContext> CreateNewContextOptions()
  {
    // Create a fresh service provider, and therefore a fresh
    // InMemory database instance.
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    // Create a new options instance telling the context to use an
    // InMemory database and the new service provider.
    var builder = new DbContextOptionsBuilder<PropDbContext>();
    builder.UseInMemoryDatabase("cleanarchitecture")
           .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }

  protected PropEfRepository<RegistrationOffice> GetRepository()
  {
    return new PropEfRepository<RegistrationOffice>(_dbContext);
  }
}
