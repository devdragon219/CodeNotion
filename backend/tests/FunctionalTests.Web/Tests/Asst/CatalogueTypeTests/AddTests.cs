using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(CatalogueTypeInput)}}!) {
      catalogueType {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.CatalogueTypeFragment())}}
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
    var category = new CatalogueCategoryFaker().Generate();
    var estateUsageTypes = new EstateUsageTypeFaker().Generate(3);

    using var firstScope = Provider.CreateScope();

    var repository = firstScope.ServiceProvider.GetRequiredService<IRepository<CatalogueCategory>>();
    await repository.AddAsync(category);

    var euRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    await euRepo.AddRangeAsync(estateUsageTypes);

    var input = new CatalogueTypeInputFaker()
      .UseCategories(category)
      .UseUsageTypes(await euRepo.AsQueryable().ToListAsync())
      .Generate();

    var addTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedTypeId = result.Data!
      .GetDictionaryValue("catalogueType")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var catalogueTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<CatalogueType>>();

      var addedType = await catalogueTypeRepo
        .AsQueryable(new GetByIdSpec<CatalogueType>(addedTypeId), new CatalogueTypeIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedType);
      AssertHelper.Asst.CatalogueTypeEqual(input, addedType);
    }

    await Verify(result);
  }
}
