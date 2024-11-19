using RealGimm.Core.CrossModule;
using HotChocolate.Data.Sorting;

namespace RealGimm.WebFrontOffice.Anag.Queries.Sorting;

public class AddressSortInputType : SortInputType<IAddress>
{
  protected override void Configure(ISortInputTypeDescriptor<IAddress> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
