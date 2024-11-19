using Ardalis.Specification;

namespace RealGimm.Core.Fclt.CalendarAggregate.Specifications;

public class CalendarIncludeForListSpec : Specification<Calendar>
{
  public CalendarIncludeForListSpec()
  {
    Query
      .Include(calendar => calendar.Days)
      .Include(calendar => calendar.Holidays);
  }
}
