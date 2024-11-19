using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Asst.Models;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateMainUsageTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(EstateMainUsageTypeInput)}}!) {
      estateMainUsageType {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.EstateMainUsageTypeFragment()
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
    var estateMainUsageTypeToUpdate = new EstateMainUsageTypeFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();
      await repository.AddAsync(estateMainUsageTypeToUpdate);
    }

    var input = new EstateMainUsageTypeInputFaker().Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateMainUsageTypeToUpdate.Id)
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
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

      var updatedEstateMainUsageType = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateMainUsageType>(estateMainUsageTypeToUpdate.Id));
      Assert.NotNull(updatedEstateMainUsageType);
      AssertHelper.Asst.EstateMainUsageTypeEqual(input, updatedEstateMainUsageType);
    }

    await Verify(result);
  }
}
