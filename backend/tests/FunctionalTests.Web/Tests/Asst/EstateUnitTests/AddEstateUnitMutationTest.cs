using HotChocolate.Execution;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core.Common.OfficialActAggregate.Specifications;
using RealGimm.Core.Common.OfficialActAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddEstateUnitMutationTest : EstateUnitMutationTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(EstateUnitInput)}}!) {
      estateUnit {
        add(input: $input) {
          {{ResultFragment(EstateUnitSelector)}}
        }
      }
    }
    """;

  public AddEstateUnitMutationTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddEstateUnit()
  {
    // Arrange
    // seeding data
    using var firstscope = Provider.CreateScope();
    var usageTypeRepo = firstscope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>();
    var mainUsageTypeRepo = firstscope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>();
    
    var usageType = new EstateUsageTypeFaker().Generate();
    await usageTypeRepo.AddAsync(usageType);
    var mainUsageType = new EstateMainUsageTypeFaker().Generate();
    await mainUsageTypeRepo.AddAsync(mainUsageType);

    var managementSubject = CreateManagementSubject(id: 1);
    var estate = CreateEstate(id: 1, managementSubject.Id,
      await usageTypeRepo.AsQueryable().FirstAsync(),
      await mainUsageTypeRepo.AsQueryable().FirstAsync());
  
    var subjectRepository = firstscope.ServiceProvider.GetRequiredService<IRepository<Subject>>();
    var estateRepository = firstscope.ServiceProvider.GetRequiredService<IRepository<Estate>>();

    await subjectRepository.AddAsync(managementSubject);
    await estateRepository.AddAsync(estate);

    var input = CreateEstateUnitInput(
      estate.Id,
      estate.Addresses[0].Id,
      estate.Floors.Take(2).Select(x => x.Id),
      estate.UsageType.Id,
      estate.Stairs[0].Id,
      CreateOfficialActInput());

    var addEstateUnitMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addEstateUnitMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
    await Verify(result);

    var estateUnitId = result!.Data!
      .GetDictionaryValue("estateUnit")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var estateUnitRepository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();
      var officialActRepository = scope.ServiceProvider.GetRequiredService<IRepository<OfficialAct>>();

      var addedEstateUnit = await estateUnitRepository
        .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitId), new EstateUnitIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedEstateUnit);
      Assert.NotNull(addedEstateUnit.OfficialActId);
      AssertHelper.Asst.EstateUnitEqual(input, addedEstateUnit);

      var addedOfficialAct = await officialActRepository
        .AsQueryable(new GetByIdSpec<OfficialAct>(addedEstateUnit.OfficialActId.Value), new OfficialActIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedOfficialAct);
      AssertHelper.Equal(input.OfficialAct, addedOfficialAct, AssertHelper.Common.OfficialActEqual);
    }
  }
}
