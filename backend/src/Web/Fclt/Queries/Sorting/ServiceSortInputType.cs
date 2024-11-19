using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class ServiceSortInputType : SortInputType<Service>
{
  protected override void Configure(ISortInputTypeDescriptor<Service> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
