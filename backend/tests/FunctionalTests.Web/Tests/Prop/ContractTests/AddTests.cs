using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(ContractInput)}}!) {
      contract {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.Contract.Fragment(includeSublocatedContract: true, includeSubLocations: true))}}
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
    ContractInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var seededEntities = await ContractTestsHelper.SeedEntities(scope.ServiceProvider);
      var contractInputFaker = ContractTestsHelper.CreateContractInputFaker(seededEntities);
      
      input = contractInputFaker.Generate();
    }

    var addContractMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addContractMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    
    var addedContractTypeId = result!.Data!
      .GetDictionaryValue("contract")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

      var addedContract = await repository
        .AsQueryable(
          new GetByIdSpec<Contract>(addedContractTypeId),
          new ContractIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedContract);
      AssertHelper.Prop.Contract.Equal(input, addedContract);
    }

    await Verify(result);
  }
}
