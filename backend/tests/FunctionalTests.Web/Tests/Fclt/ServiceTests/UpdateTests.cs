using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Fclt.ServiceAggregate.Specifications;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($id: Int!, $input: {{nameof(ServiceInput)}}!) {
      service {
        update(id: $id, input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Fclt.ServiceFragment())
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
    
    ICollection<ServiceCategory> categories;
    Service serviceToUpdate;

    using (var scope = Provider.CreateScope())
    {
      var categoryRepository = scope.ServiceProvider.GetRequiredService<IRepository<ServiceCategory>>();
      var serviceRepository = scope.ServiceProvider.GetRequiredService<IRepository<Service>>();

      categories = new ServiceCategoryFaker().Generate(3);
      await categoryRepository.AddRangeAsync(categories);

      serviceToUpdate = new ServiceFaker()
        .UseCategories(categories)
        .Generate();
      await serviceRepository.AddAsync(serviceToUpdate);
    }

    var input = new ServiceInputFaker()
      .UseCategories(categories.ToArray())
      .Generate();

    var updateServiceMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("id", serviceToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();
    
    // Act
    var result = await ExecuteGraphQLQueryAsync(updateServiceMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<Service>>();

      var updatedService = await repository
        .AsQueryable(new GetByIdSpec<Service>(serviceToUpdate.Id), new ServiceIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedService);
      AssertHelper.Fclt.ServiceEqual(input, updatedService);
    }

    await Verify(result);
  }
}
