using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mapping;

public class ReplyDocumentMapper : EstateLinkedDocumentMapperBase<Reply>
{
  private readonly IRepository<Ticket> _ticketRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;

  public ReplyDocumentMapper(IRepository<Ticket> ticketRepository, IRepository<EstateUnit> estateUnitRepository)
  {
    _ticketRepository = ticketRepository;
    _estateUnitRepository = estateUnitRepository;
  }

  public override async Task MapAsync(int replyId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var ticket = await _ticketRepository
      .AsQueryable()
      .SingleOrDefaultAsync(ticket => ticket.Replies.Any(reply => reply.Id == reply.Id), cancellationToken)
      ?? throw new MappingException(ErrorCode.ReplyNotFound.ToValidationError());

    var estate = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(ticket.LocationEstateUnitId))
      .Select(estateUnit => new
      {
        estateUnit.Estate.Id,
        estateUnit.Estate.ManagementSubjectId
      })
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.EstateUnitNotFound.ToValidationError());

    Map([estate.ManagementSubjectId], replyId, estate.Id, from, into);
  }
}
