using Ardalis.Result;

namespace RealGimm.SharedKernel.Exceptions;

public class ValidationException : Exception
{
  public List<ValidationError> ValidationErrors { get; }

  public ValidationException(ValidationError validationError)
  {
    ValidationErrors = [validationError];
  }

  public ValidationException(IEnumerable<ValidationError> validationErrors)
  {
    ValidationErrors = validationErrors.ToList();
  }
}
