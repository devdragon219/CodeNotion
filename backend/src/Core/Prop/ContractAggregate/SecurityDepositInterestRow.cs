using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.ContractAggregate;

public class SecurityDepositInterestRow : EntityBase, IDateOnlyRanged
{
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public decimal BaseAmount { get; private set; }
  public DateOnly CalculationDate { get; private set; }
  public decimal InterestAmount { get; private set; }
  public decimal AppliedInterestRate { get; private set; }

  public void SetDates(DateOnly? since, DateOnly? until)
  {
    Since = since;
    Until = until;
  }

  public void SetBaseAmount(decimal amount) => BaseAmount = amount;

  public void SetCalculationDate(DateOnly calculationDate) => CalculationDate = calculationDate;

  public void SetInterestAmount(decimal interestAmount) => InterestAmount = interestAmount;

  public void SetAppliedInterestRate(decimal interestRate) => AppliedInterestRate = interestRate;
}
