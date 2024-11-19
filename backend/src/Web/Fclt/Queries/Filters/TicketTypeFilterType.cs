using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.TicketTypeAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class TicketTypeFilterType : FilterInputType<TicketType>
{
  protected override void Configure(IFilterInputTypeDescriptor<TicketType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
