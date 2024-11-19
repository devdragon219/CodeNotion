using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate.Specification;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationPaymentTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(RegistrationPaymentInput)}}!) {
      registrationPayment {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.RegistrationPaymentFragment()
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
    RegistrationPayment registrationPaymentToUpdate;
    RegistrationPaymentInput registrationPaymentInput;

    using (var scope = Provider.CreateScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(await ContractTestsHelper.SeedEntities(scope.ServiceProvider));
      registrationPaymentToUpdate = new RegistrationPaymentFaker()
      {
        Contracts = contractFaker.Generate(2)
      }.Generate();

      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationPayment>>();
      await repository.AddAsync(registrationPaymentToUpdate);
    }

    using (var scope = Provider.CreateScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(await ContractTestsHelper.SeedEntities(scope.ServiceProvider));
      var contracts = contractFaker.Generate(2);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddRangeAsync(contracts);

      registrationPaymentInput = new RegistrationPaymentInputFaker()
      {
        Contracts = contracts
      }.Generate();

      var insertionMutation = QueryRequestBuilder.New()
        .SetQuery(Mutation)
        .SetVariableValue("id", registrationPaymentToUpdate.Id)
        .SetVariableValue("input", registrationPaymentInput)
        .SetUser(GetAdminClaims())
        .Create();

      // Act
      var result = await ExecuteGraphQLQueryAsync(insertionMutation);

      // Assert
      Assert.NotNull(result);
      Assert.True(result.IsSuccess());

      await Verify(result);
    }

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationPayment>>();

      var updatedRegPayment = await repository.AsQueryable(new GetByIdSpec<RegistrationPayment>(registrationPaymentToUpdate.Id), new RegistrationPaymentIncludeAllSpec()).SingleOrDefaultAsync();
      Assert.NotNull(updatedRegPayment);
      AssertHelper.Prop.RegistrationPaymentEqual(registrationPaymentInput, updatedRegPayment);
    }
  }
}
