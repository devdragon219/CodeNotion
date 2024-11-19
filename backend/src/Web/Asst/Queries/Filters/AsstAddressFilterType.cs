using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Web.Asst.Queries.Filters;

public class AsstAddressFilterType : FilterInputType<Address>
{
  protected override void Configure(IFilterInputTypeDescriptor<Address> descriptor)
  {
    descriptor.Name("AsstAddressFilterInput");
    
    descriptor.BindFieldsImplicitly();
    descriptor.Field(e => e.LocationLatLon).Ignore();
  }
}