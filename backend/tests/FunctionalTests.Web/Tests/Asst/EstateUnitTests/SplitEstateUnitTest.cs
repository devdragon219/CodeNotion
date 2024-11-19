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
public sealed class SplitEstateUnitTest : EstateUnitMutationTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $inputs: [{{nameof(EstateUnitInput)}}!]!) {
      estateUnit {
        split(id: $id, inputs: $inputs) {
          {{ResultFragment(EstateUnitSelector)}}
        }
      }
    }
    """;

  public SplitEstateUnitTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_SplitEstateUnit()
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

    var estateUnitToSplit = CreateEstateUnit(id: default, estate, estate.Addresses[0], estate.Floors.Take(1), estate.Stairs[0]);

    // seeding data


    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var estateUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await estateUnitRepository.AddAsync(estateUnitToSplit);

    var estateUsageTypes = await firstScope.ServiceProvider
      .GetRequiredService<IRepository<EstateUsageType>>()
      .AddRangeAsync(new EstateUsageTypeFaker().Generate(2));

    var input1 = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[1].Id,
      estate.Floors.Take(1).Select(x => x.Id),
      estateUsageTypes.First().Id,
      estate.Stairs[1].Id,
      cadastralUnit: CreateCadastralUnitInput(seed: 1));

    var input2 = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[2].Id,
      estate.Floors.Take(2).Select(x => x.Id),
      estateUsageTypes.Last().Id,
      estate.Stairs[2].Id,
      cadastralUnit: CreateCadastralUnitInput(seed: 2));

    var inputs = new[] { input1, input2 };

    var splitEstateUnitMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateUnitToSplit.Id)
      .SetVariableValue("inputs", inputs)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(splitEstateUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    var newEstateUnitsIds = result!.Data!
      .GetDictionaryValue("estateUnit")
      .GetDictionaryValue("split")
      .GetListOfDictionariesValue("value")
      .Select(value => value.GetValue<int>("id"));

    using (var scope = Provider.CreateScope())
    {
      var estateUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

      var splittedEstateUnit = await estateUnitRepository2.SingleOrDefaultAsync(new GetByIdSpec<EstateUnit>(estateUnitToSplit.Id));
      Assert.NotNull(splittedEstateUnit);
      Assert.Equal(EstateUnitStatus.DiscontinuedSplit, splittedEstateUnit.Status);
      Assert.NotNull(splittedEstateUnit.DisusedDate);

      var addedEstateUnit = await estateUnitRepository2
        .AsQueryable(new GetByIdsSpec<EstateUnit>(newEstateUnitsIds), new EstateUnitIncludeAllSpec())
        .Include(estateUnit => estateUnit.CadastralUnits)
          .ThenInclude(cadastralUnit => cadastralUnit.Expenses)
        .Include(estateUnit => estateUnit.CadastralUnits)
          .ThenInclude(cadastralUnit => cadastralUnit.Unavailabilities)
        .ToListAsync();

      Assert.Equal(inputs.Length, addedEstateUnit.Count);

      foreach (var (input, estateUnit) in inputs.Zip(addedEstateUnit))
      {
        AssertHelper.Asst.EstateUnitEqual(input, estateUnit);
      }
    }
  }
}
