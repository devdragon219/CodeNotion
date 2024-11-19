using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class TicketCatalogueTypeEqualityCondition : TicketCondition
{
  public EqualityOperator Operator { get; private set; }
  public int TargetCatalogueTypeId { get; private set; }

  public void SetOperator(EqualityOperator @operator) => Operator = @operator;
  
  public void SetTargetCatalogueTypeId(int targetCatalogueTypeId)
    => TargetCatalogueTypeId = targetCatalogueTypeId;
  
  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate() => [];
}
