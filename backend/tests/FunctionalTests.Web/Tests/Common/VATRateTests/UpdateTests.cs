using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Common.Models;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Common.VATRateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(VATRateInput)}}!) {
      vatRate {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Common.VATRateFragment()
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
    var vatRateToUpdate = new VATRateFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();
      await repository.AddAsync(vatRateToUpdate);
    }

    var input = new VATRateInputFaker().Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", vatRateToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addContractTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<VATRate>>();

      var updatedVATRate = await repository.SingleOrDefaultAsync(new GetByIdSpec<VATRate>(vatRateToUpdate.Id));
      Assert.NotNull(updatedVATRate);
      AssertHelper.Common.VATRateEqual(input, updatedVATRate);
    }

    await Verify(result);
  }
}
