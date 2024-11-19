using FunctionalTests.Tasks;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.Tasks;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;

namespace RealGimm.FunctionalTests.Tasks.Nrgy;

[Collection(nameof(EmptyDbCollection))]
public class CostChargeExpirationJobTests : JobTest<CostChargeExpirationJob>
{
  public CostChargeExpirationJobTests(EmptyDbHostProvider host) : base(host)
  {
  }

  [Fact]
  public async Task Should_CreateNotificationEvents_For_CostChargeNearToExpiration()
  {
    // Arrange
    CostCharge costChargeNearToEpiration;

    await using (var scope = Services.CreateAsyncScope())
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
        .AddRangeAsync(new Web.Fakers.Asst.EstateFaker
        {
          ManagementSubjectId = managementSubjects.First().Id,
          UsageTypes = usageTypes,
          MainUsageTypes = mainUsageTypes
        }.Generate(2));

      var estateUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<EstateUnit>>()
        .AddRangeAsync(new Web.Fakers.Asst.EstateUnitFaker { Estates = estates }.Generate(2));

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

      costChargeNearToEpiration = new CostChargeFaker { UtilityServices = utilityServices }.Generate();

      var todayDate = DateTime.UtcNow.ToDateOnly();
      costChargeNearToEpiration.SetDueDate(todayDate.AddDays(1));

      await scope.ServiceProvider
        .GetRequiredService<IRepository<CostCharge>>()
        .AddAsync(costChargeNearToEpiration);
    }

    // Act
    await ExecuteJobAsync();
  }
}
