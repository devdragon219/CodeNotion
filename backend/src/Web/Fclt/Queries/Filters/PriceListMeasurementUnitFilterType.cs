using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class PriceListMeasurementUnitFilterType : FilterInputType<PriceListMeasurementUnit>
{
  protected override void Configure(IFilterInputTypeDescriptor<PriceListMeasurementUnit> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
