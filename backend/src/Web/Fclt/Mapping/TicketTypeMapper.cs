using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketTypeMapper : IMapper<TicketTypeInput, TicketType>
{
  public TicketType? MapAsync(TicketTypeInput? from, TicketType? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var ticketType = into ?? new TicketType();
    ticketType.SetDescription(from.Description);
    ticketType.SetInternalCode(from.InternalCode);
    ticketType.SetOrdering(from.Ordering);

    return ticketType;
  }

  Task<TicketType?> IMapper<TicketTypeInput, TicketType>.MapAsync(
    TicketTypeInput? from,
    TicketType? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
