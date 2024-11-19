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

public abstract class BaseGetTests<TEntity> : SeededDbWebTest
  where TEntity : class, IIdentifiable, IAggregateRoot
{
  protected readonly VerifySettings _verifySettings;

  protected abstract string EntityFragment { get; }
  protected virtual string ModuleName => typeof(TEntity).Name.CamelizeRespectingAcronyms();
  protected virtual string MethodName => "get";
  protected virtual string IdParameterName => "id";
  protected string Query => $$"""
    query($id: Int!) {
      {{ModuleName}} {
        {{MethodName}}({{IdParameterName}}: $id) {
          {{EntityFragment}}
        }
      }
    }
    """;

  public BaseGetTests(SeededDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  [Fact]
  public virtual async Task Should_GetFirstEntityById()
  {
    // Arrange
    int entityToGetId;

    using (var scope = Provider.CreateScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IReadRepository<TEntity>>();
      var specifications = Array.Empty<ISpecification<TEntity>>();

      if (typeof(TEntity).GetInterfaces().Any(@interface => @interface == typeof(ISoftDeletable)))
      {
        var entityNonDeletedSpecType = typeof(EntityNonDeletedSpec<>).MakeGenericType(typeof(TEntity));
        var entityNonDeletedSpec = (ISpecification<TEntity>)Activator.CreateInstance(entityNonDeletedSpecType)!;

        specifications = [entityNonDeletedSpec];
      }

      entityToGetId = await repository
        .AsQueryable(specifications)
        .OrderBy(entity => entity.Id)
        .Select(entity => entity.Id)
        .FirstAsync();
    }

    var getQuery = QueryRequestBuilder.New()
      .SetQuery(Query)
      .SetVariableValue("id", entityToGetId)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(getQuery);

    // Assert
    Assert.NotNull(result);
    Assert.Empty(result.Errors ?? []);
        
    var entityDetails = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetDictionaryValue(MethodName);

    Assert.NotNull(entityDetails);
    await Verify(entityDetails, _verifySettings);
  }
}
