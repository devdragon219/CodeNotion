using System.Runtime.CompilerServices;
using HotChocolate.Execution;
using Humanizer;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BaseFullListTests<TEntity> : SeededDbWebTest
{
  private readonly VerifySettings _verifySettings;

  protected abstract string EntityFragment { get; }
  protected virtual string ModuleName => typeof(TEntity).Name.CamelizeRespectingAcronyms();
  protected virtual string MethodName => $"list{typeof(TEntity).Name.Pluralize()}Full";
  protected string Query => $$"""
    query {
      {{ModuleName}} {
        {{MethodName}} {
          {{EntityFragment}}
        }
      }
    }
    """;

  public BaseFullListTests(SeededDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  [Fact]
  public virtual async Task Should_ListAllItems()
  {
    // Arrange
    var getQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(getQuery);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
        
    var data = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetListValue(MethodName);

    Assert.NotNull(data);
    await Verify(data, _verifySettings);
  }
}
