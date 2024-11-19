using RealGimm.Core.IAM.GroupAggregate;
using HotChocolate.Data.Filters;

namespace RealGimm.Web.Admin.Queries.Filters;

public class GroupFilterType : FilterInputType<Group>
{
protected override void Configure(
        IFilterInputTypeDescriptor<Group> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(f => f.Id);
        descriptor.Field(f => f.Name);
        descriptor.Field(f => f.Description);
    }
}
