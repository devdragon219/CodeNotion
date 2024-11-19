using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.CraftAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class CraftSortInputType : SortInputType<Craft>
{
  protected override void Configure(ISortInputTypeDescriptor<Craft> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
