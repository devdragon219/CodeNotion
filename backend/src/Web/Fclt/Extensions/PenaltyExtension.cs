using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Extensions;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(Penalty))]
public sealed class PenaltyExtension
{
  public IEnumerable<TicketCondition> GetFlatIfConditions([Parent] Penalty penalty)
    => penalty.IfCondition.ToFlat();
}
