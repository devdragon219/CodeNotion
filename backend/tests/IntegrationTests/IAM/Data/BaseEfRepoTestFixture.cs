using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Infrastructure.IAM.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.IAM.Services;
using RealGimm.Core.EventSystem;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.IAM.Data;

public abstract class BaseEfRepoTestFixture
{
  protected IAMDbContext _dbContext;

  protected BaseEfRepoTestFixture()
  {
    var options = CreateNewContextOptions();
    var mockEventDispatcher = new Mock<IDomainEventDispatcher>();

    _dbContext = new IAMDbContext(
      options,
      null,
      SupportedDbDialect.InMemory,
      mockEventDispatcher.Object);
  }

  protected static DbContextOptions<IAMDbContext> CreateNewContextOptions()
  {
    // Create a fresh service provider, and therefore a fresh
    // InMemory database instance.
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    // Create a new options instance telling the context to use an
    // InMemory database and the new service provider.
    var builder = new DbContextOptionsBuilder<IAMDbContext>();
    builder.UseInMemoryDatabase("cleanarchitecture")
           .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }

  protected IAMEfRepository<User> GetUserRepository()
  {
    return new IAMEfRepository<User>(_dbContext);
  }
  
  protected IAMEfRepository<Group> GetGroupRepository()
  {
    return new IAMEfRepository<Group>(_dbContext);
  }

  protected GroupPermissionService GetGroupPermissionService()
  {
    return new GroupPermissionService(GetGroupRepository());
  }
}
