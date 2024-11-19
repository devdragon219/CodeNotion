using UAgg = RealGimm.Core.IAM.UserAggregate;
using HotChocolate.Data.Filters;
using HotChocolate.Data.Sorting;
using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Web.Admin.Queries.Sorting;

public class UserSortInputType : SortInputType<UAgg.User>
{
  protected override void Configure(ISortInputTypeDescriptor<UAgg.User> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Ignore(e => e.Subjects);
    descriptor.Ignore(e => e.OrgUnits);
  }
}
