using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Asst.EstateUnitAggregate;
public class UnitExpenses : EntityBase
{
  public EstateUnit EstateUnit { get; private set; } = default!;
  public int ReferenceYear { get; private set; }
  public decimal Amount { get; private set; }
  public double? RevaluationFactor { get; private set; }

  public UnitExpenses(
    int referenceYear,
    decimal amount)
  {
    ReferenceYear = referenceYear;
    Amount = amount;
  }

  public void SetRevaluationFactor(double? revaluationFactor)
  {
    RevaluationFactor = revaluationFactor;
  }
}
