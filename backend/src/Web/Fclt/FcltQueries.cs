using RealGimm.Web.Fclt.Queries;

namespace RealGimm.Web.Fclt;

[ExtendObjectType(typeof(Query))]
public class FcltQueries
{
  public EstateUnitGroupQueries EstateUnitGroup { get; } = new();
  public ContractTypeQueries FcltContractType { get; } = new();
  public ContractQueries FcltContract { get; } = new();
  public ContractTemplateQueries ContractTemplate { get; } = new();
  public SLAQueries SLA { get; } = new();
  public CraftQueries Craft { get; } = new();
  public InterventionTypeQueries InterventionType { get; } = new();
  public TicketTypeQueries TicketType { get; } = new();
  public QualificationLevelQueries QualificationLevel { get; } = new();
  public WorkTeamQueries WorkTeam { get; } = new();
  public CalendarQueries Calendar { get; } = new();
  public PenaltyQueries Penalty { get; } = new();
  public TicketChecklistTemplateQueries TicketChecklistTemplate { get; } = new();
  public PriceListMeasurementUnitQueries PriceListMeasurementUnit { get; } = new();
  public PriceListQueries PriceList { get; } = new();
  public PriceListArticleQueries PriceListArticle { get; } = new();
  public TicketQueries Ticket { get; } = new();
  public TicketChecklistQueries TicketChecklist { get; } = new();
  public ServiceQueries Service { get; } = new();
  public ServiceCategoryQueries ServiceCategory { get; } = new();
}
