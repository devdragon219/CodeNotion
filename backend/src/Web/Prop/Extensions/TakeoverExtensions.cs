using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(Takeover))]
public class TakeoverExtensions
{
  public async Task<ISubject> GetOriginalSubject(
    [Parent] Takeover takeover,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(takeover.OriginalSubjectId, cancellationToken);

  public async Task<ISubject> GetNewSubject(
    [Parent] Takeover takeover,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(takeover.NewSubjectId, cancellationToken);

  public async Task<ISubject?> GetLegalRepresentativeSubject(
    [Parent] Takeover takeover,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => takeover.LegalRepresentativeSubjectId.HasValue
      ? await loader.LoadAsync(takeover.LegalRepresentativeSubjectId.Value, cancellationToken)
      : null;
}
