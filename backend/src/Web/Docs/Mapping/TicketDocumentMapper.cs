using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Docs.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Docs.Mapping;

public class TicketDocumentMapper : EstateLinkedDocumentMapperBase<Ticket>
{
  private readonly IRepository<Ticket> _ticketRepository;
  private readonly IRepository<EstateUnit> _estateUnitRepository;

  public TicketDocumentMapper(IRepository<Ticket> ticketRepository, IRepository<EstateUnit> estateUnitRepository)
  {
    _ticketRepository = ticketRepository;
    _estateUnitRepository = estateUnitRepository;
  }

  public override async Task MapAsync(int ticketId, DocumentInput from, Document into, CancellationToken cancellationToken)
  {
    ArgumentNullException.ThrowIfNull(from);
    ArgumentNullException.ThrowIfNull(into);

    var ticket = await _ticketRepository
      .AsQueryable(new GetByIdSpec<Ticket>(ticketId))
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.TicketNotFound.ToValidationError());

    var estate = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(ticket.LocationEstateUnitId))
      .Select(estateUnit => new
      {
        estateUnit.Estate.Id,
        estateUnit.Estate.ManagementSubjectId
      })
      .SingleOrDefaultAsync(cancellationToken)
      ?? throw new MappingException(ErrorCode.EstateUnitNotFound.ToValidationError());

    Map([estate.ManagementSubjectId], ticketId, estate.Id, from, into);
  }
}
