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
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
    mutation($input: {{nameof(ServiceInput)}}!) {
      service {
        add(input: $input) {
          {{
            GraphQLHelper.ResultFragment(
              GraphQLHelper.Fclt.ServiceFragment())
          }}
        }
      }
    }
    """;

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_Add()
  {
    // Arrange
    var category = new ServiceCategoryFaker().Generate();
    using (var scope = Provider.CreateScope())
    {
      var categoryRepository = scope.ServiceProvider.GetRequiredService<IRepository<ServiceCategory>>();
      await categoryRepository.AddAsync(category);
    }
    
    var input = new ServiceInputFaker()
      .UseCategories(category)
      .Generate();

    var addServiceMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addServiceMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedServiceId = result.Data!
      .GetDictionaryValue("service")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var serviceRepository = scope.ServiceProvider.GetRequiredService<IRepository<Service>>();

      var addedService = await serviceRepository
        .AsQueryable(new GetByIdSpec<Service>(addedServiceId), new ServiceIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedService);
      AssertHelper.Fclt.ServiceEqual(input, addedService);
    }

    await Verify(result);
  }
}
