using HotChocolate.Execution;
using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Common.OfficialActAggregate.Specifications;
using RealGimm.Core.Common.OfficialActAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateEstateUnitTests : EstateUnitMutationTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(EstateUnitInput)}}!) {
      estateUnit {
        update(id: $id, input: $input) {
          {{ResultFragment(EstateUnitSelector)}}
        }
      }
    }
    """;

  public UpdateEstateUnitTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_UpdateEstateUnitAndDeleteOfficialAct()
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
    var officialActToDelete = CreateOfficialAct(id: 1);

    var estateUnitToUpdate = CreateEstateUnit(
      id: 1,
      estate,
      estate.Addresses[0],
      estate.Floors.Take(1),
      estate.Stairs[0],
      officialActToDelete.Id);

    // seeding data
    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var estateUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
    var officialActRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<OfficialAct>>();

    await subjectRepository.AddAsync(managementSubject);
    await officialActRepository.AddAsync(officialActToDelete);
    await estateUnitRepository.AddAsync(estateUnitToUpdate);

    var estateUsageType = await firstScope.ServiceProvider
      .GetRequiredService<IRepository<EstateUsageType>>()
      .AddAsync(new EstateUsageTypeFaker().Generate());

    var input = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[1].Id,
      estate.Floors.Take(2).Select(x => x.Id),
      estateUsageType.Id,
      estate.Stairs[1].Id);

    var updateEstateUnitMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateUnitToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateEstateUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    using (var scope = Provider.CreateScope())
    {
      var estateUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
      var officialActRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<OfficialAct>>();

      var updatedEstateUnit = await estateUnitRepository2
        .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitToUpdate.Id), new EstateUnitIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedEstateUnit);
      Assert.Null(updatedEstateUnit.OfficialActId);
      Assert.Null(await officialActRepository2.SingleOrDefaultAsync(new GetByIdSpec<OfficialAct>(officialActToDelete.Id)));
    }
  }

  [Fact]
  public async Task Should_UpdateEstateUnitAndAddOfficialAct()
  {
    // Arrange
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var managementSubject = CreateManagementSubject(id: 2);
    var estate = CreateEstate(id: 2,
      managementSubject.Id,
      await usageTypeRepo.AsQueryable().FirstAsync(),
      await mainUsageTypeRepo.AsQueryable().FirstAsync());
    var estateUnitToUpdate = CreateEstateUnit(id: 2, estate, estate.Addresses[0], estate.Floors.Take(1), estate.Stairs[0]);

    // seeding data

    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var estateUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await estateUnitRepository.AddAsync(estateUnitToUpdate);


    var input = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[1].Id,
      estate.Floors.Take(2).Select(x => x.Id),
      estate.UsageType.Id,
      estate.Stairs[1].Id,
      CreateOfficialActInput());

    var updateEstateUnitMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateUnitToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateEstateUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    using (var scope = Provider.CreateScope())
    {
      var estateUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
      var officialActRepository = scope.ServiceProvider.GetRequiredService<IRepository<OfficialAct>>();

      var updatedEstateUnit = await estateUnitRepository2
        .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitToUpdate.Id), new EstateUnitIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedEstateUnit);
      Assert.NotNull(updatedEstateUnit.OfficialActId);

      var addedOfficialAct = await officialActRepository
        .AsQueryable(new GetByIdSpec<OfficialAct>(updatedEstateUnit.OfficialActId.Value), new OfficialActIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedOfficialAct);
      AssertHelper.Equal(input.OfficialAct, addedOfficialAct, AssertHelper.Common.OfficialActEqual);
    }
  }

  [Fact]
  public async Task Should_UpdateEstateUnitAndUpdateOfficialAct()
  {
    // Arrange
    using var firstScope = Provider.CreateScope();
    var usageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var managementSubject = CreateManagementSubject(id: 3);
    var estate = CreateEstate(id: 3,
      managementSubject.Id,
      await usageTypeRepo.AsQueryable().FirstAsync(),
      await mainUsageTypeRepo.AsQueryable().FirstAsync());
    var officialActToUpdate = CreateOfficialAct(id: 1);

    var estateUnitToUpdate = CreateEstateUnit(
      id: 3,
      estate,
      estate.Addresses[0],
      estate.Floors.Take(1),
      estate.Stairs[0],
      officialActToUpdate.Id);

    // seeding data    
    var subjectRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var officialActRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<OfficialAct>>();
    var estateUnitRepository = firstScope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

    await subjectRepository.AddAsync(managementSubject);
    await officialActRepository.AddAsync(officialActToUpdate);
    await estateUnitRepository.AddAsync(estateUnitToUpdate);


    var input = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[1].Id,
      estate.Floors.Take(2).Select(x => x.Id),
      estate.UsageType.Id,
      estate.Stairs[1].Id,
      CreateOfficialActInput());

    var updateEstateUnitMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", estateUnitToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateEstateUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    using (var scope = Provider.CreateScope())
    {
      var estateUnitRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
      var officialActRepository2 = scope.ServiceProvider.GetRequiredService<IRepository<OfficialAct>>();

      var updatedEstateUnit = await estateUnitRepository2
        .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitToUpdate.Id), new EstateUnitIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedEstateUnit);
      Assert.Equal(officialActToUpdate.Id, updatedEstateUnit.OfficialActId);

      var updatedOfficialAct = await officialActRepository2
        .AsQueryable(new GetByIdSpec<OfficialAct>(officialActToUpdate.Id), new OfficialActIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedOfficialAct);
      AssertHelper.Equal(input.OfficialAct, updatedOfficialAct, AssertHelper.Common.OfficialActEqual);
    }
  }
}
