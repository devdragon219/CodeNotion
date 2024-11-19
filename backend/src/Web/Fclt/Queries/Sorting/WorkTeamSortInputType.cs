using HotChocolate.Data.Sorting;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Sorting;

public class WorkTeamSortInputType : SortInputType<WorkTeam>
{
  protected override void Configure(ISortInputTypeDescriptor<WorkTeam> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<WorkTeam, Subject>(
      "providerSubjectName",
      subject => subject.Name!,
      subjectsPerId => workTeam => subjectsPerId[workTeam.ProviderSubjectId]);

    descriptor.BindExtensionStringField<WorkTeam, User>(
      "leaderUserName",
      user => user.LastName + " " + user.FirstName,
      usersPerId => workTeam => usersPerId[workTeam.LeaderUserId]);
  }
}
