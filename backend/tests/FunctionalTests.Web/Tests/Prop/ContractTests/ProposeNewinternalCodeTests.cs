using HotChocolate.Execution;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class ProposeNewinternalCodeTests : EmptyDbWebTest
{
  public string Query { get; } = $$"""
    query($isActiveContract: Boolean!) {
      contract {
        proposeNewInternalCode(isActiveContract: $isActiveContract)
      }
    }
    """;

  public ProposeNewinternalCodeTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  [Theory]
  [InlineData(true, "CA")]
  [InlineData(false, "CP")]
  public async Task Should_ProposeNewInternalCode(bool isActiveContract, string codePrefix)
  {
    // Arrange
    var addContractMutation = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("isActiveContract", isActiveContract)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addContractMutation);

    // Assert
    Assert.NotNull(result);

    var proposedCode = result?.Data?
      .GetDictionaryValue("contract")
      .GetValue<string>("proposeNewInternalCode");

    Assert.NotNull(proposedCode);
    Assert.NotEmpty(proposedCode);
    Assert.StartsWith(codePrefix, proposedCode);
  }
}
