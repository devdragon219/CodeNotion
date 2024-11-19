using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueItemTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      catalogueItem {
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
    int itemToDeleteId;
    int[] itemsToKeepIds;

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

      var estate = new Fakers.Asst.EstateFaker
      {
        ManagementSubjectId = managementSubject.Id,
        UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync(),
        MainUsageTypes = await mainUsageTypeRepo.AsQueryable().ToListAsync(),
      }.Generate();
      await estateRepository.AddAsync(estate);

      var type = new CatalogueTypeFaker()
        .UseCategories(new CatalogueCategoryFaker())
        .UseEstateUsageTypes(await usageTypeRepo.AsQueryable().ToListAsync())
        .Generate();
      await catalogueTypeRepository.AddAsync(type);

      var items = new CatalogueItemFaker()
        .UseEstates(estate)
        .UseTypes(type)
        .Generate(3);

      await catalogueItemRepository.AddRangeAsync(items);

      itemToDeleteId = items.First().Id;
      itemsToKeepIds = items.Select(item => item.Id).Except(new[] { itemToDeleteId }).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", itemToDeleteId)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueItem>>();

      var remainingItemsIds = await repository
        .AsQueryable()
        .Select(item => item.Id)
        .ToArrayAsync();

      Assert.Equal(itemsToKeepIds, remainingItemsIds);
    }
  }
}
