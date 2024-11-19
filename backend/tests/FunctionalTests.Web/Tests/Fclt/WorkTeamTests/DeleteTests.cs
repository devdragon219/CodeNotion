using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.FunctionalTests.Web.Fakers.IAM;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.WorkTeamTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteTests : EmptyDbWebTest
{
  public string Mutation => $$"""
    mutation($id: Int!) {
      workTeam {
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
    WorkTeam workTeamToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<WorkTeam>>();

      var managementSubjects = await scope.ServiceProvider
        .GetRequiredService<IRepository<Subject>>()
        .AddRangeAsync(new ManagementSubjectFaker().Generate(2));

      var crafts = await scope.ServiceProvider
        .GetRequiredService<IRepository<Craft>>()
        .AddRangeAsync(new CraftFaker().Generate(2));

      var qualificationLevels = await scope.ServiceProvider
        .GetRequiredService<IRepository<QualificationLevel>>()
        .AddRangeAsync(new QualificationLevelFaker().Generate(2));

      var users = await scope.ServiceProvider
        .GetRequiredService<IRepository<User>>()
        .ListAsync();

      var workTeamFaker = new WorkTeamFaker
      {
        Subjects = managementSubjects,
        Users = users,
        WorkerFakerFactory = date => new WorkerFaker
        {
          MinSinceDate = date,
          Crafts = crafts,
          QualificationLevels = qualificationLevels
        }
      };

      workTeamToDelete = await scope.ServiceProvider
        .GetRequiredService<IRepository<WorkTeam>>()
        .AddAsync(workTeamFaker.Generate());
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", workTeamToDelete.Id)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<WorkTeam>>();

      var deletedWorkTeam = await repository.SingleOrDefaultAsync(
        new GetByIdSpec<WorkTeam>(workTeamToDelete.Id));

      Assert.Null(deletedWorkTeam);
    }
  }
}
