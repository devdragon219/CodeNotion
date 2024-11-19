using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.WebCommons.Anag.DataLoaders;
using UAgg = RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.WebCommons.GraphQL.User.Extensions;

[ExtendObjectType<UAgg.User>]
public class UserExtensions
{
  public async Task<ISubject?> GetSupplierSubject(
    [Parent] UAgg.User user,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    if (user.SupplierSubjectId == null)
    {
      return null;
    }

    return await loader.LoadAsync(user.SupplierSubjectId.Value, cancellationToken);
  }
}
