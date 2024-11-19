using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record TicketCatalogueCategoryEqualityConditionInput : TicketConditionInput
{
  public EqualityOperator Operator { get; set; }
  public int TargetCatalogueCategoryId { get; set; }
}

