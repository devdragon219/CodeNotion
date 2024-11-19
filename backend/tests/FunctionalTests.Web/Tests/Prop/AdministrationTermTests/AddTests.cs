using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core;
using RealGimm.Web.Prop.Models;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Prop;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.AdministrationAggregate.Specifications;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate.Specifications;
using System.Linq;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTermTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($administrationId: Int!, $input: {{nameof(AdministrationTermInput)}}!) {
      administrationTerm {
        add(administrationId: $administrationId, input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.AdministrationTermFragment(includeInstallments: true))
          }}
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
    int administrationId;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var subject = await scope.ServiceProvider
        .GetRequiredService<IRepository<Subject>>()
        .AddAsync(new ManagementSubjectFaker().Generate());

      var usageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateUsageType>>()
        .AddRangeAsync(new EstateUsageTypeFaker().Generate(2));

      var mainUsageTypes = await scope.ServiceProvider.GetRequiredService<IRepository<EstateMainUsageType>>()
        .AddRangeAsync(new EstateMainUsageTypeFaker().Generate(2));

      var estates = await scope.ServiceProvider
        .GetRequiredService<IRepository<Estate>>()
        .AddRangeAsync(new Fakers.Asst.EstateFaker {
            ManagementSubjectId = subject.Id,
            UsageTypes = usageTypes,
            MainUsageTypes = mainUsageTypes
          }.Generate(1));

      var administrationFaker = new AdministrationFaker
      {
        Subjects = new[] { subject },
        EstatesIds = estates.Select(estate => estate.Id)
      };

      var administration = await scope.ServiceProvider
        .GetRequiredService<IRepository<Administration>>()
        .AddAsync(administrationFaker.Generate());

      administrationId = administration.Id;
    }

    var input = new AdministrationTermInputFaker().Generate();

    var addMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("administrationId", administrationId)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedAdministrationTermId = result!.Data!
      .GetDictionaryValue("administrationTerm")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AdministrationTerm>>();

      var administrationTerm = await repository
        .AsQueryable(new GetByIdSpec<AdministrationTerm>(addedAdministrationTermId), new AdministrationTermIncludeAllSpec())
        .Where(administrationTerm => administrationTerm.Administration.Id == administrationId)
        .SingleOrDefaultAsync();

      Assert.NotNull(administrationTerm);
      AssertHelper.Prop.AdministrationTermEqual(input, administrationTerm);
    }

    await Verify(result);
  }
}
