﻿using System.Runtime.CompilerServices;
using HotChocolate.Execution;
using Humanizer;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BasePageableListTests<TEntity> : SeededDbWebTest
{
  private readonly VerifySettings _verifySettings;

  protected abstract string EntityFragment { get; }
  protected virtual string ModuleName => typeof(TEntity).Name.CamelizeRespectingAcronyms();
  protected virtual string MethodName => $"list{typeof(TEntity).Name.Pluralize()}";
  protected string Query => $$"""
    query($first: Int) {
      {{ModuleName}} {
        {{MethodName}}(first: $first) {
          {{GraphQLHelper.PagableListFragment(EntityFragment)}}
        }
      }
    }
    """;

  public BasePageableListTests(SeededDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  [Fact]
  public virtual async Task Should_ListFirst10Items()
  {
    // Arrange
    var getQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("first", 10)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(getQuery);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
        
    var data = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetDictionaryValue(MethodName);

    Assert.NotNull(data);
    await Verify(data, _verifySettings);
  }
}
