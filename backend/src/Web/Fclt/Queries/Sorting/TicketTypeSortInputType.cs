using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.TicketTypeAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class TicketTypeSortInputType : SortInputType<TicketType>
{
  protected override void Configure(ISortInputTypeDescriptor<TicketType> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
