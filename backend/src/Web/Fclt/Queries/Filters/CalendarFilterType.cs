using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class CalendarFilterType : FilterInputType<Calendar>
{
  protected override void Configure(IFilterInputTypeDescriptor<Calendar> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
