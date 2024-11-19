using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(Transactor))]
public class TransactorExtensions
{
  public async Task<ISubject> GetSubject(
    [Parent] Transactor transactor,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(transactor.SubjectId, cancellationToken);
}
