using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Nrgy.Models;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Nrgy;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(UtilityTypeInput)}}!) {
      utilityType {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Nrgy.UtilityTypeFragment()
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
    var utilityTypeToUpdate = new UtilityTypeFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityType>>();
      await repository.AddAsync(utilityTypeToUpdate);
    }

    var input = new UtilityTypeInputFaker().Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", utilityTypeToUpdate.Id)
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
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityType>>();

      var updatedUtilityType = await repository.SingleOrDefaultAsync(new GetByIdSpec<UtilityType>(utilityTypeToUpdate.Id));
      Assert.NotNull(updatedUtilityType);
      AssertHelper.Nrgy.UtilityTypeEqual(input, updatedUtilityType);
    }

    await Verify(result);
  }
}
