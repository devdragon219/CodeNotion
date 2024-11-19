using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Web.Anag.Queries.Filters;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class AssetTaxDetailEstateUnitItemSortInputType : SortInputType<AssetTaxDetailEstateUnitItem>
{
  protected override void Configure(ISortInputTypeDescriptor<AssetTaxDetailEstateUnitItem> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(e => e.Address).Type<AddressFilterType>();
    
    descriptor.Ignore(e => e.Estate);
    descriptor.Ignore(e => e.CadastralCoordinates);
    descriptor.Ignore(e => e.CadastralUnitTaxConfig);
    descriptor.Ignore(e => e.CadastralUnitIncome);
  }
}
