using RealGimm.Core;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketTypeEqualityConditionMapper : IMapper<TicketTypeEqualityConditionInput, TicketTypeEqualityCondition>
{
  private readonly IRepository<TicketType> _ticketTypeRepository;

  public TicketTypeEqualityConditionMapper(IRepository<TicketType> ticketTypeRepository)
  {
    _ticketTypeRepository = ticketTypeRepository;
  }

  public async Task<TicketTypeEqualityCondition?> MapAsync(
    TicketTypeEqualityConditionInput? from,
    TicketTypeEqualityCondition? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var targetTicketType = await _ticketTypeRepository
      .SingleOrDefaultAsync(new GetByIdSpec<TicketType>(from.TargetTicketTypeId))
      ?? throw new MappingException(ErrorCode.TicketTypeNotFound.ToValidationError());

    var condition = into ?? new TicketTypeEqualityCondition() { Id = from.Id.GetValueOrDefault() };
    condition.SetOperator(from.Operator);
    condition.SetTargetTicketType(targetTicketType);

    return condition;
  }
}
