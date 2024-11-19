using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class AsstAddressSortInputType : SortInputType<Address>
{
  protected override void Configure(ISortInputTypeDescriptor<Address> descriptor)
  {
    descriptor.Name("AsstAddressSortInput");
    
    descriptor.BindFieldsImplicitly();
    descriptor.Field(e => e.LocationLatLon).Ignore();
    
  }
}
