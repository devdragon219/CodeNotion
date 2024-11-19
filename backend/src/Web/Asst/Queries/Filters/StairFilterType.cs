using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class StairFilterType : FilterInputType<Stair>
{
  protected override void Configure(IFilterInputTypeDescriptor<Stair> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
