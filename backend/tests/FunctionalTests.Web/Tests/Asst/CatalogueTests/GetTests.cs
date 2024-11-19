using Ardalis.Specification;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CatalogueTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : SeededDbWebTest
{
  public string Query { get; } = $$"""
    query($estateId: Int!, $catalogueTypeId: Int!) {
      catalogue {
        get(estateId: $estateId, catalogueTypeId: $catalogueTypeId) {
          {{GraphQLHelper.Asst.CatalogueItemFragment()}}
        }
      }
    }  
    """;

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public virtual async Task Should_GetFirstByEstateAndTypeIds()
  {
    // Arrange
    int catalogueToGetEstateId;
    int catalogueToGetTypeId;    

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IReadRepository<CatalogueItem>>();

      var catalogueId = await repository
        .AsQueryable()
        .GroupBy(item => new
        {
          EstateId = item.Estate.Id,
          TypeId = item.CatalogueType.Id
        })
        .OrderBy(catalogue => catalogue.Key.EstateId)
          .ThenBy(catalogue => catalogue.Key.TypeId)
        .Select(catalogue => catalogue.Key)
        .FirstAsync();

      catalogueToGetEstateId = catalogueId.EstateId;
      catalogueToGetTypeId = catalogueId.TypeId;
    }

    var getQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("estateId", catalogueToGetEstateId)
      .SetVariableValue("catalogueTypeId", catalogueToGetTypeId)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(getQuery);

    // Assert
    Assert.NotNull(result);

    var catalogueDetails = result.Data!
      .GetDictionaryValue("catalogue")
      .GetListOfDictionariesValue("get");

    Assert.NotNull(catalogueDetails);
    await Verify(catalogueDetails);
  }
}
