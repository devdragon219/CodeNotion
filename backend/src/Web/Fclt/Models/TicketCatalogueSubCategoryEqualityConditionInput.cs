using RealGimm.Core.Shared;

namespace RealGimm.Web.Fclt.Models;

public record TicketCatalogueSubCategoryEqualityConditionInput : TicketConditionInput
{
  public EqualityOperator Operator { get; set; }
  public int TargetCatalogueSubCategoryId { get; set; }
}

