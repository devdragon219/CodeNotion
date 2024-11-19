using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTemplateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      contractTemplate {
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
    ContractTemplate[] contractTemplatesToKeep;
    ContractTemplate[] contractTemplatesToDelete;

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
        .AddRangeAsync(catalogueTypeFaker.Generate(3));

      var catalogueSubCategories = catalogueCategories
        .SelectMany(category => category.SubCategories)
        .ToList();

      var contractTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<ContractType>>()
        .AddRangeAsync(new ContractTypeFaker().Generate(2));

      var ticketTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<TicketType>>()
        .AddRangeAsync(new TicketTypeFaker().Generate(2));

      var calendars = await scope.ServiceProvider
        .GetRequiredService<IRepository<Calendar>>()
        .AddRangeAsync(new CalendarFaker().Generate(2));

      var complexTicketConditionFaker = new ComplexTicketConditionFaker
      {
        InternalConditionFaker = new TicketConditionFaker
        {
          TicketTypes = ticketTypes,
          Calendars = calendars,
          CatalogueCategories = catalogueCategories,
          CatalogueSubCategories = catalogueSubCategories,
          CatalogueTypes = catalogueTypes
        }
      };

      var slaFaker = new SLAFaker
      {
        ComplexTicketConditionFaker = complexTicketConditionFaker
      };

      var slas = await scope.ServiceProvider
        .GetRequiredService<IRepository<SLA>>()
        .AddRangeAsync(slaFaker.Generate(3));

      var penaltyFaker = new PenaltyFaker
      {
        ComplexTicketConditionFaker = complexTicketConditionFaker
      };

      var penalties = await scope.ServiceProvider
        .GetRequiredService<IRepository<Penalty>>()
        .AddRangeAsync(penaltyFaker.Generate(3));

      var contractTemplateFaker = new ContractTemplateFaker
      {
        CatalogueTypes = catalogueTypes,
        ContractTypes = contractTypes,
        SLAs = slas,
        Penalties = penalties
      };

      var contractTemplates = await scope.ServiceProvider
        .GetRequiredService<IRepository<ContractTemplate>>()
        .AddRangeAsync(contractTemplateFaker.Generate(4));

      contractTemplatesToKeep = contractTemplates.Take(2).ToArray();
      contractTemplatesToDelete = contractTemplates.Except(contractTemplatesToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", contractTemplatesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<ContractTemplate>>();
      var remainingContractTemplates = await repository.ListAsync();
      Assert.True(contractTemplatesToKeep.Zip(remainingContractTemplates).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
