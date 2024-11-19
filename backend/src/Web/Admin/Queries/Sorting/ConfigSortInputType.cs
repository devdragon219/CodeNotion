using HotChocolate.Data.Sorting;
using RealGimm.Core.Common.ConfigAggregate;

namespace RealGimm.Web.Admin.Queries.Sorting;

public class ConfigSortInputType : SortInputType<Config>
{
    protected override void Configure(ISortInputTypeDescriptor<Config> descriptor)
    {
        descriptor.BindFieldsImplicitly();
    }
}
