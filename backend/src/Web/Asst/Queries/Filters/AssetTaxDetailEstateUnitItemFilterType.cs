using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Web.Anag.Queries.Filters;

namespace RealGimm.Web.Asst.Queries.Filters;

public class AssetTaxDetailEstateUnitItemFilterType : FilterInputType<AssetTaxDetailEstateUnitItem>
{
  protected override void Configure(IFilterInputTypeDescriptor<AssetTaxDetailEstateUnitItem> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Field(e => e.Address).Type<AddressFilterType>();
    descriptor.Field(e => e.CadastralUnitIncome).Type<CadastralUnitIncomeFilterType>();
    descriptor.Field(e => e.CadastralUnitTaxConfig).Type<CadastralUnitTaxConfigFilterType>();
    descriptor.Field(e => e.CadastralCoordinates).Type<ListFilterInputType<CadastralCoordinatesFilterType>>();

    descriptor.Ignore(e => e.Estate);
  }
}
