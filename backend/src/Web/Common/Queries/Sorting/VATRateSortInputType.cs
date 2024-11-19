using HotChocolate.Data.Sorting;
using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.Web.Common.Queries.Sorting;

public class VATRateSortInputType : SortInputType<VATRate>
{
  protected override void Configure(ISortInputTypeDescriptor<VATRate> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
