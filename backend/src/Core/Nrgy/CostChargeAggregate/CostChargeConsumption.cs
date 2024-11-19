using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.CostChargeAggregate;

public class CostChargeConsumption : IDateOnlyRanged
{
  public DateOnly Since { get; private set; }
  public DateOnly Until { get; private set; }
  DateOnly? IDateOnlyRanged.Since => Since;
  DateOnly? IDateOnlyRanged.Until => Until;
  public NullSafeCollection<ReadingValue> Values { get; private set; } = [];

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly until) => Until = until;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Since > Until)
    {
      yield return ErrorCode.CostChargeSinceMustBeLessThanUntil.ToValidationError();
    }

    foreach (var value in Values)
    {
      var validationErrors = value.Validate();
      foreach (var validationError in validationErrors)
      {
        yield return validationError;
      }
    }
  }
}
