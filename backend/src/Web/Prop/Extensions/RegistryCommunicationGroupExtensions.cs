using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Prop.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType<RegistryCommunicationGroup>]
public class RegistryCommunicationGroupExtensions
{
  public async Task<ISubject> GetManagementSubject(
    [Parent] RegistryCommunicationGroup group,
    [Service] RegistryCommunicationManagementSubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => await loader.LoadAsync(group.Id.ManagementSubjectId, cancellationToken);
  
  public async Task<ISubject?> GetRequestingSubjectLegalRepresentative(
    [Parent] RegistryCommunicationGroup group,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
    => group.Id.RequestingSubjectLegalRepresentativeId.HasValue
        ? await loader.LoadAsync(group.Id.RequestingSubjectLegalRepresentativeId.Value, cancellationToken)
        : null;

  public async Task<BankAccount?> GetDebtBankAccount(
    [Parent] RegistryCommunicationGroup group,
    [Service] SubjectDataLoader loader,
    CancellationToken cancellationToken = default)
  {
    if (group.Id.DebtBankAccountId is null)
    {
      return null;
    }

    var managementSubject = await loader.LoadAsync(group.Id.ManagementSubjectId, cancellationToken);

    return managementSubject.BankAccounts.Single(bankAccount => bankAccount.Id == group.Id.DebtBankAccountId);
  }
}
