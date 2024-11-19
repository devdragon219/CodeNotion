namespace RealGimm.Plugin.Import.Asst.Models;

public class EstateUnitDTO
{
  public string Id { get; set; } = default!;
  public string? EstateCode { get; set; }
  public string? EstateSourceId { get; set; }
  public string? CityId { get; set; }
  public string? Address { get; set; }
  public string? UsageTypeId { get; set; }
  public string? OwnershipTypeId { get; set; }
  public string? EstateTypeId { get; set; }
  public string? SubCode { get; set; }
  public string? Name { get; set; }
  public string? StairId { get; set; }
  public string? MainFloorId { get; set; }
  public string[] FloorIds { get; set; } = default!;
  public DateTime? LastUpdated { get; set; }
  public bool IsCommonArea { get; set; }
  public bool IsClosed { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }

}
