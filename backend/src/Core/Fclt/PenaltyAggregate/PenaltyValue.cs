using HotChocolate;

namespace RealGimm.Core.Fclt.PenaltyAggregate;

public class PenaltyValue : EntityBase
{
  public PenaltyType Type { get; private set; } = default!;
  public decimal Amount { get; private set; }

  public void SetAmount(decimal amount) => Amount = amount;

  public void SetType(PenaltyType type) => Type = type;

  [GraphQLIgnore]
  public PenaltyValue Clone()
  {
    var clone = new PenaltyValue();
    clone.SetAmount(Amount);
    clone.SetType(Type);

    return clone;
  }
}
