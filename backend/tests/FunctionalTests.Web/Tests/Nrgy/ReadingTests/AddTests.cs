using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Core;
using RealGimm.Web.Nrgy.Models;
using RealGimm.Core.Nrgy.ReadingAggregate;
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
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Common;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.ReadingTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(ReadingInput)}}!) {
      reading {
        add(input: $input) {
          {{GraphQLHelper.ResultFragment(
              GraphQLHelper.Nrgy.ReadingFragment())}}
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
    ReadingInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var managementSubjects = await scope.ServiceProvider
        .GetRequiredService<IRepository<Subject>>()
        .AddRangeAsync(new ManagementSubjectFaker().Generate(2));
 
      var orgUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<OrgUnit>>()
        .AddRangeAsync(new OrgUnitFaker { Subjects = managementSubjects }.Generate(1));

      var estates = await scope.ServiceProvider
        .GetRequiredService<IRepository<Estate>>()
        .AddRangeAsync(
          new EstateFaker
          {
            ManagementSubjectId = managementSubjects.First().Id,
            MainUsageTypes = new Infrastructure.Asst.Data.Fakers.EstateMainUsageTypeFaker().Generate(1),
            UsageTypes = new Infrastructure.Asst.Data.Fakers.EstateUsageTypeFaker().Generate(1)
          }
          .Generate(2));

      var estateUnits = await scope.ServiceProvider
        .GetRequiredService<IRepository<EstateUnit>>()
        .AddRangeAsync(new EstateUnitFaker { Estates = estates }.Generate(2));

      var accountingItems = await scope.ServiceProvider
        .GetRequiredService<IRepository<AccountingItem>>()
        .AddRangeAsync(new AccountingItemFaker().Generate(1));

      var utilityTypes = await scope.ServiceProvider
        .GetRequiredService<IRepository<UtilityType>>()
        .AddRangeAsync(new UtilityTypeFaker().Generate(1));

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

      input = new ReadingInputFaker { UtilityServices = utilityServices }.Generate();
    }

    var addMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedReadingId = result!.Data!
      .GetDictionaryValue("reading")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Reading>>();

      var addedReading = await repository
        .AsQueryable(new GetByIdSpec<Reading>(addedReadingId))
        .Include(reading => reading.UtilityService)
        .SingleOrDefaultAsync();

      Assert.NotNull(addedReading);
      AssertHelper.Nrgy.ReadingEqual(input, addedReading);
    }

    await Verify(result);
  }
}
