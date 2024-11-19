using System.Runtime.CompilerServices;
using Ardalis.Specification;
using HotChocolate.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Shared.Specifications;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BaseCanUseInternalCodeTests<TEntity> : SeededDbWebTest
  where TEntity : class, IIdentifiable, IInternallyCoded, IAggregateRoot
{
  protected readonly VerifySettings _verifySettings;

  protected virtual string ModuleName => typeof(TEntity).Name.CamelizeRespectingAcronyms();
  protected virtual string MethodName => "canUseInternalCode";
  protected virtual string InternalCodeParameterName => "internalCode";
  protected virtual string CurrentEntityIdParameterName => $"current{typeof(TEntity).Name}Id";

  protected string Query => $$"""
    query($internalCode: String!, $currentEntityId: Int) {
      {{ModuleName}} {
        {{MethodName}}({{InternalCodeParameterName}}: $internalCode, {{CurrentEntityIdParameterName}}: $currentEntityId)
      }
    }
    """;

  public BaseCanUseInternalCodeTests(SeededDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  [Fact]
  public virtual async Task Should_ReturntTrue_When_InternalCodeIsNotUsedByAnyEntity()
  {
    // Arrange
    var nonUsedInternalCode = Guid.NewGuid().ToString();

    var getQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("internalCode", nonUsedInternalCode)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(getQuery);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
        
    var canUseInternalCode = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetValue<bool>(MethodName);

    Assert.True(canUseInternalCode);
  }
  
  [Fact]
  public virtual async Task Should_ReturntTrue_When_InternalCodeIsUsedByCurrentEntity()
  {
    // Arrange
    int currentEntityId;
    string currentEntityInternalCode;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IReadRepository<TEntity>>();
      var specifications = Array.Empty<ISpecification<TEntity>>();

      if (typeof(TEntity).GetInterfaces().Any(@interface => @interface == typeof(ISoftDeletable)))
      {
        var entityNonDeletedSpecType = typeof(EntityNonDeletedSpec<>).MakeGenericType(typeof(TEntity));
        var entityNonDeletedSpec = (ISpecification<TEntity>)Activator.CreateInstance(entityNonDeletedSpecType)!;

        specifications = [entityNonDeletedSpec];
      }

      var firstEntity = await repository.AsQueryable(specifications).FirstAsync();

      currentEntityId = firstEntity.Id;
      currentEntityInternalCode = firstEntity.InternalCode;
    }

    var getQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("internalCode", currentEntityInternalCode)
      .SetVariableValue("currentEntityId", currentEntityId)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(getQuery);

    // Assert
    AssertSuccessGraphQLQueryResult(result);
        
    var canUseInternalCode = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetValue<bool>(MethodName);

    Assert.True(canUseInternalCode);
  }

  [Fact]
  public virtual async Task Should_ReturntFalse_When_InternalCodeIsInUse()
  {
    // Arrange
    string internalCodeInUse;

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IReadRepository<TEntity>>();
      var specifications = Array.Empty<ISpecification<TEntity>>();

      if (typeof(TEntity).GetInterfaces().Any(@interface => @interface == typeof(ISoftDeletable)))
      {
        var entityNonDeletedSpecType = typeof(EntityNonDeletedSpec<>).MakeGenericType(typeof(TEntity));
        var entityNonDeletedSpec = (ISpecification<TEntity>)Activator.CreateInstance(entityNonDeletedSpecType)!;

        specifications = [entityNonDeletedSpec];
      }

      internalCodeInUse = await repository.AsQueryable(specifications).Select(entity => entity.InternalCode).FirstAsync();
    }

    var getQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("internalCode", internalCodeInUse)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(getQuery);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    var canUseInternalCode = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetValue<bool>(MethodName);

    Assert.False(canUseInternalCode);
  }
}
