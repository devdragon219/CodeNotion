using RealGimm.Web.Fclt.Mutations;

namespace RealGimm.Web.Fclt;

[ExtendObjectType(typeof(Mutation))]
public class FcltMutations
{
  public EstateUnitGroupMutations EstateUnitGroup { get; } = new();
  public ContractTypeMutations FcltContractType { get; } = new();
  public ContractMutations FcltContract { get; } = new();
  public ContractTemplateMutations ContractTemplate { get; } = new();
  public SLAMutations SLA { get; } = new();
  public CraftMutations Craft { get; } = new();
  public InterventionTypeMutations InterventionType { get; } = new();
  public TicketTypeMutations TicketType { get; } = new();
  public QualificationLevelMutations QualificationLevel { get; } = new();
  public WorkTeamMutations WorkTeam { get; } = new();
  public CalendarMutations Calendar { get; } = new();
  public PenaltyMutations Penalty { get; } = new();
  public TicketChecklistTemplateMutations TicketChecklistTemplate { get; } = new();
  public PriceListMeasurementUnitMutations PriceListMeasurementUnit { get; } = new();
  public PriceListMutations PriceList { get; } = new();
  public PriceListArticleMutations PriceListArticle { get; } = new();
  public TicketMutations Ticket { get; } = new();
  public TicketChecklistMutations TicketChecklist { get; } = new();
  public ServiceMutations Service { get; } = new();
  public ServiceCategoryMutations ServiceCategory { get; } = new();
}
