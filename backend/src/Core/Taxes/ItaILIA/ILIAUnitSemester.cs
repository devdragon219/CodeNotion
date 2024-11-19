using RealGimm.Core.Asst.AssetTaxCalculationAggregate;

namespace RealGimm.Core.Taxes.ItaILIA;

public record ILIAUnitSemester
{
  public decimal? PaymentAmount { get; set; }
  public CalculationIssue? Issue { get; set; }
  public int PropertyMonths { get; set; }
  public decimal GrossCadastralIncome { get; set; }
  public decimal ActualizedCadastralIncome { get; set; }
  public decimal BaseTaxableAmount { get; set; }
}
