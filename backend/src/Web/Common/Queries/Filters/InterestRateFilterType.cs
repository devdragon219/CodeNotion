using HotChocolate.Data.Filters;
using RealGimm.Core.Common.InterestRateAggregate;

namespace RealGimm.Web.Common.Queries.Filters;

public class InterestRateFilterType : FilterInputType<InterestRate>
{
    protected override void Configure(IFilterInputTypeDescriptor<InterestRate> descriptor)
    {
        descriptor.BindFieldsImplicitly();
    }
}
