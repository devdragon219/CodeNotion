using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketPriorityEqualityConditionMapper : IMapper<TicketPriorityEqualityConditionInput, TicketPriorityEqualityCondition>
{
  public TicketPriorityEqualityCondition? MapAsync(
    TicketPriorityEqualityConditionInput? from,
    TicketPriorityEqualityCondition? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var condition = into ?? new TicketPriorityEqualityCondition() { Id = from.Id.GetValueOrDefault() };
    condition.SetOperator(from.Operator);
    condition.SetTargetPriority(from.TargetPriority);

    return condition;
  }

  public Task<TicketPriorityEqualityCondition?> MapAsync(
    TicketPriorityEqualityConditionInput? from,
    TicketPriorityEqualityCondition? into = null,
    CancellationToken cancellationToken = default)
    => Task.FromResult(MapAsync(from, into));
}
