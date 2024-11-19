using RealGimm.Core.Fclt.TicketAggregate.TicketHistory;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.User.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(TicketHistoryEntry))]
public sealed class TicketHistoryEntryExtension
{
  public async Task<User?> GetUser(
    [Parent] TicketHistoryEntry ticketHistoryEntry,
    [Service] UserDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(ticketHistoryEntry.UserId, cancellationToken);
}
