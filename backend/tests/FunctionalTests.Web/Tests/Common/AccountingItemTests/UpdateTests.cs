using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Common.AccountingItemTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(AccountingItemInput)}}!) {
      accountingItem {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.AccountingItemFragment()
          )}}
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
    var accountingItemToUpdate = new AccountingItemFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AccountingItem>>();
      await repository.AddAsync(accountingItemToUpdate);
    }

    var input = new AccountingItemInputFaker().Generate();

    var updateAccountingItem = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", accountingItemToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateAccountingItem);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AccountingItem>>();

      var updatedAccountingItem = await repository.SingleOrDefaultAsync(new GetByIdSpec<AccountingItem>(accountingItemToUpdate.Id));
      Assert.NotNull(updatedAccountingItem);
      AssertHelper.Common.AccountingItemEqual(input, updatedAccountingItem);
    }

    await Verify(result);
  }
}
