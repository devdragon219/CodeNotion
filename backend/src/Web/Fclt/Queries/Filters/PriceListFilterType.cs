using HotChocolate.Data.Filters;
using RealGimm.Core.Fclt.PriceListAggregate;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class PriceListFilterType : FilterInputType<PriceList>
{
  protected override void Configure(IFilterInputTypeDescriptor<PriceList> descriptor)
  {
    descriptor.BindFieldsImplicitly();
  }
}
