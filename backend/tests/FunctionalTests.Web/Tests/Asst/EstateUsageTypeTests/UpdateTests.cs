using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Asst.Models;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUsageTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(EstateUsageTypeInput)}}!) {
      estateUsageType {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Asst.EstateUsageTypeFragment()
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
    var estateUsageTypeToUpdate = new EstateUsageTypeFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
      await repository.AddAsync(estateUsageTypeToUpdate);
    }

    var input = new EstateUsageTypeInputFaker().Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateUsageTypeToUpdate.Id)
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
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();

      var updatedEstateUsageType = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateUsageType>(estateUsageTypeToUpdate.Id));
      Assert.NotNull(updatedEstateUsageType);
      AssertHelper.Asst.EstateUsageTypeEqual(input, updatedEstateUsageType);
    }

    await Verify(result);
  }
}
