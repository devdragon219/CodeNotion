namespace RealGimm.Plugin.Import.Asst.Models;

public class EstateUnitSurfaceDTO
{
  public string EstateUnitId { get; set; } = default!;
  public string? FunctionAreaCode { get; set; }
  public string? FloorId { get; set; }
  public string MeasurementUnitCode { get; set; } = default!;
  public decimal Value { get; set; }
}
