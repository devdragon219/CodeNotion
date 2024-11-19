using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using RealGimm.Core;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Shared.InterestCalculation;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.Common.InterestRateProvider;
using Xunit;

namespace RealGimm.IntegrationTests.Shared;

public class InterestCalculatorTests
{
  protected CommonDbContext _dbContext;
  protected ServiceProvider _serviceProvider;

  public InterestCalculatorTests()
  {
    // Create a fresh service provider, and therefore a fresh
    // InMemory database instance.
    _serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .AddLogging()
        .BuildServiceProvider();

    var options = CreateNewContextOptions();
    var mockEventDispatcher = new Mock<IDomainEventDispatcher>();

    _dbContext = new CommonDbContext(
      options,
      null,
      SupportedDbDialect.InMemory,
      mockEventDispatcher.Object, null);
  }

  protected DbContextOptions<CommonDbContext> CreateNewContextOptions()
  {
    // Create a new options instance telling the context to use an
    // InMemory database and the new service provider.
    var builder = new DbContextOptionsBuilder<CommonDbContext>();
    builder.UseInMemoryDatabase("cleanarchitecture")
           .UseInternalServiceProvider(_serviceProvider);

    return builder.Options;
  }

  protected CommonEfRepository<InterestRate> GetRepository()
  {
    return new CommonEfRepository<InterestRate>(_dbContext);
  }

  [Fact]
  public async Task TestInterestCalculation()
  {
    //Arrange
    var irRepository = GetRepository();
    var irProvider = new InterestRateProviderIta(
      _serviceProvider.GetRequiredService<ILogger<InterestRateProviderIta>>(),
      irRepository
    );

    await irProvider.ImportUpdatesMasterList(CountryISO3.ITA);

    var irCalculator = new InterestCalculator(){
      InterestRates = irRepository
    };

    //Act
    var interestPeriods = await irCalculator.CalculateInterests(
      1000,
      new DateOnly(1998, 6, 11),
      new DateOnly(2003, 12, 31),
      CountryISO3.ITA
    );

    //Assert
    Assert.Collection(interestPeriods,
      p1 => { Assert.Equal(27.81m, p1.InterestAmount); },
      p1 => { Assert.Equal(50m, p1.InterestAmount); },
      p1 => { Assert.Equal(34.90m, p1.InterestAmount); },
      p1 => { Assert.Equal(59.92m, p1.InterestAmount); });
  }
}
