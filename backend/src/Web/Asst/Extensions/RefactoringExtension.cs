using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Web.Asst.DataLoaders;

namespace RealGimm.Web.Asst.Extensions;

[ExtendObjectType(typeof(Refactoring))]
public sealed class RefactoringExtension
{
  public Task<IReadOnlyList<EstateUnit>> GetEstateUnits(
    [Parent] Refactoring refactoring,
    [Service] EstateUnitDataLoader loader,
    CancellationToken cancellationToken = default)
    => loader.LoadAsync(refactoring.EstateUnitIds, cancellationToken);
}
