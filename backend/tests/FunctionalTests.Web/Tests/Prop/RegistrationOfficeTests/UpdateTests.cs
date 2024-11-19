using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationOfficeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(RegistrationOfficeInput)}}!) {
      registrationOffice {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.RegistrationOfficeFragment()
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
    var regOfficeToUpdate = new RegistrationOfficeFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationOffice>>();
      await repository.AddAsync(regOfficeToUpdate);
    }

    var input = new RegistrationOfficeInputFaker().Generate();

    var addRegOfficeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", regOfficeToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addRegOfficeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationOffice>>();

      var updatedRegOffice = await repository.SingleOrDefaultAsync(new GetByIdSpec<RegistrationOffice>(regOfficeToUpdate.Id));
      Assert.NotNull(updatedRegOffice);
      AssertHelper.Prop.RegistrationOfficeEqual(input, updatedRegOffice);
    }

    await Verify(result);
  }
}
