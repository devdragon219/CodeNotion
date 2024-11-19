namespace RealGimm.Plugin.Import.Asst.Models;

public record AssetTaxCalculationDTO
{
  public string Id { get; set; } = default!;
  public string CadastralUnitId { get; set; } = default!;
  public string? TaxCalculatorName { get; set; }
  public Guid TaxCalculatorId { get; set; }
  public int Year { get; set; }
  public decimal TotalAmount { get; set; }
}
