using HotChocolate.Execution;
using HotChocolate.Execution.Instrumentation;
using Microsoft.Extensions.Logging;

namespace RealGimm.WebCommons;

public class ExecutionErrorLogger : ExecutionDiagnosticEventListener
{
  private readonly ILogger<ExecutionErrorLogger> _logger;

  public ExecutionErrorLogger(ILogger<ExecutionErrorLogger> logger) => _logger = logger;

  public override void RequestError(IRequestContext context, Exception exception)
  {
    if (exception is OperationCanceledException)
    {
      //Don't log this, it happens when the user just navigates away from a pending operation
      return;
    }
    _logger.LogError(exception, "Error on GraphQL request");

    if (exception is GraphQLException e)
    {
      foreach (var error in e.Errors)
      {
        _logger.LogError(error.Exception,
            "Single error details: {ErrorCode}/{Error} at path {Path}",
            error.Message,
            error.Code,
            error.Path);
      }
    }
  }
}
