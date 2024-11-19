using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceCategoryTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(ServiceCategoryInput)}}!) {
      serviceCategory {
        update(id: $id, input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Fclt.ServiceCategoryFragment())
          }}
        }
      }
    }
    """;

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Update()
  {
    // Arrange
    var categoryToUpdate = new ServiceCategoryFaker().Generate();

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<ServiceCategory>>();
      await repository.AddAsync(categoryToUpdate);
    }

    var input = new ServiceCategoryInputFaker().Generate();

    var updateServiceCategoryMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", categoryToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();
    
    // Act
    var result = await ExecuteGraphQLQueryAsync(updateServiceCategoryMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<ServiceCategory>>();

      var updatedServiceCategory = await repository
        .AsQueryable(new GetByIdSpec<ServiceCategory>(categoryToUpdate.Id), new ServiceCategoryIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedServiceCategory);
      AssertHelper.Fclt.ServiceCategoryEqual(input, updatedServiceCategory);
    }

    await Verify(result);
  }
}
