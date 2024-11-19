using HotChocolate.Execution;
using HotChocolate.Execution.Processing;

namespace RealGimm.FunctionalTests.Web.Extensions;

internal static class IQueryResultExtensions
{
  public static bool IsSuccess(this IQueryResult source)
  {
    if (source.Data is null)
    {
      return false;
    }

    if (source.Errors is not null)
    {
      return false;
    }

    var success = false;

    var data = source.Data.Values
      .OfType<ObjectResult>()
      .Cast<IEnumerable<ObjectFieldResult>>()
      .SelectMany(x => x.Select(y => y.Value as ObjectResult))
      .Cast<IEnumerable<ObjectFieldResult>>();

    success = data
      .All(x => x!.Any(y => y is { Name: "isSuccess", Value: true }));

    if (success) { return true; }

    //try check deeper for isSuccess property
    try
    {
      var deeper = data
        .SelectMany(y => y.Select(z => z.Value as ObjectResult));

      if (deeper is not null)
      {
        success = deeper
          .Cast<IEnumerable<ObjectFieldResult>>()
          .All(x => x!.Any(y => y is { Name: "isSuccess", Value: true }));
      }
    }catch
    {
      success = false;
    }

    return success;
  }
}
