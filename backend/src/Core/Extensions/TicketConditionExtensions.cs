using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Core.Extensions;

public static class TicketConditionExtensions
{
  public static IEnumerable<TicketCondition> ToFlat(this TicketCondition condition)
  {
    yield return condition;

    if (condition is not ComplexTicketCondition complexCondition)
    {
      yield break;
    }

    foreach (var internalCondition in complexCondition.InternalConditions)
    {
      foreach (var flatCondition in internalCondition.ToFlat())
      {
        yield return flatCondition;
      }
    }
  }
}
