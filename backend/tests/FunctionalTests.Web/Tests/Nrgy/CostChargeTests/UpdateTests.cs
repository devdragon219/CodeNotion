using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Nrgy.Models;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Nrgy;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Common;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.CostChargeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(CostChargeInput)}}!) {
      costCharge {
        update(id: $id, input: $input) {
          {{GraphQLHelper.ResultFragment(GraphQLHelper.Nrgy.CostChargeFragment())}}
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
    CostCharge costChargeToUpdate;
    CostChargeInput input;

    using (var scope = Provider.CreateScope())
    {
      var managementSubjects = await scope.ServiceProvider
        .GetRequiredService<IRepository<Subject>>()
        .AddRangeAsync(new ManagementSubjectFaker().Generate(2));

      var orgUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<OrgUnit>>()
        .AddRangeAsync(new OrgUnitFaker { Subjects = managementSubjects }.Generate(2));

      var usageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>()
        .AddRangeAsync(new EstateUsageTypeFaker().Generate(2));

      var mainUsageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>()
        .AddRangeAsync(new EstateMainUsageTypeFaker().Generate(2));

      var estates = await scope.ServiceProvider
        .GetRequiredService<IRepository<Estate>>()
        .AddRangeAsync(new Fakers.Asst.EstateFaker {
            ManagementSubjectId = managementSubjects.First().Id,
            UsageTypes = usageTypes,
            MainUsageTypes = mainUsageTypes
          }.Generate(2));

      var estateUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<EstateUnit>>()
        .AddRangeAsync(new Fakers.Asst.EstateUnitFaker { Estates = estates }.Generate(2));

      var accountingItems = await scope.ServiceProvider
        .GetRequiredService<IRepository<AccountingItem>>()
        .AddRangeAsync(new AccountingItemFaker().Generate(2));

      var utilityTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<UtilityType>>()
        .AddRangeAsync(new UtilityTypeFaker().Generate(2));

      var utilityServiceFaker = new UtilityServiceFaker
      {
        SubjectsIds = managementSubjects.Select(subject => subject.Id),
        OrgUnitsIds = orgUnits.Select(orgUnit => orgUnit.Id),
        EstateUnitsPerEstateIds = estates.Select(estate => (estate.Id, estate.EstateUnits.Select(eu => eu.Id))),
        AccountingItemsIds = accountingItems.Select(accountingItem => accountingItem.Id),
        UtilityTypes = utilityTypes
      };

      var utilityServices = await scope.ServiceProvider
        .GetRequiredService<IRepository<UtilityService>>()
        .AddRangeAsync(utilityServiceFaker.Generate(2));

      costChargeToUpdate = await scope.ServiceProvider
        .GetRequiredService<IRepository<CostCharge>>()
        .AddAsync(new CostChargeFaker { UtilityServices = utilityServices }.Generate());

      input = new CostChargeInputFaker { UtilityServices = utilityServices }.Generate();
    }

    var updateMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", costChargeToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<CostCharge>>();

      var updatedCostCharge = await repository
        .AsQueryable(new GetByIdSpec<CostCharge>(costChargeToUpdate.Id), new CostChargeIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedCostCharge);
      AssertHelper.Nrgy.CostChargeEqual(input, updatedCostCharge);
    }

    await Verify(result);
  }
}
