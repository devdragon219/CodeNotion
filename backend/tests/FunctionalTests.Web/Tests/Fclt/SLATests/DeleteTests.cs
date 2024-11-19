using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.SLATests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation => $$"""
    mutation($id: Int!) {
      sla {
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
    SLA slaToDelete;

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

      var slaFaker = new SLAFaker
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

      slaToDelete = await scope.ServiceProvider
        .GetRequiredService<IRepository<SLA>>()
        .AddAsync(slaFaker.Generate());
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", slaToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<SLA>>();

      var deletedSLA = await repository.SingleOrDefaultAsync(
        new GetByIdSpec<SLA>(slaToDelete.Id));

      Assert.Null(deletedSLA);
    }
  }
}
