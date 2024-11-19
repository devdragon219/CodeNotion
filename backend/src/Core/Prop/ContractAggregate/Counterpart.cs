using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.ContractAggregate;

public class Counterpart : EntityBase, IDateOnlyRanged
{
  public int SubjectId { get; private set; }
  public bool IsMainCounterpart { get; private set; }
  public double ContractSharePercent { get; private set; }
  public DateOnly Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public CounterpartType Type { get; private set; }

  DateOnly? IDateOnlyRanged.Since => Since;

  public void SetSubjectId(int subjectId) => SubjectId = subjectId;

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  public void SetIsMainCounterpart(bool isMainCounterpart)
    => IsMainCounterpart = isMainCounterpart;

  public void SetContractSharePercent(double contractSharePercent)
    => ContractSharePercent = contractSharePercent;

  public void SetType(CounterpartType type) => Type = type;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (ContractSharePercent is <= 0 or > 100)
    {
      yield return ErrorCode.CounterpartSharePercentMustBeGreaterThanZeroAndLessOrEqualToOneHundred.ToValidationError();
    }
  }
}
