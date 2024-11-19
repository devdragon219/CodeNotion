using Ardalis.Specification;

namespace RealGimm.Core.Fclt.CalendarAggregate.Specifications;

public class CalendarIncludeAllSpec : Specification<Calendar>
{
  public CalendarIncludeAllSpec()
  {
    Query
      .Include(calendar => calendar.Days)
      .Include(calendar => calendar.Holidays);
  }
}
