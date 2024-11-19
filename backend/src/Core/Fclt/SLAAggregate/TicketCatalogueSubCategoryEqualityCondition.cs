using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class TicketCatalogueSubCategoryEqualityCondition : TicketCondition
{
  public EqualityOperator Operator { get; private set; }
  public int TargetCatalogueSubCategoryId { get; private set; }

  public void SetOperator(EqualityOperator @operator) => Operator = @operator;
  
  public void SetTargetCatalogueSubCategoryId(int targetCatalogueSubCategoryId)
    => TargetCatalogueSubCategoryId = targetCatalogueSubCategoryId;

  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate() => [];
}
