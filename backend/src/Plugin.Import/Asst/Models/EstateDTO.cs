namespace RealGimm.Plugin.Import.Asst.Models;

public class EstateDTO
{
  public string Id { get; set; } = default!;
  public string? CityId { get; set; }
  public string? EstateTypeId { get; set; }
  public string? OwnershipTypeId { get; set; }
  public string? InternalCode { get; set; }
  public string? Description { get; set; }
  public string? PostCode { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public string? EstateNotes { get; set; }
  public string? EstateStatusCode { get; set; }
  public bool? IsRecordFlag { get; set; }
  public int? BuildYear { get; set; }
  public string? UsageMacroTypeId { get; set; }
  public string? UsageTypeId { get; set; }
  public string? ManagementOwnerCode { get; set; }
  public string? Address { get; set; }
  public string? Notes { get; set; }
  public double? Latitude { get; set; }
  public double? Longitude { get; set; }
  public bool? IsInUse { get; set; }
  public bool? IsForSale { get; set; }
  public bool? IsFixing { get; set; }
}
