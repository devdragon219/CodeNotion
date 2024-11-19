using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Fclt.Extensions;

[ExtendObjectType(typeof(EstateUnitGroup))]
public sealed class EstateUnitGroupExtension
{
  public async Task<ISubject> GetManagementSubject(
    [Parent] EstateUnitGroup estateUnitGroup,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(estateUnitGroup.ManagementSubjectId, cancellationToken);

  public async Task<IEnumerable<EstateUnit>> GetEstateUnits(
    [Parent] EstateUnitGroup estateUnitGroup,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(estateUnitGroup.EstateUnitIds, cancellationToken);
}
