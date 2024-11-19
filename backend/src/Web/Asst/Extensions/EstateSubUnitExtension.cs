using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Asst.Extensions;

[ExtendObjectType(typeof(EstateSubUnit))]
public sealed class EstateSubUnitExtension
{
  public async Task<ISubject?> GetOccupantSubject(
    [Parent] EstateSubUnit estateSubUnit,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => estateSubUnit.OccupantId.HasValue
      ? await dataLoader.LoadAsync(estateSubUnit.OccupantId.Value, cancellationToken)
      : null;

  public async Task<OrgUnit?> GetOrgUnit(
    [Parent] EstateSubUnit estateSubUnit,
    [Service] OrgUnitDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => estateSubUnit.OrgUnitId.HasValue
      ? await dataLoader.LoadAsync(estateSubUnit.OrgUnitId.Value, cancellationToken)
      : null;
}
