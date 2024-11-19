using System.Reflection;
using Ardalis.Result;
using Bogus;
using Bogus.DataSets;

namespace RealGimm.Infrastructure;

public abstract class BaseSeededFaker<T> : Faker<T>
  where T : class
{
  private static readonly MethodInfo _validationMethod = typeof(T).GetMethod("Validate")!;

  public BaseSeededFaker(int seed = 0)
  {
    UseSeed(seed);
  }

  protected void EnsureValid(T @object)
  {
    if (_validationMethod is null)
    {
      return;
    }

    var validationErrors = ((IEnumerable<ValidationError>)_validationMethod.Invoke(@object, parameters: null)!).ToArray();
    if (validationErrors.Length > 0)
    {
      var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
      throw new InvalidOperationException($"Invalid {nameof(Address)} entity! Errors: {errorMessages}");
    }
  }
}
