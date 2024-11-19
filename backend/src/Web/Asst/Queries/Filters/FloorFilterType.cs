using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class FloorFilterType : FilterInputType<Floor>
{
  protected override void Configure(IFilterInputTypeDescriptor<Floor> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
