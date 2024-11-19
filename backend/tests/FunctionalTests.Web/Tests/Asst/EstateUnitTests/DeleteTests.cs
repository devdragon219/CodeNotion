using System.Reflection;
using HotChocolate.Execution;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Asst.Mutations;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteTests : BaseDeleteTests
{
  public DeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(EstateUnitMutations).GetMethod(nameof(EstateUnitMutations.Delete))!;
  protected override MethodInfo DeleteRangeEndpoint => typeof(EstateUnitMutations).GetMethod(nameof(EstateUnitMutations.DeleteRange))!;

  [Fact]
  public async Task Should_DeleteById()
  {
    // Arrange
    var repo = Require<IRepository<EstateUnit>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(12))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo.GetByIdAsync(12, CancellationToken.None);
    Assert.NotNull(deleted?.DeletionDate);
  }

  [Fact]
  public async Task Should_DeleteRangeByIds()
  {
    // Arrange
    var repo = Require<IRepository<EstateUnit>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteRangeMutation(13, 14))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());
    
    var deleted = await repo.GetByIdAsync(13, CancellationToken.None);
    Assert.NotNull(deleted?.DeletionDate);
    deleted = await repo.GetByIdAsync(14, CancellationToken.None);
    Assert.NotNull(deleted?.DeletionDate);
  }
}
