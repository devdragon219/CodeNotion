using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class TicketTypeEqualityCondition : TicketCondition
{
  public EqualityOperator Operator { get; private set; }
  public TicketType TargetTicketType { get; private set; } = default!;

  public void SetOperator(EqualityOperator @operator) => Operator = @operator;

  public void SetTargetTicketType(TicketType targetTicketType) => TargetTicketType = targetTicketType;

  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate() => [];
}
