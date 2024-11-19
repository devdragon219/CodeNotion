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

public abstract class BaseAddTests<TBaseEntity, TEntity, TInput> : EmptyDbWebTest
  where TBaseEntity : class, IIdentifiable, IAggregateRoot
  where TEntity : TBaseEntity
{
  private readonly VerifySettings _verifySettings;

  public virtual string InputTypeName => typeof(TInput).Name;
  public virtual string ModuleName => typeof(TBaseEntity).Name.CamelizeRespectingAcronyms();
  public virtual string MethodName => "add";
  public abstract string EntityFragment { get; }
  public virtual ISpecification<TBaseEntity>[] AdditionalSpecifications => [];

  public string Mutation => $$"""
    mutation($input: {{InputTypeName}}!) {
      {{ModuleName}} {
        {{MethodName}}(input: $input) {
          {{GraphQLHelper.ResultFragment(EntityFragment)}}
        }
      }
    }
    """;

  public BaseAddTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory)
  {
    _verifySettings = new VerifySettings();
    _verifySettings.UseDirectory(Path.GetDirectoryName(callerFilePath)!);
    _verifySettings.UseTypeName(GetType().Name);
  }

  [Fact]
  public async Task Should_Add()
  {
    // Arrange
    TInput input;

    await using (var scope = Provider.CreateAsyncScope())
    {
      input = await ArrangeAsync(scope.ServiceProvider);
    }

    var addMutation = QueryRequestBuilder.New()
      .SetQuery(Mutation)
      .SetVariableValue("input", input)
      .SetUser(GetAdminClaims())
      .Create();

    // Act
    var result = await ExecuteGraphQLQueryAsync(addMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    var addedEntityId = result.Data!
      .GetDictionaryValue(ModuleName)
      .GetDictionaryValue(MethodName)
      .GetDictionaryValue("value")
      .GetValue<int>("id");

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TBaseEntity>>();

      var addedEntity = await repository
        .AsQueryable([new GetByIdSpec<TBaseEntity>(addedEntityId), ..AdditionalSpecifications])
        .OfType<TEntity>()
        .SingleOrDefaultAsync();

      Assert.NotNull(addedEntity);
      await AssertAsync(scope.ServiceProvider, input, addedEntity);
    }

    await Verify(result, _verifySettings);
  }

  protected abstract Task<TInput> ArrangeAsync(IServiceProvider scopedServices);

  protected abstract Task AssertAsync(IServiceProvider scopedServices, TInput input, TEntity addedEntity);
}

public abstract class BaseAddTests<TEntity, TInput> : BaseAddTests<TEntity, TEntity, TInput>
  where TEntity : class, IIdentifiable, IAggregateRoot
{
  public BaseAddTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory, callerFilePath)
  {
  }
}
