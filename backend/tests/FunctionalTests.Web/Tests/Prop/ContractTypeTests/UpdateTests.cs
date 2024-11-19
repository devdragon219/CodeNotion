using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Prop.Models;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(ContractTypeInput)}}!) {
      contractType {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.ContractTypeFragment()
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
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var usageTypes = new EstateUsageTypeFaker().Generate(2);
    await usageTypeRepo.AddRangeAsync(usageTypes);

    var contractTypeToUpdate = new ContractTypeFaker()
    {
      UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync()
    }.Generate();

    var repository = firstScope.ServiceProvider.GetRequiredService<IRepository<ContractType>>();
    await repository.AddAsync(contractTypeToUpdate);

    var input = new ContractTypeInputFaker()
      .UseEstateUsageTypeIds(
        await usageTypeRepo.AsQueryable().Select(ut => ut.Id).ToListAsync()
      )
      .Generate();

    var addContractTypeMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", contractTypeToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addContractTypeMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository2 = scope.ServiceProvider.GetRequiredService<IRepository<ContractType>>();

      var updatedContractType = await repository2.SingleOrDefaultAsync(new GetByIdSpec<ContractType>(contractTypeToUpdate.Id));
      Assert.NotNull(updatedContractType);
      AssertHelper.Prop.ContractTypeEqual(input, updatedContractType);
    }

    await Verify(result);
  }
}
