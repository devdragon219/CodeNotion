using RealGimm.Infrastructure.Common.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Common.RevaluationDataAggregate;
using Xunit;
using RealGimm.Infrastructure.Common.RevaluationDataProvider;
using RealGimm.Core;
using RealGimm.Core.Shared.RevaluationCalculation;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Common.RevaluationCalculator;

public class RevaluationCalculationTests
{
  protected CommonDbContext _dbContext;
  protected ServiceProvider _serviceProvider;

  public RevaluationCalculationTests()
  {
    _serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .AddLogging()
        .AddHttpClient()
        .BuildServiceProvider();

    // Create a new options instance telling the context to use an
    // InMemory database and the new service provider.
    var builder = new DbContextOptionsBuilder<CommonDbContext>();
    builder.UseInMemoryDatabase("revaluationCalculator")
           .UseInternalServiceProvider(_serviceProvider);

    var mockEventDispatcher = new Mock<IDomainEventDispatcher>();

    _dbContext = new CommonDbContext(
      builder.Options,
      null,
      SupportedDbDialect.InMemory,
      mockEventDispatcher.Object,
      null);
  }

  protected CommonEfRepository<RevaluationData> GetRepository()
  {
    return new CommonEfRepository<RevaluationData>(_dbContext);
  }

  [Fact]
  public async Task TestRevaluationCalculator()
  {
    //Arrange
    var revDataRepo = GetRepository();
    var revDataProvider = new RevaluationDataProviderIta(){
      _httpClient = _serviceProvider.GetRequiredService<HttpClient>(),
      _logger = _serviceProvider.GetRequiredService<ILogger<RevaluationDataProviderIta>>(),
      _repository = revDataRepo
    };

    await revDataProvider.ImportUpdatesMasterList(CountryISO3.ITA);

    var revCalculator = new DefaultRevaluationCalculator(){
      RevaluationData = revDataRepo
    };

    //Act
    var baseAmounts = new Dictionary<DateOnly, decimal>{
      {new DateOnly(2009, 1, 1), 1000M}
    };

    var revSteps1 = await revCalculator.CalculateRevaluations(
      baseAmounts,
      new DateOnly(2009, 1, 1),
      new DateOnly(2015, 1, 1),
      1,
      false,
      12,
      CountryISO3.ITA
    );

    //Assert
    Assert.Collection(revSteps1,
      r => {
        Assert.Equal(1000, r.ReferenceAmount);
        Assert.Equal(13.0M, r.CalculatedAmount);
      },
      r => {
        Assert.Equal(1000, r.ReferenceAmount);
        Assert.Equal(22.0M, r.CalculatedAmount);
        Assert.Equal(2011, r.ReferenceDate.Year);
      },
      r => {
        Assert.Equal(1000, r.ReferenceAmount);
        Assert.Equal(32.0M, r.CalculatedAmount);
        Assert.Equal(2012, r.ReferenceDate.Year);
      },
      r => {
        Assert.Equal(1000, r.ReferenceAmount);
        Assert.Equal(22.0M, r.CalculatedAmount);
        Assert.Equal(2013, r.ReferenceDate.Year);
      },
      r => {
        Assert.Equal(1000, r.ReferenceAmount);
        Assert.Equal(6.0M, r.CalculatedAmount);
        Assert.Equal(2014, r.ReferenceDate.Year);
      },
      r => {
        Assert.Equal(1000, r.ReferenceAmount);
        Assert.Equal(-7.0M, r.CalculatedAmount);
        Assert.Equal(2015, r.ReferenceDate.Year);
      });
  }
}
