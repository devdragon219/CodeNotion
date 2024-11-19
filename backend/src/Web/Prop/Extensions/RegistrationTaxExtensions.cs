using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(RegistrationTax))]
public class RegistrationTaxExtensions
{
  public async Task<ISubject?> GetLegalRepresentativeSubject(
    [Parent] RegistrationTax registrationTax,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => registrationTax.TakeoverLegalRepresentativeSubjectId.HasValue
      ? await dataLoader.LoadAsync(registrationTax.TakeoverLegalRepresentativeSubjectId.Value, cancellationToken)
      : null;

  public async Task<IEnumerable<ISubject>> GetOriginalSubjects(
    [Parent] RegistrationTax registrationTax,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => await dataLoader.LoadAsync(registrationTax.TakeoverOriginalSubjectIds, cancellationToken);
}
