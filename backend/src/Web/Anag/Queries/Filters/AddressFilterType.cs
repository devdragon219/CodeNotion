using RealGimm.Core.CrossModule;
using HotChocolate.Data.Filters;

namespace RealGimm.Web.Anag.Queries.Filters;

public class AddressFilterType : FilterInputType<IAddress>
{
  protected override void Configure(IFilterInputTypeDescriptor<IAddress> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
