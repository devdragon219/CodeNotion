using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;

namespace RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;

public sealed record AssetTaxGroupedRow
{
  public AssetTaxCalculation AssetTaxCalculation { get; set; } = default!;
  public int Year { get; set; }
  public int ManagementSubjectId { get; set; }
  public string? ManagementSubject { get; set; }
  public DateOnly? ExpectedDueDate { get; set; }
  public DateOnly? LastUpdate { get; set; }
  public decimal? TotalAmount { get; set; }
  public decimal? TotalTaxableAmount { get; set; }
  public IEnumerable<AssetTaxPayment>? Payments { get; set; }
}
