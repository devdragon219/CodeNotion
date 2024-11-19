using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class TicketPriorityEqualityCondition : TicketCondition
{
  public EqualityOperator Operator { get; private set; }
  public Priority TargetPriority { get; private set; }

  public void SetOperator(EqualityOperator @operator) => Operator = @operator;

  public void SetTargetPriority(Priority targetPriority) => TargetPriority = targetPriority;

  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate() => [];
}
