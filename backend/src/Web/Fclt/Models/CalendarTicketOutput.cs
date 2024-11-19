using RealGimm.Core.Fclt.TicketAggregate;

namespace RealGimm.Web.Fclt.Models;

public record CalendarTicketOutput
{
  public required int? Id { get; set; }
  public required TicketMainType MainType { get; set; }
  public required DateTime RequestDateTime { get; set; }
  public required DateOnly DueDate { get; set; }
  public required string? InternalCode { get; set; }
  public required string? WorkOrderReference { get; set; }
  public required string? Description { get; set; }
  public required TicketMasterStatus? MasterStatus { get; set; }
  public required int SupplierSubjectId { get; set; }
  public required string? Requestor { get; set; }
  public required bool IsExcludedFromMaintenanceContract { get; set; }
}
