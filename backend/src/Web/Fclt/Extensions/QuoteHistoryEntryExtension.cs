using RealGimm.Core.Fclt.TicketAggregate.QuoteHistory;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.User.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(QuoteHistoryEntry))]
public sealed class QuoteHistoryEntryExtension
{
  public async Task<User?> GetUser(
    [Parent] QuoteHistoryEntry quoteHistoryEntry,
    [Service] UserDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(quoteHistoryEntry.UserId, cancellationToken);
}
