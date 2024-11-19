using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record TicketCatalogueTypeEqualityConditionInput : TicketConditionInput
{
  public EqualityOperator Operator { get; set; }
  public int TargetCatalogueTypeId { get; set; }
}

