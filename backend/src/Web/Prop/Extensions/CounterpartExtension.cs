using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(Counterpart))]
public class CounterpartExtensions
{
  public async Task<ISubject> GetSubject(
    [Parent] Counterpart counterpart,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(counterpart.SubjectId, cancellationToken);
}
