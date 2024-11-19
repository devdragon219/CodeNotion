using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using RealGimm.FunctionalTests.Web.Extensions;
using RealGimm.SharedKernel.Interfaces;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BaseUpdateWithoutChangesTests<TEntity, TInput> : EmptyDbWebTest
  where TEntity : class, IIdentifiable, IAggregateRoot
{
  private readonly VerifySettings _verifySettings;

  public virtual string InputTypeName => typeof(TInput).Name;
  public virtual string InputParameterName => "input";
  public virtual string ModuleName => typeof(TEntity).Name.CamelizeRespectingAcronyms();
  public virtual string MethodName => "update";
  public virtual string IdParameterName => "id";
  public abstract string EntityFragment { get; }
  public virtual ISpecification<TEntity>[] AdditionalSpecifications => [];
  public string Mutation => $$"""
    mutation($id: Int!, $input: {{InputTypeName}}!) {
      {{ModuleName}} {
        {{MethodName}}({{IdParameterName}}: $id, {{InputParameterName}}: $input) {
          {{GraphQLHelper.ResultFragment(EntityFragment)}}
        }
      }
    }
    """;

  public BaseUpdateWithoutChangesTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  [Fact]
  public async Task Should_Update()
  {
    // Arrange
    TEntity entityToUpdate;
    TInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      entityToUpdate = await ArrangeAsync(scope.ServiceProvider);
      input = MapEntityToInput(entityToUpdate);
    }

    var updateMutation = QueryRequestBuilder
      .New()
      .SetQuery(Mutation)
      .SetVariableValue("id", entityToUpdate.Id)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TEntity>>();

      var updatedEntity = await repository
        .AsQueryable([new GetByIdSpec<TEntity>(entityToUpdate.Id), ..AdditionalSpecifications])
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedEntity);
      Assert.NotEqual(entityToUpdate, updatedEntity); // ensure that these are different instances
      await AssertAsync(scope.ServiceProvider, entityToUpdate, updatedEntity);
    }

    await Verify(result, _verifySettings);
  }

  protected abstract Task<TEntity> ArrangeAsync(IServiceProvider scopedServices);

  protected abstract TInput MapEntityToInput(TEntity entity);

  protected abstract Task AssertAsync(IServiceProvider scopedServices, TEntity entityToUpdate, TEntity updatedEntity);
}
