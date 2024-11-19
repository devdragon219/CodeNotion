namespace RealGimm.Web.Fclt.Models;

public record OneOfTicketConditionInput
{
  public ComplexTicketConditionInput? Complex { get; set; }
  public TicketTypeEqualityConditionInput? TicketTypeEquality { get; set; }
  public TicketMasterStatusConditionInput? MasterStatus { get; set; }
  public TicketCatalogueCategoryEqualityConditionInput? CatalogueCategoryEquality { get; set; }
  public TicketCatalogueSubCategoryEqualityConditionInput? CatalogueSubCategoryEquality { get; set; }
  public TicketCatalogueTypeEqualityConditionInput? CatalogueTypeEquality { get; set; }
  public TicketPriorityEqualityConditionInput? PriorityEquality { get; set; }
}
