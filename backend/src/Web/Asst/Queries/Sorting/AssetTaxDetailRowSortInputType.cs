using HotChocolate.Data.Sorting;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;

namespace RealGimm.Web.Asst.Queries.Sorting;

public class AssetTaxDetailRowSortInputType : SortInputType<AssetTaxDetailRow>
{
  protected override void Configure(ISortInputTypeDescriptor<AssetTaxDetailRow> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Ignore(e => e.Address);
    descriptor.Ignore(e => e.SubRows);
  }
}
