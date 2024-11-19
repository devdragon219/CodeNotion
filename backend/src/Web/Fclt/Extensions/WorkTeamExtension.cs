using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.WebCommons.Anag.DataLoaders;
using RealGimm.WebCommons.User.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(WorkTeam))]
public sealed class WorkTeamExtension
{
  public async Task<ISubject> GetProviderSubject(
    [Parent] WorkTeam workTeam,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(workTeam.ProviderSubjectId, cancellationToken);

  public async Task<User> GetLeaderUser(
    [Parent] WorkTeam workTeam,
    [Service] UserDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(workTeam.LeaderUserId, cancellationToken);
}
