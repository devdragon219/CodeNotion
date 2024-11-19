using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate.Specification;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationPaymentTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(RegistrationPaymentInput)}}!) {
      registrationPayment {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.RegistrationPaymentFragment()
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
    RegistrationPaymentInput input;
    int addedRegistrationPaymentId;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(await ContractTestsHelper.SeedEntities(scope.ServiceProvider));
      var contracts = contractFaker.Generate(5);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddRangeAsync(contracts);

      input = new RegistrationPaymentInputFaker
      {
        Contracts = contracts
      };

      var addRegPaymentMutation = QueryRequestBuilder.New()
        .SetQuery(Mutation)
        .SetVariableValue("input", input)
        .SetUser(GetAdminClaims())
        .Create();

      // Act
      var result = await ExecuteGraphQLQueryAsync(addRegPaymentMutation);

      // Assert
      Assert.NotNull(result);
      Assert.True(result.IsSuccess());

      addedRegistrationPaymentId = result!.Data!
        .GetDictionaryValue("registrationPayment")
        .GetDictionaryValue("add")
        .GetDictionaryValue("value")
        .GetValue<int>("id");

      await Verify(result);
    }

      await using (var scope = Provider.CreateAsyncScope())
      {
        var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationPayment>>();

        var addedRegistrationPayment = await repository.AsQueryable(new GetByIdSpec<RegistrationPayment>(addedRegistrationPaymentId), new RegistrationPaymentIncludeAllSpec()).SingleOrDefaultAsync();
      Assert.NotNull(addedRegistrationPayment);
        AssertHelper.Prop.RegistrationPaymentEqual(input, addedRegistrationPayment);
      }
  }
}
