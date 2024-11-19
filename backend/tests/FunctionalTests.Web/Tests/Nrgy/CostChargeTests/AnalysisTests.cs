using HotChocolate.Execution;
using RealGimm.Core.Nrgy.CostChargeAnalysisAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.CostChargeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class AnalysisTests : SeededDbWebTest
{
  public string Query { get; } = $$"""
    query($filters: {{nameof(CostChargeAnalysisFilters)}}Input!) {
      costCharge {
        analysis(filters: $filters) {
          {{GraphQLHelper.Nrgy.CostChargeAnalysisFragment()}}
        }
      }
    }
    """;

  public AnalysisTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_CalculateCostChargeAnalysis_WithNoFilters()
  {
    // Arrange
    var query = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("filters", new Dictionary<string, object>())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(query);

    // Assert
    await Verify(result);
  }
}
