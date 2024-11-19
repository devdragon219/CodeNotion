using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.WebCommons;
using RealGimm.Core.Asst;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Asst.Data;

public abstract class BaseEfRepoTestFixture
{
  protected AnagDbContext _anagDbContext;
  protected IAMDbContext _iamDbContext;
  protected CommonDbContext _commonDbContext;
  protected AsstDbContext _asstDbContext;

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
    
    _asstDbContext = new AsstDbContext(
      CreateNewContextOptions<AsstDbContext>(),
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
  
  protected AsstEfRepository<TEntity> GetAsstRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_asstDbContext);

  protected IAMEfRepository<TEntity> GetIAMRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_iamDbContext);

  protected CommonEfRepository<TEntity> GetCommonRepository<TEntity>()
    where TEntity : class, IAggregateRoot
    => new(_commonDbContext);

  protected async Task<Estate> CreateEstate()
  {
    var testEstateName = Guid.NewGuid().ToString();
    var testEstateStatus = EstateStatus.Operational;
    var repository = GetAsstRepository<Estate>();
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

  protected async Task<EstateUnit> CreateEstateUnit(string EUName)
  {
    var repository = GetAsstRepository<EstateUnit>();

    var estate = await CreateEstate();

    var estateUnit = new EstateUnit();
    estateUnit.SetName(EUName);
    estateUnit.SetInternalCode("ABC123");
    estateUnit.SetType(EstateUnitType.Building);
    estateUnit.SetStatus(EstateUnitStatus.Existing);
    estateUnit.SetUsageType(estate.UsageType);
    estateUnit.SetOwnership(
      EstateUnitOwnershipType.Property,
      DateOnly.FromDateTime(DateTime.Now),
      null,
      null);

    var address = new Address();
    address.SetType(AddressType.Primary);
    address.SetToponymy("Downtown");
    address.SetCity("New York", null);
    address.SetCountry("ITA", "Italy");
    address.SetNumbering("4");
    address.SetLocalPostCode("456");

    estateUnit.SetEstate(estate);

    estateUnit.SetAddress(address, "2");

    await repository.AddAsync(estateUnit);
    await repository.SaveChangesAsync();

    return estateUnit;
  }

  protected List<EstateUnitSurfaceSummary> CreateEstateUnitSurfaces()
  {
    var surface1 = new EstateUnitSurfaceSummary
    {
      SurfaceId = null,
      Metric = SurfaceMeasurementMetric.Rooms,
      SurfaceSqMTotal = 200,
      SurfaceSqMCommonArea = 0,
      SurfaceSqMSideArea = 0,
      Floors = new List<EstateUnitSurfaceSummaryFloor> {
            new EstateUnitSurfaceSummaryFloor {
                SurfaceId = null,
                SurfaceSqMTotal = 200,
                SurfaceSqMCommonArea = 0,
                SurfaceSqMSideArea = 0,
                Floor = new EstateUnitSurfaceSummaryFloorSummary {
                   Id = 1,
                   Name = "Test",
                   Position = 1,
                   TemplateReference = Guid.NewGuid()
                },
                FunctionAreas = new List<EstateUnitSurfaceSummaryFunctionArea> {
                  new EstateUnitSurfaceSummaryFunctionArea {
                    SurfaceId = null,
                    SurfaceSqMTotal = 200,
                    SurfaceSqMCommonArea = 0,
                    SurfaceSqMSideArea = 0,
                    FunctionArea = new EstateUnitSurfaceSummaryFunctionAreaSummary
                    {
                      Id = 1,
                      Name = "Cucina",
                      SurfaceType = SurfaceType.MainArea
                    }
                  }
                }
            }
        }
    };

    var surface2 = new EstateUnitSurfaceSummary
    {
      SurfaceId = null,
      Metric = SurfaceMeasurementMetric.Rooms,
      SurfaceSqMTotal = 200,
      SurfaceSqMCommonArea = 0,
      SurfaceSqMSideArea = 0
    };

    return new List<EstateUnitSurfaceSummary> { surface1, surface2 };
  }

  protected RepositoryWebWrapper<EstateUnit> GetRepositoryWebWrapperEU()
  {
    return new RepositoryWebWrapper<EstateUnit>(GetAsstRepository<EstateUnit>());
  }
}
