using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.EstateAggregate;

public class EstateMarketValue : EntityBase
{
  public EstateMarketValueType Type { get; private set; }
  public decimal Value { get; private set; }

  public void SetData(EstateMarketValueType type, decimal value)
  {
    Type = type;
    Value = value;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Value <= 0)
    {
      yield return ErrorCode.EstateMarketValueValueOutOfRange.ToValidationError();
    }
  }
}
