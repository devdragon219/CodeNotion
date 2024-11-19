using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Prop.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationOfficeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      registrationOffice {
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
    var regOffices = new RegistrationOfficeFaker().Generate(4);
    var regOfficeToKeep = regOffices.Take(2).ToArray();
    var regOfficeToDelete = regOffices.Except(regOfficeToKeep).ToArray();

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationOffice>>();
      await repository.AddRangeAsync(regOffices);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", regOfficeToDelete.Select(x => x.Id).ToArray())
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

      var remainingRegOffices = await repository.ListAsync();
      Assert.Equal(regOfficeToKeep.Length, remainingRegOffices.Count);
      Assert.All(regOfficeToKeep, toKeep => remainingRegOffices.Select(x => x.Id).Contains(toKeep.Id));

      Assert.DoesNotContain(
        remainingRegOffices,
        remaning => regOfficeToDelete.Select(toDelete => toDelete.Id).Contains(remaning.Id));
    }
  }
}
