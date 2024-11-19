using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Infrastructure.Common.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Common.AccountingItemTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      accountingItem {
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
    var accountingItems = new AccountingItemFaker().Generate(4);
    var accountingItemsToKeep = accountingItems.Take(2).ToArray();
    var accountingItemsToDelete = accountingItems.Except(accountingItemsToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AccountingItem>>();
      await repository.AddRangeAsync(accountingItems);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", accountingItemsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AccountingItem>>();

      var remainingAccountingItems = await repository.ListAsync();
      Assert.Equal(accountingItemsToKeep.Length, remainingAccountingItems.Count);
      Assert.All(accountingItemsToKeep, toKeep => remainingAccountingItems.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingAccountingItems,
        remaning => accountingItemsToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
