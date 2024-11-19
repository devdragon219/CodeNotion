using System.Reflection;
using RealGimm.FunctionalTests.Web.Extensions;

namespace RealGimm.FunctionalTests.Web.Tests;

public abstract class BaseDeleteTests : SeededDbWebTest
{
  public BaseDeleteTests(SeededDbWebFactory factory) : base(factory)
  {
  }
  
  protected abstract MethodInfo DeleteEndpoint { get; }
  protected abstract MethodInfo DeleteRangeEndpoint { get; }

  protected virtual string DeleteMutation(int id)
  {
    return BaseDeleteMutation
      .Replace("{Class}", DeleteEndpoint.DeclaringType!.Name.CamelizeRespectingAcronyms().Replace("Mutations", string.Empty))
      .Replace("{Method}", DeleteEndpoint.Name.CamelizeRespectingAcronyms())
      .Replace("{Value}", id.ToString());
  }

  protected virtual string DeleteRangeMutation(params int[] ids)
  {
    return BaseDeleteRangeMutation
      .Replace("{Class}", DeleteRangeEndpoint.DeclaringType!.Name.CamelizeRespectingAcronyms().Replace("Mutations", string.Empty))
      .Replace("{Method}", DeleteRangeEndpoint.Name.CamelizeRespectingAcronyms())
      .Replace("{Value}", $"[{string.Join(",", ids)}]");
  }

  protected virtual string BaseDeleteMutation { get; } =
    """
    mutation {
      {Class} {
        {Method}(id: {Value}) {
          isSuccess
        }
      }
    }
    """;

  protected virtual string BaseDeleteRangeMutation { get; } =
    """
    mutation {
      {Class} {
        {Method}(ids: {Value}) {
          isSuccess
        }
      }
    }
    """;
}
