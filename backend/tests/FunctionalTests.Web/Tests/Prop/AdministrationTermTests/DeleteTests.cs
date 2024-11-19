using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Core;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.AdministrationAggregate.Specifications;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.AdministrationTermTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!) {
      administrationTerm {
        delete(id: $id) {
          {{GraphQLHelper.ResultFragment()}}
        }
      }
    }
    """;

  public DeleteTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Delete()
  {
    // Arrange
    AdministrationTerm administrationTermToDelete;

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
        .AddRangeAsync(new Fakers.Asst.EstateFaker
        {
          ManagementSubjectId = subject.Id,
          UsageTypes = usageTypes,
          MainUsageTypes = mainUsageTypes
        }.Generate(1));

      var administrationFaker = new AdministrationFaker
      {
        Subjects = new[] { subject },
        EstatesIds = estates.Select(estate => estate.Id)
      };

      administrationTermToDelete = new AdministrationTermFaker().Generate();

      var administration = administrationFaker.Generate();
      administration.Terms.Clear();
      administration.Terms.Add(administrationTermToDelete);

      await scope.ServiceProvider
        .GetRequiredService<IRepository<Administration>>()
        .AddAsync(administration);
    }

    var addMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", administrationTermToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addMutation);

    // Assert
    Assert.NotNull(result);

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<AdministrationTerm>>();

      var administrationTerm = await repository
        .SingleOrDefaultAsync(new GetByIdSpec<AdministrationTerm>(administrationTermToDelete.Id));

      Assert.Null(administrationTerm);
    }
  }
}
