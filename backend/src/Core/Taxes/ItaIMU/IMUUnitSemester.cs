using RealGimm.Core.Asst.AssetTaxCalculationAggregate;

namespace RealGimm.Core.Taxes.ItaIMU;

public record IMUUnitSemester
{
  public decimal? PaymentAmount { get; set; }
  public CalculationIssue? Issue { get; set; }
  public int PropertyMonths { get; set; }
  public decimal GrossCadastralIncome { get; set; }
  public decimal ActualizedCadastralIncome { get; set; }
  public decimal BaseTaxableAmount { get; set; }
}
