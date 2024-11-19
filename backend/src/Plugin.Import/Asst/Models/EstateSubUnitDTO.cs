namespace RealGimm.Plugin.Import.Asst.Models;

public class EstateSubUnitDTO
{
  public string Id { get; set; } = default!;
  public string? EstateUnitCode { get; set; }
  public string? UsageTypeId { get; set; }
  public string? OccupantSubjectId { get; set; }
  public string? SubCode { get; set; }
  public string? OrgUnitId { get; set; }
  public string? Name { get; set; }
  public string? Notes { get; set; }
  public DateTime? LastUpdated { get; set; }
  public bool IsCommonArea { get; set; }
  public bool IsUnoccupied { get; set; }
  public int? GrossAreaSqM { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }

}
