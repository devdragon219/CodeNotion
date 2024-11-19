using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Prop.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      contractType {
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
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var usageTypes = new EstateUsageTypeFaker().Generate(2);
    await usageTypeRepo.AddRangeAsync(usageTypes);

    var contractTypeToDelete = new ContractTypeFaker()
    {
      UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync()
    }.Generate();

    var repository = firstScope.ServiceProvider.GetRequiredService<IRepository<ContractType>>();
    await repository.AddAsync(contractTypeToDelete);


    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", contractTypeToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository2 = scope.ServiceProvider.GetRequiredService<IRepository<ContractType>>();

      var deletedContractType = await repository2.SingleOrDefaultAsync(new GetByIdSpec<ContractType>(contractTypeToDelete.Id));
      Assert.Null(deletedContractType);
    }
  }
}
