using Microsoft.EntityFrameworkCore;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.GroupAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.IAM.Services;

public class GroupPermissionService
{
  private readonly IRepository<Group> _groupRepo;

  public GroupPermissionService(IRepository<Group> groupRepo)
  {
    _groupRepo = groupRepo;
  }

  public async Task<IEnumerable<PermissionSummary>> GetPermissionSummaryAsync(
    int[] groupIds,
    CancellationToken cancellationToken = default)
  {
    var groups = await _groupRepo
      .AsQueryable(new GetByIdsSpec<Group>(groupIds), new GroupIncludeAllSpec())
      .ToListAsync(cancellationToken);

    var features = groups.SelectMany(g => g.Features.Select(f => new PermissionSummary(
      f.Feature,
      f.CanCreate,
      f.CanRead,
      f.CanUpdate,
      f.CanDelete
    )));

    //Group by same feature and sum up all permissions that may come from
    // different groups
    features = features.GroupBy(f => f.Feature)
      .Select(fgroup => new PermissionSummary(
        fgroup.Key,
        fgroup.Any(f => f.CanCreate),
        fgroup.Any(f => f.CanRead),
        fgroup.Any(f => f.CanUpdate),
        fgroup.Any(f => f.CanDelete)
      ));

    //Group features by module (ignore last two characters of feature key)
    // and, if all module features are present and have the same permissions,
    // replace with a single permissionsummary where the feature's
    // last two characters are "00"
    var allFeatures = Features.AllFeatureList();

    features = features.GroupBy(f => f.Feature.Length > 2
      ? (f.Feature[..^2] + "00")
      : f.Feature)
      .SelectMany(grp =>
      {
        if (!grp.Key.EndsWith("00")) return grp.ToArray();

        var moduleRoot = grp.Key[..^2];

        var thisModuleFeatures = allFeatures.Where(f => f.Length > 2 && f[..^2] == moduleRoot);

        if (thisModuleFeatures.All(totf => grp.Any(f => f.Feature == totf)))
        {
          //All features are present, check for permissions
          var firstFeature = grp.First();
          if (grp.All(f => f.CanCreate == firstFeature.CanCreate
            && f.CanRead == firstFeature.CanRead
            && f.CanUpdate == firstFeature.CanUpdate
            && f.CanDelete == firstFeature.CanDelete))
          {
            return new[] {firstFeature with
            {
              Feature = moduleRoot + "00"
            }};
          }
        }

        return grp.ToArray();
      });

    return features;
  }
}
