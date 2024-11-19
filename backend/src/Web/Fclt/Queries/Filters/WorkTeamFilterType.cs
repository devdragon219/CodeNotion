using HotChocolate.Data.Filters;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.Web.Fclt.Queries.Filters;

public class WorkTeamFilterType : FilterInputType<WorkTeam>
{
  protected override void Configure(IFilterInputTypeDescriptor<WorkTeam> descriptor)
  {
    descriptor.BindFieldsImplicitly();

    descriptor.BindExtensionStringField<WorkTeam, Subject>(
      "providerSubjectName",
      query => subject => subject.Name!.Contains(query),
      subjectIds => workTeam => subjectIds.Contains(workTeam.ProviderSubjectId));

    descriptor.BindExtensionStringField<WorkTeam, User>(
      "leaderUserName",
      query => user => (user.LastName + " " + user.FirstName).Contains(query),
      userIds => workTeam => userIds.Contains(workTeam.LeaderUserId));
  }
}
