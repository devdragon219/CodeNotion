using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Infrastructure.Interceptors;

namespace RealGimm.Infrastructure.Fclt.Data;

public class FcltFilterInterceptor : AccessFilterInterceptor
{
  private static readonly Type[] _handledTypes =
  [
    typeof(SLA),
    typeof(Contract),
    typeof(WorkTeam),
    typeof(Penalty),
    typeof(Ticket),
    typeof(TicketChecklist)
  ];

  public FcltFilterInterceptor(IServiceProvider serviceProvider) : base(serviceProvider)
  {
  }

  protected override Type[] SupportedTypes => _handledTypes;
}
