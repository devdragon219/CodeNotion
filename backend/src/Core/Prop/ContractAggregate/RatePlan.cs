using RealGimm.SharedKernel;

namespace RealGimm.Core.Prop.ContractAggregate;

public class RatePlan : EntityBase
{
  public DateOnly Since { get; private set; }
  public decimal NewYearlyRate { get; private set; }
  public bool IsDeclarationExpected { get; private set; }
  public bool IsDeclared { get; private set; }

  public void SetSince(DateOnly since) => Since = since;

  public void SetNewYearlyRate(decimal newYearlyRate) => NewYearlyRate = newYearlyRate;

  public void SetIsDeclarationExpected(bool isDeclarationExpected)
    => IsDeclarationExpected = isDeclarationExpected;

  public void SetIsDeclared(bool isDeclared) => IsDeclared = isDeclared;
}
