using System.Reflection;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Asst.Mutations;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteTests : BaseDeleteTests
{
  public DeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(CadastralUnitMutations).GetMethod(nameof(CadastralUnitMutations.Delete))!;
  protected override MethodInfo DeleteRangeEndpoint => typeof(CadastralUnitMutations).GetMethod(nameof(CadastralUnitMutations.DeleteRange))!;

  [Fact]
  public async Task Should_DeleteById()
  {
    // Arrange
    var repo = Require<IRepository<CadastralUnit>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(2))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo.GetByIdAsync(2, CancellationToken.None);
    Assert.NotNull(deleted);
    Assert.NotNull(deleted?.DeletionDate);
  }

  [Fact]
  public async Task Should_DeleteRangeByIds()
  {
    // Arrange
    var repo = Require<IRepository<CadastralUnit>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteRangeMutation(3))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());
    
    var deleted = await repo.GetByIdAsync(3, CancellationToken.None);
    Assert.NotNull(deleted);
    Assert.NotNull(deleted?.DeletionDate);
  }
}
