using HotChocolate.Execution;
using Xunit.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateSubUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateEstateSubUnitTest : EstateUnitMutationTest
{

  private readonly ITestOutputHelper _output;

  public UpdateEstateSubUnitTest(EmptyDbWebFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  public const string UpdateEstateSubUnitMutation = """
    mutation($subInput: EstateSubUnitInput!) {
      estateSubUnit {
        update(subInput: $subInput) {
          isSuccess
          status
          value {
              internalCode
              occupantType
              occupantId
              usageType {
                  name
              }
              orgUnitId
              since
              deletionDate
              until
              id
              occupancyPercent
              surfaceSqM
              notes
              estateUnit {
                  name
              }
          }
          validationErrors {
            identifier
            errorMessage
            errorCode
            severity
          }
        }
      }
    }
    """;


  [Fact]
  public async Task Should_UpdateEstateSubUnit()
  {
    EstateSubUnit insertedSubUnit;

    using (var scope = Provider.CreateScope())
    {
      // Repositories
      var subjectRepo = scope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
      var estateRepo = scope.ServiceProvider.GetRequiredService<IRepository<Estate>>();
      var estateUnitRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
      var officialActRepo = scope.ServiceProvider.GetRequiredService<IRepository<OfficialAct>>();
      var orgUnitRepo = scope.ServiceProvider.GetRequiredService<IRepository<OrgUnit>>();
      var subUnitRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateSubUnit>>();
      var usageTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
      var mainUsageTypeRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();

      // Create subject and estate
      var managementSubject = await subjectRepo.AddAsync(CreateManagementSubject(id: 1));

      var estateUsageTypes = new EstateUsageTypeFaker().Generate(2);
      await usageTypeRepo.AddRangeAsync(estateUsageTypes);

      var mainEstateUsageTypes = new EstateMainUsageTypeFaker().Generate(2);
      await mainUsageTypeRepo.AddRangeAsync(mainEstateUsageTypes);

      var estate = await estateRepo.AddAsync(
        CreateEstate(id: 1,
          managementSubject.Id,
          await usageTypeRepo.AsQueryable().FirstAsync(),
          await mainUsageTypeRepo.AsQueryable().FirstAsync()
        ));

      // create estateUnit
      var officialAct = await officialActRepo.AddAsync(CreateOfficialAct(1));
      var estateUnit = await estateUnitRepo.AddAsync(CreateEstateUnit(1, estate, estate.Addresses[0], estate.Floors.Take(1), estate.Stairs[0], officialAct.Id));

      // create orgUnit
      var orgUnit = await orgUnitRepo.AddAsync(CreateOrgUnit(id: 1, managementSubject));

      EstateSubUnit newSubUnit = new(1, "SUB_202311");
      newSubUnit.SetOrgUnitId(orgUnit.Id);

      newSubUnit.SetUsageType(estate.UsageType);
      newSubUnit.SetSurface(70);
      newSubUnit.SetOccupancyDates(DateOnly.Parse("2022-11-01"), DateOnly.Parse("2022-11-01"));
      newSubUnit.SetOccupancy(OccupantType.CommonArea, 1, 80);
      newSubUnit.SetNotes("TestNote");

      estateUnit.AddSubUnit(newSubUnit);
      insertedSubUnit = await subUnitRepo.AddAsync(newSubUnit);

      // create estateSubUnit
      var input = CreateSubUnitInput(
        id: 1,
        estateUnitId: estateUnit.Id,
        occupantId: 1,
        orgUnitId: orgUnit.Id,
        usageTypeId: estate.UsageType.Id);

      var updateEstateSubUnitMutation = QueryRequestBuilder.New()
        .SetQuery(UpdateEstateSubUnitMutation)
        .SetVariableValue("subInput", input)
        .SetUser(GetAdminClaims())
        .Create();

      var result = await ExecuteGraphQLQueryAsync(updateEstateSubUnitMutation);

      AssertSuccessGraphQLQueryResult(result);
      await Verify(result);
    }

    using (var scope = Provider.CreateScope())
    {
      var subUnitRepo = scope.ServiceProvider.GetRequiredService<IRepository<EstateSubUnit>>();

      var updatedSubUnit = await subUnitRepo
        .AsQueryable(new GetByIdSpec<EstateSubUnit>(1), new EstateSubUnitIncludeAllSpec())
        .FirstOrDefaultAsync();

      Assert.NotNull(updatedSubUnit);
      AssertSubUnitEqual(insertedSubUnit, updatedSubUnit);
    }
  }

  private static OrgUnit CreateOrgUnit(int id, Subject parentSubject)
  {
    var orgUnit = new OrgUnit();
    orgUnit.SetType(OrgUnitType.ManagementHierarchy);
    orgUnit.SetName("OrgUnitName");
    orgUnit.SetInternalCode("CodeOrgUnit");
    orgUnit.SetExternalCode("AdditionalCode");
    orgUnit.Id = id;

    orgUnit.SetParentSubject(parentSubject);
    return orgUnit;
  }

  private static EstateSubUnitInput CreateSubUnitInput(
    int id,
    int estateUnitId,
    int occupantId,
    int orgUnitId,
    int usageTypeId)
  {
    EstateSubUnitInput input = new(
      id,
      "SUB_202311",
      estateUnitId,
      occupantId,
      50,
      100,
      orgUnitId,
      OccupantType.ThirdParties,
      usageTypeId,
      DateOnly.FromDateTime(DateTime.Parse("2023-11-24")),
      DateOnly.FromDateTime(DateTime.MaxValue),
      "Note"
    );

    return input;
  }

  private void AssertSubUnitEqual(EstateSubUnit insertedSubUnit, EstateSubUnit updatedSubUnit)
  {
    Assert.Equal(insertedSubUnit.InternalCode, updatedSubUnit.InternalCode);
    Assert.NotEqual(insertedSubUnit.OccupantType, updatedSubUnit.OccupantType);
    Assert.NotEqual(insertedSubUnit.SurfaceSqM, updatedSubUnit.SurfaceSqM);
    Assert.NotEqual(insertedSubUnit.OccupancyPercent, updatedSubUnit.OccupancyPercent);
    Assert.NotEqual(insertedSubUnit.Notes, updatedSubUnit.Notes);
  }
}
