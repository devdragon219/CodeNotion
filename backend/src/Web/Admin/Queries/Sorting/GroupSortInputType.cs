using UAgg = RealGimm.Core.IAM.GroupAggregate;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;
using RealGimm.Core.IAM.GroupAggregate;

namespace RealGimm.Web.Admin.Queries.Sorting;

public class GroupSortInputType : SortInputType<UAgg.Group>
{
    protected override void Configure(ISortInputTypeDescriptor<Group> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(f => f.Id);
        descriptor.Field(f => f.Name);
        descriptor.Field(f => f.Description);
    }
}
