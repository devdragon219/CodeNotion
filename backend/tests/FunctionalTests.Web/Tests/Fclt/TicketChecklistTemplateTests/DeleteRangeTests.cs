using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketChecklistTemplateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      ticketChecklistTemplate {
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
    TicketChecklistTemplate[] ticketChecklistTemplatesToKeep;
    TicketChecklistTemplate[] ticketChecklistTemplatesToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var catalogueCategoryFaker = new CatalogueCategoryFaker()
        .UseSubCategoryFaker(new CatalogueSubCategoryFaker());

      var catalogueCategories = await scope.ServiceProvider
        .GetRequiredService<IRepository<CatalogueCategory>>()
        .AddRangeAsync(catalogueCategoryFaker.Generate(2));

      var catalogueTypeFaker = new CatalogueTypeFaker()
        .UseActivityFaker(new CatalogueTypeActivityFaker())
        .UseCategories(catalogueCategories)
        .UseEstateUsageTypes(new EstateUsageTypeFaker().Generate(2))
        .UseFieldFaker(new CatalogueTypeFieldFaker());

      var catalogueTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<CatalogueType>>()
        .AddRangeAsync(catalogueTypeFaker.Generate(2));

      var crafts = await scope.ServiceProvider
        .GetRequiredService<IRepository<Craft>>()
        .AddRangeAsync(new CraftFaker().Generate(2));

      var interventionTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<InterventionType>>()
        .AddRangeAsync(new InterventionTypeFaker().Generate(2));

      var ticketChecklistTemplateFaker = new TicketChecklistTemplateFaker
      {
        CatalogueTypes = catalogueTypes,
        Crafts = crafts,
        InterventionTypes = interventionTypes
      };

      var ticketChecklistTemplates = await scope.ServiceProvider
        .GetRequiredService<IRepository<TicketChecklistTemplate>>()
        .AddRangeAsync(ticketChecklistTemplateFaker.Generate(4));

      ticketChecklistTemplatesToKeep = ticketChecklistTemplates.Take(2).ToArray();
      ticketChecklistTemplatesToDelete = ticketChecklistTemplates.Except(ticketChecklistTemplatesToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", ticketChecklistTemplatesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TicketChecklistTemplate>>();
      var remainingTicketChecklistTemplates = await repository.ListAsync();
      Assert.True(ticketChecklistTemplatesToKeep.Zip(remainingTicketChecklistTemplates).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
