using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class SLASortInputType : SortInputType<SLA>
{
  protected override void Configure(ISortInputTypeDescriptor<SLA> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
