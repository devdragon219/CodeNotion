using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PenaltyTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      penalty {
        deleteRange(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Fact]
  public async Task Should_DeleteRange()
  {
    // Arrange
    Penalty[] penaltysToKeep;
    Penalty[] penaltysToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var ticketTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<TicketType>>()
        .AddRangeAsync(new TicketTypeFaker().Generate(2));

      var calendars = await scope.ServiceProvider
        .GetRequiredService<IRepository<Calendar>>()
        .AddRangeAsync(new CalendarFaker().Generate(2));

      var catalogueCategoryFaker = new CatalogueCategoryFaker()
        .UseSubCategoryFaker(new CatalogueSubCategoryFaker());

      var catalogueCategories = await scope.ServiceProvider
        .GetRequiredService<IRepository<CatalogueCategory>>()
        .AddRangeAsync(catalogueCategoryFaker.Generate(2));

      var catalogueSubCategories = catalogueCategories
        .SelectMany(category => category.SubCategories)
        .ToList();

      var esateUsageTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<EstateUsageType>>()
        .AddRangeAsync(new EstateUsageTypeFaker().Generate(2));

      var catalogueTypeFaker = new CatalogueTypeFaker()
        .UseCategories(catalogueCategories)
        .UseEstateUsageTypes(esateUsageTypes)
        .UseActivityFaker(new CatalogueTypeActivityFaker())
        .UseFieldFaker(new CatalogueTypeFieldFaker());

      var catalogueTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<CatalogueType>>()
        .AddRangeAsync(catalogueTypeFaker.Generate(2));

      var penaltyFaker = new PenaltyFaker
      {
        ComplexTicketConditionFaker = new ComplexTicketConditionFaker
        {
          InternalConditionFaker = new TicketConditionFaker
          {
            TicketTypes = ticketTypes,
            Calendars = calendars,
            CatalogueCategories = catalogueCategories,
            CatalogueSubCategories = catalogueSubCategories,
            CatalogueTypes = catalogueTypes
          }
        }
      };

      var penaltys = await scope.ServiceProvider
        .GetRequiredService<IRepository<Penalty>>()
        .AddRangeAsync(penaltyFaker.Generate(4));

      penaltysToKeep = penaltys.Take(2).ToArray();
      penaltysToDelete = penaltys.Except(penaltysToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", penaltysToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Penalty>>();
      var remainingPenaltys = await repository.ListAsync();
      Assert.True(penaltysToKeep.Zip(remainingPenaltys).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
