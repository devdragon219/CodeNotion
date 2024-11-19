using HotChocolate.Execution;

namespace RealGimm.FunctionalTests.Web.Tests.Common.TaxConfigTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : SeededDbWebTest
{
  public const string Query = """
    query {
      taxConfiguration {
        availableCalculators {
          id
          description
        }
      }
    }
    """;

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_RunWithNoFilters()
  {
    // Arrange
    var listCataloguesQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(listCataloguesQuery);

    // Assert
    await Verify(result);
  }
}
