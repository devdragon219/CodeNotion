using UAgg = RealGimm.Core.IAM.UserAggregate;
using GAgg = RealGimm.Core.IAM.GroupAggregate;
using HotChocolate.Data.Filters;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.Web.Admin.Queries.Filters;

public class UserFilterType : FilterInputType<UAgg.User>
{
  protected override void Configure(IFilterInputTypeDescriptor<UAgg.User> descriptor)
  {
    descriptor.BindFieldsImplicitly();
    descriptor.Ignore(e => e.Groups);

    descriptor
      .BindExtensionStringField<UAgg.User, GAgg.Group>("groupName",
          str => group => group.Name!.Contains(str),
          idArray => user => user.UserGroups != null && user.UserGroups.Select(e => e.GroupId).Any(e => idArray.Contains(e))
        );

    descriptor
      .BindExtensionStringField<UAgg.User, Subject>("managementSubjectName",
          str => subject => subject.Name!.Contains(str),
          idArray => user => user.Subjects != null && user.Subjects.Any(e => idArray.Contains(e))
        );

  }
}
