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
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTermTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(AdministrationTermInput)}}!) {
      administrationTerm {
        update(id: $id, input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Prop.AdministrationTermFragment(includeInstallments: true))
          }}
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
    AdministrationTerm administrationTermToUpdate;

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

      administrationTermToUpdate = new AdministrationTermFaker().Generate();

      var administration = administrationFaker.Generate();
      administration.Terms.Clear();
      administration.Terms.Add(administrationTermToUpdate);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Administration>>()
        .AddAsync(administration);
    }

    var input = new AdministrationTermInputFaker().Generate();

    var updateMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", administrationTermToUpdate.Id)
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
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AdministrationTerm>>();

      var updatedAdministrationTerm = await repository
        .AsQueryable(new GetByIdSpec<AdministrationTerm>(administrationTermToUpdate.Id), new AdministrationTermIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedAdministrationTerm);
      AssertHelper.Prop.AdministrationTermEqual(input, updatedAdministrationTerm);
    }

    await Verify(result);
  }
}
