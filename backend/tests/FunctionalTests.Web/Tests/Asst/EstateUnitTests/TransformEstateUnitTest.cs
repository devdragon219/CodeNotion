using HotChocolate.Execution;
using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class TransformEstateUnitTest : EstateUnitMutationTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(EstateUnitInput)}}!) {
      estateUnit {
        transform(id: $id, input: $input) {
          {{ResultFragment(EstateUnitSelector)}}
        }
      }
    }
    """;

  public TransformEstateUnitTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_TransformEstateUnit()
  {
    // Arrange
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var managementSubject = CreateManagementSubject(id: 1);
    var estate = CreateEstate(id: 1,
      managementSubject.Id,
      await usageTypeRepo.AsQueryable().FirstAsync(),
      await mainUsageTypeRepo.AsQueryable().FirstAsync());

    var estateUnitToTransform = CreateEstateUnit(id: default, estate, estate.Addresses[0], estate.Floors.Take(1), estate.Stairs[0]);

    // seeding data


    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var estateUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await estateUnitRepository.AddAsync(estateUnitToTransform);

    var estateUsageType = await firstScope.ServiceProvider
      .GetRequiredService<IRepository<EstateUsageType>>()
      .AddAsync(new EstateUsageTypeFaker().Generate());

    var input = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[1].Id,
      estate.Floors.Take(1).Select(x => x.Id),
      estateUsageType.Id,
      estate.Stairs[1].Id,
      cadastralUnit: CreateCadastralUnitInput(seed: 1));

    var splitEstateUnitMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateUnitToTransform.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(splitEstateUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    var newEstateUnitId = result!.Data!
      .GetDictionaryValue("estateUnit")
      .GetDictionaryValue("transform")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var estateUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

      var transformedEstateUnit = await estateUnitRepository2.SingleOrDefaultAsync(new GetByIdSpec<EstateUnit>(estateUnitToTransform.Id));
      Assert.NotNull(transformedEstateUnit);
      Assert.Equal(EstateUnitStatus.Transformed, transformedEstateUnit.Status);
      Assert.NotNull(transformedEstateUnit.DisusedDate);

      var newEstateUnit = await estateUnitRepository2
        .AsQueryable(new GetByIdSpec<EstateUnit>(newEstateUnitId), new EstateUnitIncludeAllSpec())
        .Include(estateUnit => estateUnit.CadastralUnits)
          .ThenInclude(cadastralUnit => cadastralUnit.Expenses)
        .Include(estateUnit => estateUnit.CadastralUnits)
          .ThenInclude(cadastralUnit => cadastralUnit.Unavailabilities)
        .SingleOrDefaultAsync();

      Assert.NotNull(newEstateUnit);
      AssertHelper.Asst.EstateUnitEqual(input, newEstateUnit);
    }
  }
}
