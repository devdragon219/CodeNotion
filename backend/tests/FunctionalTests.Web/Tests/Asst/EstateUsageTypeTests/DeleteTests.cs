using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUsageTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      estateUsageType {
        delete(id: $id) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Delete()
  {
    // Arrange
    var estateUsageTypeToDelete = new EstateUsageTypeFaker().Generate();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
      await repository.AddAsync(estateUsageTypeToDelete);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateUsageTypeToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();

      var deletedEstateUsageType = await repository.SingleOrDefaultAsync(new GetByIdSpec<EstateUsageType>(estateUsageTypeToDelete.Id));
      Assert.Null(deletedEstateUsageType);
    }
  }
}
