using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FunctionAreaTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      functionArea {
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
    var functionAreaToDelete = new FunctionAreaFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();
      await repository.AddAsync(functionAreaToDelete);
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", functionAreaToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();

      var deletedFunctionArea = await repository.SingleOrDefaultAsync(new GetByIdSpec<FunctionArea>(functionAreaToDelete.Id));
      Assert.Null(deletedFunctionArea);
    }
  }

  [Fact]
  public async Task Should_ReturnValidationError_When_DeletingUsedFunctionArea()
  {
    // Arrange
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

    var functionAreaToTryDelete = new FunctionAreaFaker().Generate();

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var estateUnit = await CreateEstateUnitWithSurface(functionAreaToTryDelete,
      usageTypeRepo,
      mainUsageTypeRepo);

    var repository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
    await repository.AddAsync(estateUnit);


    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", functionAreaToTryDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.NotNull(result.Data);
    Assert.Null(result.Errors);

    var validationError = Assert.Single(result.Data
      .GetDictionaryValue("functionArea")
      .GetDictionaryValue("delete")
      .GetListOfDictionariesValue("validationErrors"));

    Assert.Equal(ErrorCode.ItemInUseCannotBeDeleted.Name, validationError.GetValue<string>("errorCode"));

    using (var scope = Provider.CreateScope())
    {
      var repository2 = scope.ServiceProvider.GetRequiredService<IRepository<FunctionArea>>();

      var functionArea = await repository2.SingleOrDefaultAsync(new GetByIdSpec<FunctionArea>(functionAreaToTryDelete.Id));
      Assert.NotNull(functionArea);
    }
  }

  private static async Task<EstateUnit> CreateEstateUnitWithSurface(
    FunctionArea surfaceFunctionArea,
    IRepository<EstateUsageType> usageTypeRepo,
    IRepository<EstateMainUsageType> mainUsageTypeRepo)
  {
    var estate = EstateUnitTests.EstateUnitMutationTest.CreateEstate(
        id: 1,
        1,
        await usageTypeRepo.AsQueryable().FirstAsync(),
        await mainUsageTypeRepo.AsQueryable().FirstAsync());

    var estateUnitSurface = new EstateUnitSurface();
    estateUnitSurface.SetFunctionArea(surfaceFunctionArea);

    var estateUnit = EstateUnitTests.EstateUnitMutationTest.CreateEstateUnit(
      id: 1,
      estate,
      estate.Addresses[0],
      estate.Floors.Take(1),
      estate.Stairs[0],
      surfaces: new[] { estateUnitSurface });

    return estateUnit;
  }
}
