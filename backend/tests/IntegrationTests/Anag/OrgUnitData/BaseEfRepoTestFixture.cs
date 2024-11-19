﻿using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Infrastructure.Anag.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.EventSystem;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Anag.OrgUnitData;

public abstract class BaseEfRepoTestFixture
{
  protected AnagDbContext _dbContext;

  protected BaseEfRepoTestFixture()
  {
    var options = CreateNewContextOptions();
    var mockEventDispatcher = new Mock<IDomainEventDispatcher>();

    _dbContext = new AnagDbContext(
      options,
      null,
      SupportedDbDialect.InMemory,
      mockEventDispatcher.Object,
      null);
  }

  protected static DbContextOptions<AnagDbContext> CreateNewContextOptions()
  {
    // Create a fresh service provider, and therefore a fresh
    // InMemory database instance.
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    // Create a new options instance telling the context to use an
    // InMemory database and the new service provider.
    var builder = new DbContextOptionsBuilder<AnagDbContext>();
    builder.UseInMemoryDatabase("cleanarchitecture")
           .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }

  protected AnagEfRepository<Subject> GetRepository()
  {
    return new AnagEfRepository<Subject>(_dbContext);
  }

  protected AnagEfRepository<OrgUnit> GetRepositoryOu()
  {
    return new AnagEfRepository<OrgUnit>(_dbContext);
  }
}