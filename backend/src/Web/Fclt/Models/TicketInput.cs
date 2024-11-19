using RealGimm.Core.Fclt.TicketAggregate;

namespace RealGimm.Web.Fclt.Models;

public record TicketInput
{
  public int LocationEstateUnitId { get; set; }
  public int? LocationFloorId { get; set; }
  public string? LocationSector { get; set; }
  public string? LocationRoom { get; set; }
  public string InternalCode { get; set; } = default!;
  public TicketMasterStatus MasterStatus { get; set; }
  public bool IsWorkSafetyExpected { get; set; }
  public string? WorkOrderReference { get; set; }
  public string? Requestor { get; set; } = default!;
  public string? RequestorContactEmail { get; set; }
  public string? RequestorContactPhone { get; set; }
  public DateTime RequestDateTime { get; set; }
  public DateOnly DueDate { get; set; }
  public int? CustomTypeId { get; set; } = default!;
  public Priority Priority { get; set; }
  public int CatalogueTypeId { get; set; }
  public int[] CatalogueItemIds { get; set; } = [];
  public string? Summary { get; set; }
  public string? Description { get; set; }
  public ReminderInput[] Reminders { get; set; } = [];
  public ResolutionInput Resolution { get; set; } = default!;
  public PerformedActivityInput[] PerformedActivityInputs { get; set; } = [];
  public int SupplierSubjectId { get; private set; }
  public int? PlannedTeamId { get; private set; }
  public int? PlannedTeamLeaderUserId { get; private set; }
  public WorkerInput[] Workers { get; private set; } = [];
  public QuoteInput? Quote { get; set; }
}
