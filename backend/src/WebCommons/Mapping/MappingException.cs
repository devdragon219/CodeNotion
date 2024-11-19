using System.Diagnostics.CodeAnalysis;
using Ardalis.Result;

namespace RealGimm.WebCommons.Mapping;

public class MappingException : Exception
{
  public ValidationError[] ValidationErrors { get; private set; }

  public MappingException(params ValidationError[] errors)
  {
    ValidationErrors = errors;
  }

  public static void ThrowIfNull([NotNull] object? value, params ValidationError[] errors)
  {
    if (value is null)
    {
      throw new MappingException(errors);
    }
  }
}
