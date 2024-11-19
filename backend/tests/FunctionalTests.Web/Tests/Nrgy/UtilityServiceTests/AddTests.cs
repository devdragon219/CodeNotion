using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Nrgy.Models;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Nrgy;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Common;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityServiceTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(UtilityServiceInput)}}!) {
      utilityService {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Nrgy.UtilityServiceFragment())}}
        }
      }
    }
    """;

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Add()
  {
    // Arrange
    UtilityServiceInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityService>>();

      var managementSubjects = await scope.ServiceProvider
        .GetRequiredService<IRepository<Subject>>()
        .AddRangeAsync(new ManagementSubjectFaker().Generate(2));

      var orgUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<OrgUnit>>()
        .AddRangeAsync(new OrgUnitFaker { Subjects = managementSubjects }.Generate(1));


      var usageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>()
        .AddRangeAsync(new EstateUsageTypeFaker().Generate(2));

      var mainUsageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>()
        .AddRangeAsync(new EstateMainUsageTypeFaker().Generate(2));

      var estates = await scope.ServiceProvider
        .GetRequiredService<IRepository<Estate>>()
        .AddRangeAsync(new Fakers.Asst.EstateFaker
        {
          ManagementSubjectId = managementSubjects.First().Id,
          UsageTypes = usageTypes,
          MainUsageTypes = mainUsageTypes
        }.Generate(2));

      var estateUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<EstateUnit>>()
        .AddRangeAsync(new Fakers.Asst.EstateUnitFaker { Estates = estates }.Generate(2));

      var accountingItems = await scope.ServiceProvider
        .GetRequiredService<IRepository<AccountingItem>>()
        .AddRangeAsync(new AccountingItemFaker().Generate(1));

      var utilityTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<UtilityType>>()
        .AddRangeAsync(new UtilityTypeFaker().Generate(1));

      var utilityServiceInputFaker = new UtilityServiceInputFaker
      {
        SubjectsIds = managementSubjects.Select(subject => subject.Id),
        OrgUnitsIds = orgUnits.Select(orgUnit => orgUnit.Id),
        EstateUnitsPerEstateIds = estates.Select(estate => (estate.Id, estate.EstateUnits.Select(eu => eu.Id))),
        AccountingItemsIds = accountingItems.Select(accountingItem => accountingItem.Id),
        UtilityTypeIds = utilityTypes.Select(utilityType => utilityType.Id).ToArray()
      };

      input = utilityServiceInputFaker.Generate();
    }

    var addUtilityServiceMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addUtilityServiceMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedUtilityServiceId = result!.Data!
      .GetDictionaryValue("utilityService")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<UtilityService>>();

      var addedUtilityService = await repository
        .AsQueryable(new GetByIdSpec<UtilityService>(addedUtilityServiceId), new UtilityServiceIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedUtilityService);
      AssertHelper.Nrgy.UtilityServiceEqual(input, addedUtilityService);
    }

    await Verify(result);
  }
}
