using Ardalis.Result;
using HotChocolate;

namespace RealGimm.Core.Nrgy.ReadingAggregate;

public class ReadingValue : EntityBase
{
  public int TOURateIndex { get; private set; }
  public decimal? Value { get; private set; }

  public void SetValues(int rateIndex, decimal? value)
  {
    TOURateIndex = rateIndex;
    Value = value;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    return Array.Empty<ValidationError>();
  }
}
