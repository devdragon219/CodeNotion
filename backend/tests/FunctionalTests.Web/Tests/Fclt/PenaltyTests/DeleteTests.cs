using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PenaltyTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation => $$"""
    mutation($id: Int!) {
      penalty {
        delete(id: $id) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Delete()
  {
    // Arrange
    Penalty penaltyToDelete;

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

      penaltyToDelete = await scope.ServiceProvider
        .GetRequiredService<IRepository<Penalty>>()
        .AddAsync(penaltyFaker.Generate());
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", penaltyToDelete.Id)
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

      var deletedPenalty = await repository.SingleOrDefaultAsync(
        new GetByIdSpec<Penalty>(penaltyToDelete.Id));

      Assert.Null(deletedPenalty);
    }
  }
}
