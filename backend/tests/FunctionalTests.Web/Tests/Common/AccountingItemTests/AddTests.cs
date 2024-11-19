using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Common.AccountingItemTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(AccountingItemInput)}}!) {
      accountingItem {
        add(input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.AccountingItemFragment())
          }}
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
    var input = new AccountingItemInputFaker().Generate();

    var addAccountingItemMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addAccountingItemMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedAccountingItemId = result!.Data!
      .GetDictionaryValue("accountingItem")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AccountingItem>>();

      var addedAccountingItem = await repository.SingleOrDefaultAsync(new GetByIdSpec<AccountingItem>(addedAccountingItemId));
      Assert.NotNull(addedAccountingItem);
      AssertHelper.Common.AccountingItemEqual(input, addedAccountingItem);
    }

    await Verify(result);
  }
}
