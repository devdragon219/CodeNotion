using HotChocolate.Execution;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.Web.Asst.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FloorTemplateTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public class AddFloorTemplateTest : EmptyDbWebTest
{
  private const string AddFloorTemplate =
    $$"""
    mutation($input: {{nameof(FloorTemplateInput)}}!) {
      floorTemplate {
        addFloorTemplate(input: $input) {
          isSuccess
          status
          value {
            name
            position
            id
            guid
            }           
          }
        }
    }    
    """;

  public AddFloorTemplateTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Fact]
  public async Task Should_AddFloorTemplateByQuery()
  {
    // Arrange
    var hasGroupLeaderQuery = QueryRequestBuilder.New()
      .SetQuery(AddFloorTemplate)
      .SetVariableValue("input", new FloorTemplateInput(Name: "Test Floor 1", Position: 2))
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(hasGroupLeaderQuery);

    // Assert
    Assert.NotNull(result);
    Assert.True(result.IsSuccess());

    await Verify(result);
  }
}
