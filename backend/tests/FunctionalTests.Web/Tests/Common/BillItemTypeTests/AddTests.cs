using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.BillItemTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(BillItemTypeInput)}}!) {
      billItemType {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.BillItemTypeFragment())}}
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
    await using var scope = Provider.CreateAsyncScope();
    var vatRateRepo = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();
    var vatRates = await vatRateRepo.ListAsync();
    if (!vatRates.Any())
    {
      vatRates = new VATRateFaker().Generate(7);
      await vatRateRepo.AddRangeAsync(vatRates);
    }

    // Arrange
    var input = new BillItemTypeInputFaker()
      .UseVATRates(vatRates)
      .Generate();

    var addBillItemTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addBillItemTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedBillItemTypeId = result!.Data!
      .GetDictionaryValue("billItemType")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    var repository = scope.ServiceProvider.GetRequiredService<IRepository<BillItemType>>();

    var addedBillItemType = await repository.SingleOrDefaultAsync(new GetByIdSpec<BillItemType>(addedBillItemTypeId));
    Assert.NotNull(addedBillItemType);
    AssertHelper.Common.BillItemTypeEqual(input, addedBillItemType);

    await Verify(result);
  }
}
