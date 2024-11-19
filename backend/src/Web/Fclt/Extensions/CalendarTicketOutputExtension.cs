using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.WebCommons.Anag.DataLoaders;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(CalendarTicketOutput))]
public sealed class CalendarTicketOutputExtension
{
  public async Task<ISubject> GetSupplierSubject(
    [Parent] CalendarTicketOutput ticketOutput,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(ticketOutput.SupplierSubjectId, cancellationToken);
}
