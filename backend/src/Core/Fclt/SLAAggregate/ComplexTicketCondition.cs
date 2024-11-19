using Ardalis.Result;
using DocumentFormat.OpenXml.Presentation;
using HotChocolate;
using RealGimm.Core.Shared;

namespace RealGimm.Core.Fclt.SLAAggregate;

public class ComplexTicketCondition : TicketCondition
{
  public BooleanOperator Operator { get; private set; }
  public NullSafeCollection<TicketCondition> InternalConditions { get; private set; } = [];

  public void SetOperator(BooleanOperator @operator) => Operator = @operator;

  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate()
  {
    if (InternalConditions.Count == 0)
    {
      yield return ErrorCode.EmptyConditionsList.ToValidationError();
    }

    foreach (var condition in InternalConditions)
    {
      foreach (var valdationError in condition.Validate())
      {
        yield return valdationError;
      }
    }
  }
}
