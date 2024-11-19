using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;
using RealGimm.Core.Taxes.Tables;

namespace RealGimm.Web.Common.Queries.Sorting;

public class TaxConfigMainTableSortInputType : SortInputType<ITaxConfigMainTableRow>
{
  protected override void Configure(ISortInputTypeDescriptor<ITaxConfigMainTableRow> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(f => (f.GetType() == typeof(TaxConfigGroupedRow))
        ? (((TaxConfigGroupedRow)f).GroupingName
          ?? (((TaxConfigGroupedRow)f).City != null
            ? ((TaxConfigGroupedRow)f).City!.Name
            : null))
        : null)
      .Name("groupingName");
  }
}
