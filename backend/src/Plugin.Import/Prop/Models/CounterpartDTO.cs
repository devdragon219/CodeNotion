namespace RealGimm.Plugin.Import.Prop.Models;

public class CounterpartDTO
{
  public string Id { get; set; } = default!;
  public string ContractInternalCode { get; set; } = default!;
  public string CounterpartId { get; set; } = default!;
  public double? RateFactor { get; set; }
  public bool IsLandlord { get; set; }
  public bool IsMainCounterpart { get; set; }
  public bool IsVATAdded { get; set; }
  public DateTime? StartDate { get; set; }
  public DateTime? EndDate { get; set; }
  public string? TenancyTypeCode { get; set; }
}
