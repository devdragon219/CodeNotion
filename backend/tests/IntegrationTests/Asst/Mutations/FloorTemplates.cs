using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using Xunit;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.EventSystem;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Asst.Mutations;

public class FloorTemplates
{
  [Fact]
  protected async Task Should_CreateFloorTemplate()
  {
    // Arrange
    await using var context = CreateDbContext();
    var ftRepo = new AsstEfRepository<FloorTemplate>(context);
    var ftMutations = new Web.Asst.Mutations.FloorTemplateMutations();
    var ftToCreate = new FloorTemplateInput("name", 1);

    // Act
    var result = await ftMutations.AddFloorTemplate(ftToCreate, ftRepo);
    context.ChangeTracker.Clear();

    // Assert
    Assert.True(result.IsSuccess);

    var createdFt = await context.Set<FloorTemplate>().AsNoTracking()
      .SingleAsync(subject => subject.Id == result.Value.Id);

    Assert.Equal(ftToCreate.Name, createdFt.Name);
    Assert.Equal(ftToCreate.Position, createdFt.Position);
  }

  [Fact]
  protected async Task Should_CreateFTAndListIt()
  {
    // Arrange
    await using var context = CreateDbContext();
    var ftRepo = new AsstEfRepository<FloorTemplate>(context);
    var ftMutations = new Web.Asst.Mutations.FloorTemplateMutations();
    var ftQueries = new Web.Asst.Queries.FloorTemplateQueries();
    var ftToCreate = new FloorTemplateInput("name", 1);

    var result = await ftMutations.AddFloorTemplate(ftToCreate, ftRepo);
    context.ChangeTracker.Clear();

    // Act
    var foundFt = await ftQueries.ListFloorTemplates(ftRepo)
      .FirstOrDefaultAsync(ft => ft.Name == ftToCreate.Name);

    // Assert
    Assert.True(result.IsSuccess);
    Assert.NotNull(foundFt);
    Assert.NotEqual(0, foundFt.Id);
  }

  protected AsstDbContext CreateDbContext()
    => new(
      CreateNewContextOptions(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>(), null);

  private static DbContextOptions<AsstDbContext> CreateNewContextOptions()
  {
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    var builder = new DbContextOptionsBuilder<AsstDbContext>()
      .UseInMemoryDatabase("cleanarchitecture")
      .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }
}
