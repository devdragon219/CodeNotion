using System.Reflection;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Fclt.Mutations;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteTests : BaseDeleteTests
{
  public DeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(ServiceMutations).GetMethod(nameof(ServiceMutations.Delete))!;
  protected override MethodInfo DeleteRangeEndpoint => typeof(ServiceMutations).GetMethod(nameof(ServiceMutations.DeleteRange))!;

  [Fact]
  public async Task Should_DeleteById()
  {
    // Arrange
    var repo = Require<IRepository<Service>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(1).Replace("id", "serviceId"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo.AsQueryable(new GetByIdSpec<Service>(1))
      .TagWith(SharedKernel.Constants.SKIP_ACCESS_FILTER)
      .FirstOrDefaultAsync();
    Assert.Null(deleted);
  }

  [Fact]
  public async Task Should_DeleteRangeByIds()
  {
    // Arrange
    var repo = Require<IRepository<Service>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteRangeMutation(2).Replace("ids", "serviceIds"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo
      .AsQueryable(new GetByIdSpec<Service>(2))
      .TagWith(SharedKernel.Constants.SKIP_ACCESS_FILTER)
      .FirstOrDefaultAsync();
    Assert.Null(deleted);
  }
}
