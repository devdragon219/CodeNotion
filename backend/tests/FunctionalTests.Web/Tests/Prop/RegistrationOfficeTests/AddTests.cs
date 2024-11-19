using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationOfficeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(RegistrationOfficeInput)}}!) {
      registrationOffice {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.RegistrationOfficeFragment()
          )}}
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
    // Arrange
    var input = new RegistrationOfficeInputFaker().Generate();

    var addRegOfficeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addRegOfficeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedRegOfficeId = result!.Data!
      .GetDictionaryValue("registrationOffice")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationOffice>>();

      var addedRegOffice = await repository.SingleOrDefaultAsync(new GetByIdSpec<RegistrationOffice>(addedRegOfficeId));
      Assert.NotNull(addedRegOffice);
      AssertHelper.Prop.RegistrationOfficeEqual(input, addedRegOffice);
    }

    await Verify(result);
  }
}
