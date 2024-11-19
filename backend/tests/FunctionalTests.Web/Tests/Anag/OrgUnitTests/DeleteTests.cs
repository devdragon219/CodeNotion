using System.Reflection;
using HotChocolate.Execution;
using RealGimm.Core;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Anag.Mutations;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.OrgUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteTests : BaseDeleteTests
{
  public DeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(OrgUnitMutations).GetMethod(nameof(OrgUnitMutations.Delete))!;
  protected override MethodInfo DeleteRangeEndpoint => throw new NotSupportedException();

  [Fact]
  public async Task Should_DeleteById()
  {
    // Arrange
    var repo = Require<IRepository<OrgUnit>>();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(12).Replace("id", "orgUnitId"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo.GetByIdAsync(12, CancellationToken.None);
    Assert.Null(deleted);
  }
}
