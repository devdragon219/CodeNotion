using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.CraftAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class CraftFilterType : FilterInputType<Craft>
{
  protected override void Configure(IFilterInputTypeDescriptor<Craft> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
