using HotChocolate.Data.Filters;
using RealGimm.Core.Taxes.Tables;
using RealGimm.WebCommons.Filtering;

namespace RealGimm.Web.Common.Queries.Filters;

public class TaxConfigMainTableFilterType : FilterInputType<ITaxConfigMainTableRow>
{
  protected override void Configure(IFilterInputTypeDescriptor<ITaxConfigMainTableRow> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor
      .Field(f => (f.GetType() == typeof(TaxConfigGroupedRow))
        ? (((TaxConfigGroupedRow)f).GroupingName
          ?? (((TaxConfigGroupedRow)f).City != null
            ? ((TaxConfigGroupedRow)f).City!.Name
            : null))
        : null)
      .Type<CustomStringFilterInput>()
      .Name("groupingName");
  }
}
