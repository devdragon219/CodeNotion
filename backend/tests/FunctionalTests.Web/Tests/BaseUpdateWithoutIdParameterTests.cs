using HotChocolate.Execution;
using RealGimm.SharedKernel.Interfaces;
using System.Runtime.CompilerServices;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BaseUpdateWithoutIdParameterTests<TBaseEntity, TEntity, TInput> : BaseUpdateTests<TBaseEntity, TEntity, TInput>
  where TBaseEntity : class, IIdentifiable, IAggregateRoot
  where TEntity : TBaseEntity
{
  public sealed override string Mutation => $$"""
    mutation($input: {{InputTypeName}}!) {
      {{ModuleName}} {
        {{MethodName}}({{InputParameterName}}: $input) {
          {{GraphQLHelper.ResultFragment(EntityFragment)}}
        }
      }
    }
    """;

  public BaseUpdateWithoutIdParameterTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory, callerFilePath)
  {
  }

  protected sealed override IQueryRequest BuildRequest(TEntity entityToUpdate, TInput input)
    => QueryRequestBuilder
        .New()
        .SetQuery(Mutation)
        .SetVariableValue("input", input)
        .SetUser(GetAdminClaims())
        .Create();
}

public abstract class BaseUpdateWithoutIdParameterTests<TEntity, TInput> : BaseUpdateWithoutIdParameterTests<TEntity, TEntity, TInput>
  where TEntity : class, IIdentifiable, IAggregateRoot
{
  public BaseUpdateWithoutIdParameterTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory, callerFilePath)
  {
  }
}
