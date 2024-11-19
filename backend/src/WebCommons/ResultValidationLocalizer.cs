using System.Text.RegularExpressions;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using RealGimm.Core;

namespace RealGimm.WebCommons;

public partial class ResultValidationLocalizer
{
  private readonly FieldDelegate _next;
  private readonly IStringLocalizer<ErrorCode> _localizer;
  private readonly ILogger<ResultValidationLocalizer> _logger;

  public ResultValidationLocalizer(FieldDelegate next,
    IStringLocalizer<ErrorCode> localizer,
    ILogger<ResultValidationLocalizer> logger)
  {
    _next = next ?? throw new ArgumentNullException(nameof(next));
    _localizer = localizer ?? throw new ArgumentNullException(nameof(localizer));
    _logger = logger;
  }

  public async Task InvokeAsync(IMiddlewareContext context)
  {
    await _next(context);

    if (context.Result is Ardalis.Result.IResult result && result.ValidationErrors.Any())
    {
      foreach (var validationError in result.ValidationErrors)
      {
        try
        {
          var translatedMessage = _localizer[validationError.ErrorCode];

          if (PaceholderRegex().IsMatch(translatedMessage))
          {
            // skipping translation if the translation contains placeholders
            continue;
          }

          validationError.ErrorMessage = translatedMessage;
        }
        catch (Exception exception)
        {
          _logger.LogInformation(exception, "Unable to translate result code {resultCode}", validationError.ErrorCode);
        }
      }
    }
  }

  [GeneratedRegex(@"\{\d+\}", RegexOptions.Compiled)]
  private static partial Regex PaceholderRegex();
}
