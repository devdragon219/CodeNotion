using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Asst.Catalogue;

public abstract class BaseEfRepoTestFixture
{
  protected AsstDbContext _dbContext;

  protected BaseEfRepoTestFixture()
  {
    var options = CreateNewContextOptions();
    var mockEventDispatcher = new Mock<IDomainEventDispatcher>();

    _dbContext = new AsstDbContext(
      options,
      null,
      SupportedDbDialect.InMemory,
      mockEventDispatcher.Object, null);
  }

  protected static DbContextOptions<AsstDbContext> CreateNewContextOptions()
  {
    // Create a fresh service provider, and therefore a fresh
    // InMemory database instance.
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    // Create a new options instance telling the context to use an
    // InMemory database and the new service provider.
    var builder = new DbContextOptionsBuilder<AsstDbContext>();
    builder.UseInMemoryDatabase("cleanarchitecture")
           .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }

  protected AsstEfRepository<Estate> GetEstateRepository()
  {
    return new AsstEfRepository<Estate>(_dbContext);
  }

  protected AsstEfRepository<CatalogueCategory> GetCategoryRepository()
  {
    return new AsstEfRepository<CatalogueCategory>(_dbContext);
  }

  protected AsstEfRepository<CatalogueType> GetTypeRepository()
  {
    return new AsstEfRepository<CatalogueType>(_dbContext);
  }

  protected AsstEfRepository<CatalogueItem> GetItemRepository()
  {
    return new AsstEfRepository<CatalogueItem>(_dbContext);
  }

  protected async Task<Estate> CreateEstate()
  {
    var testEstateName = Guid.NewGuid().ToString();
    var testEstateStatus = EstateStatus.Operational;
    var repository = GetEstateRepository();
    var estate = new Estate();
    estate.SetName(testEstateName);
    estate.SetInternalCode(testEstateName);
    estate.SetStatus(testEstateStatus);
    estate.SetType(EstateType.UrbanPlot);
    estate.SetOwnership(EstateOwnership.Easement);
    var emut = new EstateMainUsageType();
    emut.SetName("Main Usage");
    emut.SetInternalCode("C001");
    estate.SetMainUsageType(emut);
    var eut = new EstateUsageType();
    eut.SetName("Usage");
    eut.SetInternalCode("C001");
    estate.SetUsageType(eut);
    estate.SetManagement(7, null);

    await repository.AddAsync(estate);

    await repository.SaveChangesAsync();

    return estate;
  }
}
