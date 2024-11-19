using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.SharedKernel.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Asst.AssetTaxCalculationAggregate;

public class AssetTaxCalculation : EntityBase, IAggregateRoot
{
  public CadastralUnit CadastralUnit { get; private set; } = default!;

  [MaxLength(StrFieldSizes.NAME)]
  public string TaxCalculator { get; private set; } = default!;
  public Guid TaxCalculatorId { get; private set; }
  public int Year { get; private set; }
  public NullSafeCollection<AssetTaxPayment> Installments { get; private set; } = new();
  public decimal TotalAmount { get; private set; }
  public int ExpectedInstallments { get; private set; }

  public void SetData(
    string taxCalculator,
    Guid taxCalculatorId,
    int year,
    decimal totalAmount,
    int expectedInstallments)
  {
    TaxCalculator = taxCalculator;
    TaxCalculatorId = taxCalculatorId;
    Year = year;
    TotalAmount = totalAmount;
    ExpectedInstallments = expectedInstallments;
  }

  public void SetCadastralUnit(CadastralUnit cu)
  {
    CadastralUnit = cu;
  }

  public void SetExpectedInstallments(int expected)
  {
    ExpectedInstallments = expected;
  }
}
