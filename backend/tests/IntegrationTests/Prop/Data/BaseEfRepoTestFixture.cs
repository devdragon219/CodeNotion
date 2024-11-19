using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Infrastructure.Prop.Data;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Prop.Data;

public abstract class BaseEfRepoTestFixture
{
  protected AnagDbContext _anagDbContext;
  protected IAMDbContext _iamDbContext;
  protected CommonDbContext _commonDbContext;
  protected AsstDbContext _asstDbContext;
  protected PropDbContext _propDbContext;

  protected BaseEfRepoTestFixture()
  {
    _anagDbContext = new AnagDbContext(
      CreateContextOptions<AnagDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object,
      null);
    _iamDbContext = new IAMDbContext(
      CreateContextOptions<IAMDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object);
    _commonDbContext = new CommonDbContext(
      CreateContextOptions<CommonDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object,
      null);
    _asstDbContext = new AsstDbContext(
      CreateContextOptions<AsstDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object,
      null);
    _propDbContext = new PropDbContext(
      CreateContextOptions<PropDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      new Mock<IDomainEventDispatcher>().Object,
      null);
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

  protected AnagEfRepository<TEntity> GetAnagRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_anagDbContext);

  protected AsstEfRepository<TEntity> GetAsstRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_asstDbContext);

  protected IAMEfRepository<TEntity> GetIAMRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_iamDbContext);

  protected CommonEfRepository<TEntity> GetCommonRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_commonDbContext);

  protected PropEfRepository<TEntity> GetPropRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_propDbContext);
}
