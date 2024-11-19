using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(SecurityDeposit))]
public class SecurityDepositExtensions
{
  public async Task<ISubject?> GetSubject(
    [Parent] SecurityDeposit securityDeposit,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => securityDeposit.SubjectId.HasValue
      ? await dataLoader.LoadAsync(securityDeposit.SubjectId.Value, cancellationToken)
      : null;

  public async Task<ISubject?> GetSuretySubject(
    [Parent] SecurityDeposit securityDeposit,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => securityDeposit.SuretySubjectId.HasValue
      ? await dataLoader.LoadAsync(securityDeposit.SuretySubjectId.Value, cancellationToken)
      : null;
}
