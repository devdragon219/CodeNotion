using RealGimm.Core;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.Web.Fclt.Mapping;

public class TicketMasterStatusConditionMapper : IMapper<TicketMasterStatusConditionInput, TicketMasterStatusCondition>
{
  private readonly IRepository<Calendar> _calendarRepository;

  public TicketMasterStatusConditionMapper(IRepository<Calendar> calendarRepository)
  {
    _calendarRepository = calendarRepository;
  }

  public async Task<TicketMasterStatusCondition?> MapAsync(
    TicketMasterStatusConditionInput? from,
    TicketMasterStatusCondition? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var calendar = await _calendarRepository
      .SingleOrDefaultAsync(new GetByIdSpec<Calendar>(from.CalendarId), cancellationToken)
      ?? throw new MappingException(ErrorCode.CalendarNotFound.ToValidationError());

    var condition = into ?? new TicketMasterStatusCondition() { Id = from.Id.GetValueOrDefault() };
    condition.SetTargetMasterStatus(from.TargetMasterStatus);
    condition.SetCalendar(calendar);
    condition.SetTimeComparisonOperator(from.TimeComparisonOperator);
    condition.SetMinTimePeriodInMinutes(from.MinTimePeriodInMinutes);
    condition.SetMaxTimePeriodInMinutes(from.MaxTimePeriodInMinutes);

    return condition;
  }
}
