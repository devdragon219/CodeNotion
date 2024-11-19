using System.Reflection;
using HotChocolate.Execution;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Anag.Mutations;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteTests : BaseDeleteTests
{
  public DeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(SubjectMutations).GetMethod(nameof(SubjectMutations.Delete))!;
  protected override MethodInfo DeleteRangeEndpoint => typeof(SubjectMutations).GetMethod(nameof(SubjectMutations.DeleteByIds))!;

  [Fact]
  public async Task Should_DeleteById()
  {
    // Arrange
    var repo = Require<IRepository<Subject>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(61).Replace("id", "subjectId"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.Null(result?.Errors);
    Assert.NotNull(result?.Data);
    Assert.True(result.IsSuccess());

    var deleted = await repo.GetByIdAsync(61, CancellationToken.None);
    Assert.NotNull(deleted?.DeletionDate);
  }

  [Fact]
  public async Task Should_DeleteRangeByIds()
  {
    // Arrange
    var repo = Require<IRepository<Subject>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteRangeMutation(62))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);


    // Assert
    Assert.Null(result?.Errors);
    Assert.NotNull(result?.Data);
    Assert.True(result.IsSuccess());

    var deleted = await repo.GetByIdAsync(62, CancellationToken.None);
    Assert.NotNull(deleted?.DeletionDate);
  }

  protected override string DeleteMutation(int id) =>
    """
    mutation{
      subject{
        delete(subjectId: 61) {
          isSuccess
        }
      }
    }
    """;

  protected override string DeleteRangeMutation(params int[] ids) =>
    """
    mutation{
      subject{
        deleteByIds(subjectIds: [62]) {
          isSuccess
        }
      }
    }
    """;
}
