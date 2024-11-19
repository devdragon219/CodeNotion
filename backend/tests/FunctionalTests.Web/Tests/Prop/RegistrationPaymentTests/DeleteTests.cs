using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;
using RealGimm.Infrastructure.Prop.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationPaymentTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      registrationPayment {
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
    RegistrationPayment registrationPaymentToDelete;

    using (var scope = Provider.CreateScope())
    {
      var contractFaker = ContractTestsHelper.CreateContractFaker(await ContractTestsHelper.SeedEntities(scope.ServiceProvider));
      registrationPaymentToDelete = new RegistrationPaymentFaker()
      {
        Contracts = contractFaker.Generate(2)
      }.Generate();

      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationPayment>>();
      await repository.AddAsync(registrationPaymentToDelete);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", registrationPaymentToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<RegistrationPayment>>();

      var deletedRegPayment = await repository.SingleOrDefaultAsync(new GetByIdSpec<RegistrationPayment>(registrationPaymentToDelete.Id));
      Assert.Null(deletedRegPayment);
    }
  }
}
