using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.IAM;
using RealGimm.Web.Docs.Helpers;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;

namespace RealGimm.Web.Docs.Mutations;

public class TicketDocumentMutations
{
  [BackOfficePermission(Features.FCLT_TICKET, Permission.Create)]
  public Task<Result<Document[]>> AddRange(
    int ticketId,
    DocumentInput[] inputs,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Ticket> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.AddRangeAsync(ticketId, inputs, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Update)]
  public Task<Result<Document>> Update(
    int ticketId,
    DocumentInput input,
    [Service] IRepository<Document> repository,
    [Service] IDocumentMapper<Ticket> mapper,
    CancellationToken cancellationToken)
    => DocumentMutationsHelper.UpdateAsync(ticketId, input, repository, mapper, cancellationToken);

  [BackOfficePermission(Features.FCLT_TICKET, Permission.Delete)]
  public async Task<Result<Document[]>> DeleteRange(
    int ticketId,
    string[] cmisIds,
    [Service] IRepository<Document> repository,
    CancellationToken cancellationToken)
    => await DocumentMutationsHelper.DeleteRangeAsync<Ticket>(ticketId, cmisIds, repository, cancellationToken);
}
