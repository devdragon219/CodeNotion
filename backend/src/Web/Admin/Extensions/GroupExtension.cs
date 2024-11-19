using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Web.Admin.DataLoaders;

namespace RealGimm.Web.Admin.Extensions;

[ExtendObjectType(typeof(Group))]
public sealed class GroupExtension
{
  public async Task<IEnumerable<PermissionSummary>> GetPermissionSummary(
    [Parent] Group group,
    [Service] GroupPermissionDataLoader permissionDataLoader,
    CancellationToken cancellationToken = default)
    => await permissionDataLoader.LoadAsync(group.Id, cancellationToken);
}
