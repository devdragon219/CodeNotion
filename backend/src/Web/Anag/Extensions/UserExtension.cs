using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using UAgg = RealGimm.Core.IAM.UserAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Anag.Extensions;

[ExtendObjectType(typeof(UAgg.User))]
public class UserExtension
{
  public async Task<IEnumerable<ISubject>> GetManagementSubjects(
    [Parent] UAgg.User user,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken)
    => user.Subjects is null
      ? Array.Empty<ISubject>()
      : await dataLoader.LoadAsync(user.Subjects, cancellationToken);

  public async Task<IEnumerable<OrgUnit>> GetManagementOrgUnits(
    [Parent] UAgg.User user,
    [Service] OrgUnitDataLoader dataLoader,
    CancellationToken cancellationToken)
    => user.OrgUnits is null
      ? Array.Empty<OrgUnit>()
      : await dataLoader.LoadAsync(user.OrgUnits, cancellationToken);
}
