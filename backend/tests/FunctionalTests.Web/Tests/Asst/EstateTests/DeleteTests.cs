using System.Reflection;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Asst.Mutations;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteTests : BaseDeleteTests
{
  public DeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(EstateMutations).GetMethod(nameof(EstateMutations.Delete))!;
  protected override MethodInfo DeleteRangeEndpoint => typeof(EstateMutations).GetMethod(nameof(EstateMutations.DeleteRange))!;

  [Fact]
  public async Task Should_DeleteById()
  {
    // Arrange
    var repo = Require<IRepository<Estate>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(1).Replace("id", "estateId"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo.AsQueryable(new GetByIdSpec<Estate>(1))
      .TagWith(SharedKernel.Constants.SKIP_ACCESS_FILTER)
      .FirstOrDefaultAsync();
    Assert.NotNull(deleted?.DeletionDate);
  }

  [Fact]
  public async Task Should_DeleteRangeByIds()
  {
    // Arrange
    var repo = Require<IRepository<Estate>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteRangeMutation(2).Replace("ids", "estateIds"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());
    
    var deleted = await repo
      .AsQueryable(new GetByIdSpec<Estate>(2))
      .TagWith(SharedKernel.Constants.SKIP_ACCESS_FILTER)
      .FirstOrDefaultAsync();
    Assert.NotNull(deleted?.DeletionDate);
  }
}
