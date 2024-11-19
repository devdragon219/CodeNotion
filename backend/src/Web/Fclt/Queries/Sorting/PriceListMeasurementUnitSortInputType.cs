using HotChocolate.Data.Sorting;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class PriceListMeasurementUnitSortInputType : SortInputType<PriceListMeasurementUnit>
{
  protected override void Configure(ISortInputTypeDescriptor<PriceListMeasurementUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
