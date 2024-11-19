using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($inputs: [{{nameof(CatalogueItemInput)}}!]!) {
      catalogue {
        add(inputs: $inputs) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CatalogueItemFragment()
          )}}
        }
      }
    }
    """;

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Add()
  {
    // Arrange
    Estate estate;
    CatalogueType type;

    using (var scope = Provider.CreateScope())
    {
      var estateRepository = scope.ServiceProvider.GetRequiredService<IRepository<Estate>>();
      var subjectRepository = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      var catalogueTypeRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();
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
        .UseCategories(new CatalogueCategoryFaker().Generate())
        .UseEstateUsageTypes(await usageTypeRepo.AsQueryable().ToListAsync())
        .Generate();

      await catalogueTypeRepository.AddAsync(type);
    }

    var inputs = new CatalogueItemInputFaker()
      .UseEstates(estate)
      .UseTypes(type)
      .Generate(2);

    var addCatalogueMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("inputs", inputs)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addCatalogueMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedItemsIds = result!.Data!
      .GetDictionaryValue("catalogue")
      .GetDictionaryValue("add")
      .GetListOfDictionariesValue("value")
      .Select(value => value.GetValue<int>("id"));

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueItem>>();

      var addedCatalogueItems = await repository
        .AsQueryable(new GetByIdsSpec<CatalogueItem>(addedItemsIds), new CatalogueItemIncludeAllSpec())
        .ToListAsync();

      Assert.Equal(inputs.Count, addedCatalogueItems.Count);

      foreach (var (input, item) in inputs.Zip(addedCatalogueItems))
      {
        AssertHelper.Asst.CatalogueItemEqual(input, item);
      }
    }

    await Verify(result);
  }
}
