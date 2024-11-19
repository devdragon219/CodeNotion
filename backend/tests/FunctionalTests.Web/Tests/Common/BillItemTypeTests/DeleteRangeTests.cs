using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Infrastructure.Prop.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Common.BillItemTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      billItemType {
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
    await using var scope = Provider.CreateAsyncScope();
    var vatRateRepo = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();
    var vatRates = await vatRateRepo.ListAsync();
    if (!vatRates.Any())
    {
      vatRates = new VATRateFaker().Generate(7);
      await vatRateRepo.AddRangeAsync(vatRates);
    }

    // Arrange
    var billItemTypes = new BillItemTypeFaker()
      .UseVATRates(vatRates)
      .Generate(4);
    var billItemTypesToKeep = billItemTypes.Take(2).ToArray();
    var billItemTypesToDelete = billItemTypes.Except(billItemTypesToKeep).ToArray();

    var repository = scope.ServiceProvider.GetRequiredService<IRepository<BillItemType>>();
    await repository.AddRangeAsync(billItemTypes);

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", billItemTypesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var checkscope = Provider.CreateAsyncScope())
    {
      var checkRepo = checkscope.ServiceProvider.GetRequiredService<IRepository<BillItemType>>();

      var remainingBillItemTypes = await checkRepo.ListAsync();
      Assert.Equal(billItemTypesToKeep.Length, remainingBillItemTypes.Count);
      Assert.All(billItemTypesToKeep, toKeep => remainingBillItemTypes.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingBillItemTypes,
        remaning => billItemTypesToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
