using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.EstateAggregate;

public class EstateTotalMarketValueCoefficient : EntityBase
{
  public EstateTotalMarketValueCoefficientType Type { get; private set; }
  public decimal Value { get; private set; }

  public void SetData(EstateTotalMarketValueCoefficientType type, decimal value)
  {
    Type = type;
    Value = value;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Value is <= 0 or > 1)
    {
      yield return ErrorCode.EstateTotalMarketValueCoefficientValueOutOfRange.ToValidationError();
    }
  }
}
