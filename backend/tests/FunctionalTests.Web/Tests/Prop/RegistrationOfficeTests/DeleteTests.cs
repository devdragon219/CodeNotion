using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Prop.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationOfficeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      registrationOffice {
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
    var regOfficeToDelete = new RegistrationOfficeFaker().Generate();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationOffice>>();
      await repository.AddAsync(regOfficeToDelete);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", regOfficeToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationOffice>>();

      var deletedRegOffice = await repository.SingleOrDefaultAsync(new GetByIdSpec<RegistrationOffice>(regOfficeToDelete.Id));
      Assert.Null(deletedRegOffice);
    }
  }
}
