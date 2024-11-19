using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.FunctionalTests.Web.Fakers.IAM;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.WorkTeamTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      workTeam {
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
    WorkTeam[] workTeamsToKeep;
    WorkTeam[] workTeamsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
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

      var workTeams = await scope.ServiceProvider
        .GetRequiredService<IRepository<WorkTeam>>()
        .AddRangeAsync(workTeamFaker.Generate(4));

      workTeamsToKeep = workTeams.Take(2).ToArray();
      workTeamsToDelete = workTeams.Except(workTeamsToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", workTeamsToDelete.Select(x => x.Id).ToArray())
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
      var remainingWorkTeams = await repository.ListAsync();
      Assert.True(workTeamsToKeep.Zip(remainingWorkTeams).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
