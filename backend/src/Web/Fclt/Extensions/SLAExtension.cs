using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Extensions;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(SLA))]
public sealed class SLAExtension
{
  public IEnumerable<TicketCondition> GetFlatIfConditions([Parent] SLA sla)
    => sla.IfCondition.ToFlat();

  public IEnumerable<TicketCondition> GetFlatThenConditions([Parent] SLA sla)
    => sla.ThenCondition.ToFlat();
}
