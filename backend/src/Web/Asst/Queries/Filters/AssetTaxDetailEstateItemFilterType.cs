using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Web.Anag.Queries.Filters;

namespace RealGimm.Web.Asst.Queries.Filters;

public class AssetTaxDetailEstateItemFilterType : FilterInputType<AssetTaxDetailEstateItem>
{
  protected override void Configure(IFilterInputTypeDescriptor<AssetTaxDetailEstateItem> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(e => e.Address).Type<AddressFilterType>();
    descriptor.Field(f => f.SubRows).Type<ListFilterInputType<AssetTaxDetailEstateUnitItemFilterType>>();
  }
}
