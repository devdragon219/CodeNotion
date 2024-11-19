using HotChocolate.Data.Filters;
using HotChocolate.Data.Filters.Expressions;

namespace RealGimm.WebCommons.Filtering;

public class CustomFilterConvention : FilterConvention
{
    protected override void Configure(IFilterConventionDescriptor descriptor)
    {
        descriptor.AddDefaults();
        descriptor.BindRuntimeType<string, CustomStringFilterInput>();
        descriptor.AddProviderExtension(new QueryableFilterProviderExtension(
          y => y.AddFieldHandler<QueryableStringInvariantContainsHandler>()
        ));
    }
}