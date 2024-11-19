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
public sealed class AddTests : EmptyDbWebTest
{
  public string Mutation { get; } = $$"""
                                      mutation($input: {{nameof(ServiceCategoryInput)}}!) {
                                        serviceCategory {
                                          add(input: $input) {
                                            {{
                                              GraphQLHelper.ResultFragment(
                                                GraphQLHelper.Fclt.ServiceCategoryFragment())
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
    var input = new ServiceCategoryInputFaker().Generate();

    var addServiceCategoryMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addServiceCategoryMutation);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    var addedServiceCategoryId = result.Data!
      .GetDictionaryValue("serviceCategory")
      .GetDictionaryValue("add")
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<ServiceCategory>>();

      var addedServiceCategory = await repository
        .AsQueryable(new GetByIdSpec<ServiceCategory>(addedServiceCategoryId), new ServiceCategoryIncludeAllSpec())
        .SingleOrDefaultAsync();

      Assert.NotNull(addedServiceCategory);
      AssertHelper.Fclt.ServiceCategoryEqual(input, addedServiceCategory);
    }

    await Verify(result);
  }
}
