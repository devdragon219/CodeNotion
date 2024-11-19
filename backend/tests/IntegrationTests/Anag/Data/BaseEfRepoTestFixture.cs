using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Anag.Data;

public abstract class BaseEfRepoTestFixture
{
  protected AnagDbContext _anagDbContext;
  protected IAMDbContext _iamDbContext;
  protected CommonDbContext _commonDbContext;

  protected BaseEfRepoTestFixture()
  {
    _anagDbContext = new AnagDbContext(
      CreateNewContextOptions<AnagDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object,
      null);

    _iamDbContext = new IAMDbContext(
      CreateNewContextOptions<IAMDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object);

    _commonDbContext = new CommonDbContext(
      CreateNewContextOptions<CommonDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object,
      null);
  }

  protected static DbContextOptions<TDbContext> CreateNewContextOptions<TDbContext>()
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

  protected AnagEfRepository<TEntity> GetAnagRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_anagDbContext);

  protected IAMEfRepository<TEntity> GetIAMRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_iamDbContext);

  protected CommonEfRepository<TEntity> GetCommonRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_commonDbContext);
}
