using System.Reflection;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Mutations;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class DeleteTests : BaseDeleteTests
{
  public DeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo DeleteEndpoint => typeof(ServiceCategoryMutations).GetMethod(nameof(ServiceCategoryMutations.Delete))!;
  protected override MethodInfo DeleteRangeEndpoint => typeof(ServiceCategoryMutations).GetMethod(nameof(ServiceCategoryMutations.DeleteRange))!;

  [Fact]
  public async Task Should_DeleteById()
  {
    // Arrange
    var repo = Require<IRepository<ServiceCategory>>();
    
    // add a new category that is not bound to a service 
    var category = await repo.AddAsync(new ServiceCategoryFaker().Generate());
    var categoryId = category.Id;
    
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteMutation(categoryId).Replace("id", "serviceCategoryId"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo.AsQueryable(new GetByIdSpec<ServiceCategory>(categoryId))
      .TagWith(SharedKernel.Constants.SKIP_ACCESS_FILTER)
      .FirstOrDefaultAsync();
    Assert.Null(deleted);
  }

  [Fact]
  public async Task Should_DeleteRangeByIds()
  {
    // Arrange
    var repo = Require<IRepository<ServiceCategory>>();
    
    // add new categories that are not bound to a service 
    var categories = await repo.AddRangeAsync(new ServiceCategoryFaker().Generate(2));
    var categoryIds = categories.Select(x => x.Id).ToArray();
    var deleteQuery = QueryRequestBuilder.New()
      .SetQuery(DeleteRangeMutation(categoryIds).Replace("ids", "serviceCategoryIds"))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(deleteQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var deleted = await repo
      .AsQueryable(new GetByIdsSpec<ServiceCategory>(categoryIds))
      .TagWith(SharedKernel.Constants.SKIP_ACCESS_FILTER)
      .ToArrayAsync();
    Assert.Empty(deleted);
  }
}
