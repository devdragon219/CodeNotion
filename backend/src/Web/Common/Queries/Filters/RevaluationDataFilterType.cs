using HotChocolate.Data.Filters;
using RealGimm.Core.Common.RevaluationDataAggregate;

namespace RealGimm.Web.Common.Queries.Filters;

public class RevaluationDataFilterType : FilterInputType<RevaluationData>
{
    protected override void Configure(IFilterInputTypeDescriptor<RevaluationData> descriptor)
    {
        descriptor.BindFieldsImplicitly();
    }
}
