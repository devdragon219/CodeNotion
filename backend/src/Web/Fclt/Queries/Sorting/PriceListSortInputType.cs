using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.PriceListAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class PriceListSortInputType : SortInputType<PriceList>
{
  protected override void Configure(ISortInputTypeDescriptor<PriceList> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
