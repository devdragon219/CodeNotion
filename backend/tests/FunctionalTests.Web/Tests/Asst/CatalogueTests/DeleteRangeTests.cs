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

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [{{nameof(CatalogueId)}}Input!]!) {
      catalogue {
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
    int[] itemsToKeepIds;
    CatalogueId[] cataloguesToDeleteIds;

    using (var scope = Provider.CreateScope())
    {
      var subjectRepository = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      var estateRepository = scope.ServiceProvider.GetRequiredService<IRepository<Estate>>();
      var catalogueTypeRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();
      var catalogueItemRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueItem>>();
      var usageTypes = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
      var mainUsageTypes = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

      var managementSubject = new ManagementSubjectFaker().Generate();
      await subjectRepository.AddAsync(managementSubject);

      var usageType = new EstateUsageTypeFaker().Generate();
      await usageTypes.AddAsync(usageType);
      var mainUsageType = new EstateMainUsageTypeFaker().Generate();
      await mainUsageTypes.AddAsync(mainUsageType);

      var estates = new Fakers.Asst.EstateFaker
      {
        ManagementSubjectId = managementSubject.Id,
        UsageTypes = await usageTypes.AsQueryable().ToListAsync(),
        MainUsageTypes = await mainUsageTypes.AsQueryable().ToListAsync(),
      }.Generate(3);

      await estateRepository.AddRangeAsync(estates);

      var types = new CatalogueTypeFaker()
        .UseCategories(new CatalogueCategoryFaker())
        .UseEstateUsageTypes(await usageTypes.AsQueryable().ToListAsync())
        .Generate(3);

      await catalogueTypeRepository.AddRangeAsync(types);

      var items = new CatalogueItemFaker()
        .UseEstates(estates)
        .UseTypes(types)
        .Generate(4);

      await catalogueItemRepository.AddRangeAsync(items);

      var catalogues = items.GroupBy(item => new CatalogueId(item.Estate.Id, item.CatalogueType.Id)).ToArray();

      cataloguesToDeleteIds = catalogues
        .Select(catalogue => catalogue.Key)
        .Take(2)
        .ToArray();

      itemsToKeepIds = catalogues
        .Where(catalogue => !cataloguesToDeleteIds.Contains(catalogue.Key))
        .SelectMany(catalogue => catalogue.AsEnumerable())
        .Select(item => item.Id)
        .Order()
        .ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", cataloguesToDeleteIds)
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
