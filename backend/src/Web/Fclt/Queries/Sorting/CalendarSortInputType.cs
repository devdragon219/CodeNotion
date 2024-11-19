using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.CalendarAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class CalendarSortInputType : SortInputType<Calendar>
{
  protected override void Configure(ISortInputTypeDescriptor<Calendar> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
