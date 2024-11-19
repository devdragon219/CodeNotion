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
public sealed class MergeEstateUnitTest : EstateUnitMutationTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!, $input: {{nameof(EstateUnitInput)}}!) {
      estateUnit {
        merge(ids: $ids, input: $input) {
          {{ResultFragment(EstateUnitSelector)}}
        }
      }
    }
    """;

  public MergeEstateUnitTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_MergeEstateUnit()
  {
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

    var estateUnit1 = CreateEstateUnit(id: default, estate, estate.Addresses[0], estate.Floors.Take(1), estate.Stairs[0]);
    var estateUnit2 = CreateEstateUnit(id: default, estate, estate.Addresses[0], estate.Floors.Take(1), estate.Stairs[0]);

    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var estateUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await estateUnitRepository.AddAsync(estateUnit1);
    await estateUnitRepository.AddAsync(estateUnit2);

    var estateUsageType = await firstScope.ServiceProvider
      .GetRequiredService<IRepository<EstateUsageType>>()
      .AddAsync(new EstateUsageTypeFaker().Generate());

    var estateUnitToMerge = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[1].Id,
      estate.Floors.Take(1).Select(x => x.Id),
      estateUsageType.Id,
      estate.Stairs[1].Id,
      cadastralUnit: CreateCadastralUnitInput(seed: 1));

    var inputIds = new int[] { estateUnit1.Id, estateUnit2.Id };

    var mergeEstateUnitMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", inputIds)
      .SetVariableValue("input", estateUnitToMerge)
      .SetUser(GetAdminClaims())
      .Create();

    var result = await ExecuteGraphQLQueryAsync(mergeEstateUnitMutation);

    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    var newEstateUnitId = result!.Data!
      .GetDictionaryValue("estateUnit")
      .GetDictionaryValue("merge")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var estateUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
      var mergedEstateUnits = await estateUnitRepository2.AsQueryable(new GetByIdsSpec<EstateUnit>(new int[] { estateUnit1.Id, estateUnit2.Id })).ToListAsync();
      foreach (var mergedEstateUnit in mergedEstateUnits)
      {
        Assert.NotNull(mergedEstateUnit);
        Assert.Equal(EstateUnitStatus.DiscontinuedMerge, mergedEstateUnit.Status);
      }

      var addedEstateUnit = await estateUnitRepository2
        .AsQueryable(new GetByIdSpec<EstateUnit>(newEstateUnitId), new EstateUnitIncludeAllSpec())
        .Include(estateUnit => estateUnit.CadastralUnits)
          .ThenInclude(cadastralUnit => cadastralUnit.Coordinates)
        .Include(estateUnit => estateUnit.CadastralUnits)
          .ThenInclude(cadastralUnit => cadastralUnit.Expenses)
        .Include(estateUnit => estateUnit.CadastralUnits)
          .ThenInclude(cadastralUnit => cadastralUnit.Unavailabilities)
        .FirstOrDefaultAsync();

      Assert.NotNull(addedEstateUnit);
      AssertHelper.Asst.EstateUnitEqual(estateUnitToMerge, addedEstateUnit);
    }
  }
}
