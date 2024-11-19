using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(ContractInput)}}!) {
      contract {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.Contract.Fragment()
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
    Contract contractToUpdate;
    ContractInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractFaker = ContractTestsHelper.CreateContractFaker(seededEntities);
      
      contractToUpdate = await scope.ServiceProvider
        .GetRequiredService<IRepository<Contract>>()
        .AddAsync(contractFaker.Generate());

      var contractInputFaker = ContractTestsHelper.CreateContractInputFaker(seededEntities);

      input = contractInputFaker.Generate();
    }

    var updateContractMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", contractToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateContractMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var updatedContract = await repository
        .AsQueryable(new GetByIdSpec<Contract>(contractToUpdate.Id), new ContractIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedContract);
      AssertHelper.Prop.Contract.Equal(input, updatedContract);
    }

    await Verify(result);
  }
}
