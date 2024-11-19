using HotChocolate.Data.Filters;
using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.Web.Common.Queries.Filters;

public class VATRateFilterType : FilterInputType<VATRate>
{
    protected override void Configure(IFilterInputTypeDescriptor<VATRate> descriptor)
    {
        descriptor.BindFieldsImplicitly();
    }
}
