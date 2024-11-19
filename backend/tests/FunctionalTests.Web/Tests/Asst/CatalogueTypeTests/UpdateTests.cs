using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(CatalogueTypeInput)}}!) {
      catalogueType {
        update(id: $id, input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CatalogueTypeFragment())
          }}
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
    ICollection<CatalogueCategory> categories;
    ICollection<EstateUsageType> estateUsageTypes;
    CatalogueType typeToUpdate;

    using (var scope = Provider.CreateScope())
    {
      var categoryRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();
      var usageTypeRepository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
      var typeRepository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();

      categories = new CatalogueCategoryFaker().Generate(3);
      await categoryRepository.AddRangeAsync(categories);

      estateUsageTypes = new EstateUsageTypeFaker().Generate(3);
      await usageTypeRepository.AddRangeAsync(estateUsageTypes);
      
      typeToUpdate = new CatalogueTypeFaker()
        .UseCategories(categories)
        .UseEstateUsageTypes(await usageTypeRepository.AsQueryable().ToListAsync())
        .Generate();
      await typeRepository.AddAsync(typeToUpdate);
    }

    var input = new CatalogueTypeInputFaker()
      .UseCategories(categories)
      .UseUsageTypes(estateUsageTypes)
      .Generate();

    var updateTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", typeToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();

      var updatedType = await repository
        .AsQueryable(new GetByIdSpec<CatalogueType>(typeToUpdate.Id), new CatalogueTypeIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedType);
      AssertHelper.Asst.CatalogueTypeEqual(input, updatedType);
    }

    await Verify(result);
  }
}
