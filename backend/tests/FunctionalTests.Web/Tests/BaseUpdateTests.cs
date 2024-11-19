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

public abstract class BaseUpdateTests<TBaseEntity, TEntity, TInput> : EmptyDbWebTest
  where TBaseEntity : class, IIdentifiable, IAggregateRoot
  where TEntity : TBaseEntity
{
  private readonly VerifySettings _verifySettings;

  public virtual string InputTypeName => typeof(TInput).Name;
  public virtual string InputParameterName => "input";
  public virtual string ModuleName => typeof(TBaseEntity).Name.CamelizeRespectingAcronyms();
  public virtual string MethodName => "update";
  public abstract string EntityFragment { get; }
  public virtual ISpecification<TBaseEntity>[] AdditionalSpecifications => [];
  public abstract string Mutation { get; }

  public BaseUpdateTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
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
      (entityToUpdate, input) = await ArrangeAsync(scope.ServiceProvider);
    }

    var updateMutation = BuildRequest(entityToUpdate, input);

    // Act
    var result = await ExecuteGraphQLQueryAsync(updateMutation);

    // Assert
    AssertSuccessGraphQLQueryResult(result);

    await using (var scope = Provider.CreateAsyncScope())
    {
      var repository = scope.ServiceProvider.GetRequiredService<IRepository<TBaseEntity>>();

      var updatedEntity = await repository
        .AsQueryable([new GetByIdSpec<TBaseEntity>(entityToUpdate.Id), ..AdditionalSpecifications])
        .OfType<TEntity>()
        .SingleOrDefaultAsync();

      Assert.NotNull(updatedEntity);
      await AssertAsync(scope.ServiceProvider, input, updatedEntity);
    }

    await Verify(result, _verifySettings);
  }

  protected abstract Task<(TEntity EntityToUpdate, TInput Input)> ArrangeAsync(IServiceProvider scopedServices);

  protected abstract Task AssertAsync(IServiceProvider scopedServices, TInput input, TEntity updatedEntity);

  protected abstract IQueryRequest BuildRequest(TEntity entityToUpdate, TInput input);
}
