using RealGimm.Core.CrossModule;
using HotChocolate.Data.Sorting;

namespace RealGimm.Web.Anag.Queries.Sorting;

public class AddressSortInputType : SortInputType<IAddress>
{
  protected override void Configure(ISortInputTypeDescriptor<IAddress> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
