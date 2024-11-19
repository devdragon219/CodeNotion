using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class TicketCatalogueCategoryEqualityCondition : TicketCondition
{
  public EqualityOperator Operator { get; private set; }
  public int TargetCatalogueCategoryId { get; private set; }

  public void SetOperator(EqualityOperator @operator) => Operator = @operator;

  public void SetTargetCatalogueCategoryId(int targetCatalogueCategoryId)
    => TargetCatalogueCategoryId = targetCatalogueCategoryId;

  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate() => [];
}
