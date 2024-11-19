using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Econ.TaxCreditAggregate;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.FunctionalTests.Web.Tests.Econ.TaxCreditTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListGroupedOperationsTests : SeededDbWebTest
{
  public string Query { get; } = $$"""
    query($taxCreditId: Int!) {
      taxCredit {
        listGroupedOperations(taxCreditId: $taxCreditId) {
          nodes {
            {{GraphQLHelper.Econ.GroupedOperationOutputFragment()}}
          }
        }
      }
    }
    """;

  public ListGroupedOperationsTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_ListGroupedOperationsOfTheFirstTaxCredit()
  {
    // Arrange
    int firstTaxCreditId;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TaxCredit>>();
      
      firstTaxCreditId = await repository
        .AsQueryable(new EntityNonDeletedSpec<TaxCredit>())
        .Select(credit => credit.Id)
        .FirstAsync();
    }

    var listQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("taxCreditId", firstTaxCreditId)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(listQuery);

    await Verify(result);
  }
}
