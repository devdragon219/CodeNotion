using HotChocolate.Data.Filters;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;

namespace RealGimm.Web.Asst.Queries.Filters;

public class AssetTaxGroupedRowFilterType : FilterInputType<AssetTaxGroupedRow>
{
  protected override void Configure(IFilterInputTypeDescriptor<AssetTaxGroupedRow> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
