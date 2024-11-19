using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityServiceTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      utilityService {
        deleteRange(ids: $ids) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteRangeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }


  [Fact]
  public async Task Should_DeleteRange()
  {
    // Arrange
    UtilityService[] utilityServicesToKeep;
    UtilityService[] utilityServicesToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityService>>();

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

      var utilityServices = await repository.AddRangeAsync(utilityServiceFaker.Generate(4));
      utilityServicesToKeep = utilityServices.Take(2).ToArray();
      utilityServicesToDelete = utilityServices.Except(utilityServicesToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", utilityServicesToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityService>>();
      var remainingUtilityServices = await repository.ListAsync();
      Assert.True(utilityServicesToKeep.Zip(remainingUtilityServices).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
