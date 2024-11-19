using HotChocolate.Data.Filters;
using RealGimm.Core.Common.ConfigAggregate;

namespace RealGimm.Web.Admin.Queries.Filters;

public class ConfigFilterType : FilterInputType<Config>
{
    protected override void Configure(IFilterInputTypeDescriptor<Config> descriptor)
    {
        descriptor.BindFieldsImplicitly();
    }
}
