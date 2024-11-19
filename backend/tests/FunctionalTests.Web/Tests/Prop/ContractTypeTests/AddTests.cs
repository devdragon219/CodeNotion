using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(ContractTypeInput)}}!) {
      contractType {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.ContractTypeFragment()
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
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var usageTypes = new EstateUsageTypeFaker().Generate(2);
    await usageTypeRepo.AddRangeAsync(usageTypes);
    
    var input = new ContractTypeInputFaker()
      .UseEstateUsageTypeIds(await usageTypeRepo.AsQueryable().Select(ut => ut.Id).ToListAsync())
      .Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addContractTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedContractTypeId = result!.Data!
      .GetDictionaryValue("contractType")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<ContractType>>();

      var addedContractType = await repository.SingleOrDefaultAsync(new GetByIdSpec<ContractType>(addedContractTypeId));
      Assert.NotNull(addedContractType);
      AssertHelper.Prop.ContractTypeEqual(input, addedContractType);
    }

    await Verify(result);
  }
}
