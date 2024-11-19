using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Asst.AssetTaxCalculationAggregate;

public class AssetTaxPayment : EntityBase
{
  public AssetTaxCalculation? AssetTaxCalculation { get; private set; }
  public int ManagementSubjectId { get; private set; }
  public int? ManagementSubjectBankAccountId { get; set; }
  public DateOnly Date { get; private set; }
  public int PropertyMonths { get; private set; }
  public decimal GrossCadastralIncome { get; private set; }
  public decimal ActualizedCadastralIncome { get; private set; }
  public decimal BaseTaxableAmount { get; private set; }
  public decimal DebitedAmount { get; private set; }
  public decimal? CreditedAmount { get; private set; }
  public decimal AmountPaid
  {
    get
    {
      return DebitedAmount - CreditedAmount ?? 0;
    }
  }

  [MaxLength(StrFieldSizes.NAME)]
  public string? TaxName { get; private set; }
  public bool IsDefinitive { get; private set; }
  public DateOnly ExpectedDueDate { get; private set; }
  public int[] InstallmentsPaid { get; private set; } = [];
  public CalculationIssue? Issue { get; private set; }
  public bool IsIssueOverridden { get; private set; }

  public void SetData(
    DateOnly date,
    decimal amount,
    int[] installments,
    CalculationIssue? issue,
    DateOnly expectedDue,
    int propertyMonths,
    int managementSubjectId,
    int? managementSubjectBankAccountId)
  {
    Date = date;
    DebitedAmount = amount;
    InstallmentsPaid = installments;
    Issue = issue;
    ExpectedDueDate = expectedDue;
    PropertyMonths = propertyMonths;
    ManagementSubjectId = managementSubjectId;
    ManagementSubjectBankAccountId = managementSubjectBankAccountId;
  }

  public void SetIsDefinitive(bool isDefinitive) => IsDefinitive = isDefinitive;
  public void SetIssueOverridden(bool isIssueOverridden) => IsIssueOverridden = isIssueOverridden;
  public void SetGrossCadastralIncome(decimal grossCadastralIncome) => GrossCadastralIncome = grossCadastralIncome;
  public void SetActualizedCadastralIncome(decimal actualizedCadastralIncome) => ActualizedCadastralIncome = actualizedCadastralIncome;
  public void SetBaseTaxableAmount(decimal baseTaxableAmount) => BaseTaxableAmount = baseTaxableAmount;
}
