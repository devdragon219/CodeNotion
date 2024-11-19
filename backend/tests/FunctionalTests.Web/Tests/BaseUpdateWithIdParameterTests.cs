using HotChocolate.Execution;
using RealGimm.SharedKernel.Interfaces;
using System.Runtime.CompilerServices;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BaseUpdateWithIdParameterTests<TBaseEntity, TEntity, TInput> : BaseUpdateTests<TBaseEntity, TEntity, TInput>
  where TBaseEntity : class, IIdentifiable, IAggregateRoot
  where TEntity : TBaseEntity
{
  public virtual string IdParameterName => "id";

  public sealed override string Mutation => $$"""
    mutation($id: Int!, $input: {{InputTypeName}}!) {
      {{ModuleName}} {
        {{MethodName}}({{IdParameterName}}: $id, {{InputParameterName}}: $input) {
          {{GraphQLHelper.ResultFragment(EntityFragment)}}
        }
      }
    }
    """;

  public BaseUpdateWithIdParameterTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory, callerFilePath)
  {
  }

  protected sealed override IQueryRequest BuildRequest(TEntity entityToUpdate, TInput input)
    => QueryRequestBuilder
        .New()
        .SetQuery(Mutation)
        .SetVariableValue("id", entityToUpdate.Id)
        .SetVariableValue("input", input)
        .SetUser(GetAdminClaims())
        .Create();
}

public abstract class BaseUpdateWithIdParameterTests<TEntity, TInput> : BaseUpdateWithIdParameterTests<TEntity, TEntity, TInput>
  where TEntity : class, IIdentifiable, IAggregateRoot
{
  public BaseUpdateWithIdParameterTests(EmptyDbWebFactory factory, [CallerFilePath] string callerFilePath = "")
    : base(factory, callerFilePath)
  {
  }
}
