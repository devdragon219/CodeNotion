using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: {{nameof(CatalogueId)}}Input!, $inputs: [{{nameof(CatalogueItemInput)}}!]!) {
      catalogue {
        update(id: $id, inputs: $inputs) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CatalogueItemFragment())}}
        }
      }
    }
    """;

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Update()
  {
    // Arrange
    Estate estate;
    CatalogueType type;
    int itemToUpdateId;
    int itemToRemoveId;

    using (var scope = Provider.CreateScope())
    {
      var subjectRepository = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      var estateRepository = scope.ServiceProvider.GetRequiredService<IRepository<Estate>>();
      var catalogueTypeRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();
      var catalogueItemRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueItem>>();
      var usageTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
      var mainUsageTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

      var managementSubject = new ManagementSubjectFaker().Generate();
      await subjectRepository.AddAsync(managementSubject);

      var usageType = new EstateUsageTypeFaker().Generate();
      await usageTypeRepo.AddAsync(usageType);
      var mainUsageType = new EstateMainUsageTypeFaker().Generate();
      await mainUsageTypeRepo.AddAsync(mainUsageType);

      estate = new Fakers.Asst.EstateFaker
      {
        ManagementSubjectId = managementSubject.Id,
        UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync(),
        MainUsageTypes = await mainUsageTypeRepo.AsQueryable().ToListAsync()
      }.Generate();
      await estateRepository.AddAsync(estate);

      type = new CatalogueTypeFaker()
        .UseCategories(new CatalogueCategoryFaker())
        .UseEstateUsageTypes(await usageTypeRepo.AsQueryable().ToListAsync())
        .Generate();
      await catalogueTypeRepository.AddAsync(type);

      var items = new CatalogueItemFaker().UseEstates(estate).UseTypes(type).Generate(2);
      await catalogueItemRepository.AddRangeAsync(items);

      itemToUpdateId = items.First().Id;
      itemToRemoveId = items.Last().Id;
    }

    var inputFaker = new CatalogueItemInputFaker().UseEstates(estate).UseTypes(type);
    var inputToAdd = inputFaker.Generate();
    var inputToUpdate = inputFaker.Generate() with { Id = itemToUpdateId };

    var updateMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", new CatalogueId(estate.Id, type.Id))
      .SetVariableValue("inputs", new[] { inputToAdd, inputToUpdate })
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueItem>>();

      var items = await repository.ListAsync(new CatalogueItemIncludeAllSpec());
      Assert.Equal(2, items.Count);

      var addedItem = items.Single(item => item.Id != itemToUpdateId && item.Id != itemToRemoveId);
      AssertHelper.Equal(inputToAdd, addedItem, AssertHelper.Asst.CatalogueItemEqual);

      var updatedItem = items.Single(item => item.Id == itemToUpdateId);
      AssertHelper.Equal(inputToUpdate, updatedItem, AssertHelper.Asst.CatalogueItemEqual);
    }

    await Verify(result);
  }
}
