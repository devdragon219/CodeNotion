using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class AssetTaxGroupedRowSortInputType : SortInputType<AssetTaxGroupedRow>
{
  protected override void Configure(ISortInputTypeDescriptor<AssetTaxGroupedRow> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
