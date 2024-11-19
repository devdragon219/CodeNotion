using HotChocolate.Data.Filters;
using RealGimm.Core.Nrgy.ReadingAggregate;

namespace RealGimm.Web.Nrgy.Queries.Filters;

public class ReadingFilterType : FilterInputType<Reading>
{
  protected override void Configure(IFilterInputTypeDescriptor<Reading> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
