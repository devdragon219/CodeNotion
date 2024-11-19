using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.BillItemTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(BillItemTypeInput)}}!) {
      billItemType {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.BillItemTypeFragment()
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
    await using var scope = Provider.CreateAsyncScope();

    var vatRateRepo = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();
    var vatRates = await vatRateRepo.ListAsync();
    if (!vatRates.Any())
    {
      vatRates = new VATRateFaker().Generate(7);
      await vatRateRepo.AddRangeAsync(vatRates);
    }

    // Arrange
    var billItemTypeToUpdate = new BillItemTypeFaker()
      .UseVATRates(vatRates)
      .Generate();

    var repository = scope.ServiceProvider.GetRequiredService<IRepository<BillItemType>>();
    await repository.AddAsync(billItemTypeToUpdate);

    var billItemTypeId = billItemTypeToUpdate.Id;

    var input = new BillItemTypeInputFaker()
      .UseVATRates(vatRates)
      .Generate();

    var updateBillItemTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", billItemTypeId)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateBillItemTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var checkScope = Provider.CreateAsyncScope())
    {
      var checkRepo = checkScope.ServiceProvider.GetRequiredService<IRepository<BillItemType>>();

      var updatedBillItemType = await checkRepo.SingleOrDefaultAsync(new GetByIdSpec<BillItemType>(billItemTypeId));
      Assert.NotNull(updatedBillItemType);
      AssertHelper.Common.BillItemTypeEqual(input, updatedBillItemType);
    }

    await Verify(result);
  }
}
