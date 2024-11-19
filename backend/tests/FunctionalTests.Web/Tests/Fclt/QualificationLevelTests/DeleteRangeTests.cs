using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.QualificationLevelTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class DeleteRangeTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($ids: [Int!]!) {
      qualificationLevel {
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
    QualificationLevel[] qualificationLevelsToKeep;
    QualificationLevel[] qualificationLevelsToDelete;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var qualificationLevelFaker = new QualificationLevelFaker();

      var qualificationLevels = await scope.ServiceProvider
        .GetRequiredService<IRepository<QualificationLevel>>()
        .AddRangeAsync(qualificationLevelFaker.Generate(4));

      qualificationLevelsToKeep = qualificationLevels.Take(2).ToArray();
      qualificationLevelsToDelete = qualificationLevels.Except(qualificationLevelsToKeep).ToArray();
    }

    var deleteMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("ids", qualificationLevelsToDelete.Select(x => x.Id).ToArray())
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<QualificationLevel>>();
      var remainingQualificationLevels = await repository.ListAsync();
      Assert.True(qualificationLevelsToKeep.Zip(remainingQualificationLevels).All(pair => pair.First.Id == pair.Second.Id));
    }
  }
}
