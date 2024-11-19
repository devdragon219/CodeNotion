using HotChocolate.Execution;
using Xunit.Abstractions;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateSubUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddEstateSubUnitTest : EstateUnitMutationTest
{

  private readonly ITestOutputHelper _output;

  public AddEstateSubUnitTest(EmptyDbWebFactory factory, ITestOutputHelper output) : base(factory)
  {
    _output = output;
  }

  public const string AddEstateSubUnitMutation = """
    mutation($subInput: EstateSubUnitInput!) {
      estateSubUnit {
        add(subInput: $subInput) {
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
  public async Task Should_AddEstateSubUnit()
  {
    // Repositories
    var subjectRepo = Require<IRepository<Subject>>();
    var estateRepo = Require<IRepository<Estate>>();
    var estateUnitRepo = Require<IRepository<EstateUnit>>();
    var officialActRepo = Require<IRepository<OfficialAct>>();
    var orgUnitRepo = Require<IRepository<OrgUnit>>();
    var subUnitRepo = Require<IRepository<EstateSubUnit>>();
    var usageTypes = Require<IRepository<EstateUsageType>>();
    var mainUsageTypes = Require<IRepository<EstateMainUsageType>>();

    // Create subject and estate
    var managementSubject = await subjectRepo.AddAsync(CreateManagementSubject(id: 1));

    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypes.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypes.AddAsync(mainUsageType);

    var estate = await estateRepo.AddAsync(
      CreateEstate(id: 1,
        managementSubject.Id,
        await usageTypes.AsQueryable().FirstAsync(),
        await mainUsageTypes.AsQueryable().FirstAsync()
    ));

    // create estateUnit
    var officialAct = await officialActRepo.AddAsync(CreateOfficialAct(1));
    var estateUnit = await estateUnitRepo.AddAsync(CreateEstateUnit(1, estate, estate.Addresses[0], estate.Floors.Take(1), estate.Stairs[0], officialAct.Id));

    // create orgUnit
    var orgUnit = await orgUnitRepo.AddAsync(CreateOrgUnit(id: 1, managementSubject));

    // create estateSubUnit
    var input = CreateSubUnitInput(
        id: 1,
        estateUnitId: estateUnit.Id,
        occupantId: 1,
        orgUnitId: orgUnit.Id,
        estate.UsageType.Id);

    var addEstateSubUnitMutation = QueryRequestBuilder.New()
      .SetQuery(AddEstateSubUnitMutation)
      .SetVariableValue("subInput", input)
      .SetUser(GetAdminClaims())
      .Create();

    var result = await ExecuteGraphQLQueryAsync(addEstateSubUnitMutation);

    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    var addedSubUnit = await subUnitRepo
      .AsQueryable(new GetByIdSpec<EstateSubUnit>(1), new EstateSubUnitIncludeAllSpec())
      .FirstOrDefaultAsync();

    Assert.NotNull(addedSubUnit);

    AssertHelper.Equal(input, addedSubUnit, AssertSubUnitEqual);
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
      "CD_202310",
      estateUnitId,
      occupantId,
      50,
      100,
      orgUnitId,
      OccupantType.ThirdParties,
      usageTypeId,
      DateOnly.FromDateTime(DateTime.Parse("2023-11-01")),
      DateOnly.FromDateTime(DateTime.MaxValue),
      "Note"
    );

    return input;
  }

  private void AssertSubUnitEqual(EstateSubUnitInput subUnitInput, EstateSubUnit estateSubUnit)
  {
    Assert.Equal(subUnitInput.InternalCode, estateSubUnit.InternalCode);
    Assert.Equal(subUnitInput.OccupantType, estateSubUnit.OccupantType);
    Assert.Equal(subUnitInput.OccupantId, estateSubUnit.OccupantId);
    Assert.Equal(subUnitInput.UsageTypeId, estateSubUnit.UsageType?.Id);
    Assert.Equal(subUnitInput.OrgUnitId, estateSubUnit.OrgUnitId);
    Assert.Equal(subUnitInput.Since, estateSubUnit.Since);
    Assert.Equal(subUnitInput.Until, estateSubUnit.Until);
    Assert.Equal(subUnitInput.SurfaceSqM, estateSubUnit.SurfaceSqM);
    Assert.Equal(subUnitInput.OccupancyPercent, estateSubUnit.OccupancyPercent);
    Assert.Equal(subUnitInput.Note, estateSubUnit.Notes);
  }
}
