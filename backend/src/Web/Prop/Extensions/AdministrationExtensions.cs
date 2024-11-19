using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Web.Anag.DataLoaders;
using RealGimm.Web.Asst.DataLoaders;
using RealGimm.WebCommons.Anag.DataLoaders;

namespace RealGimm.Web.Prop.Extensions;

[ExtendObjectType(typeof(Administration))]
public class AdministrationExtensions
{
  public Task<Estate> GetEstate(
    [Parent] Administration administration,
    [Service] EstateDataLoader dataLoader,
    CancellationToken cancellationToken = default)
    => dataLoader.LoadAsync(administration.EstateId, cancellationToken);

  public async Task<ISubject> GetAdministratorSubject(
   [Parent] Administration administration,
   [Service] SubjectDataLoader dataLoader,
   CancellationToken cancellationToken = default)
   => await dataLoader.LoadAsync(administration.AdministratorSubjectId, cancellationToken);

  public async Task<BankAccount?> GetBankAccount(
    [Parent] Administration administration,
    [Service] SubjectDataLoader dataLoader,
    CancellationToken cancellationToken = default)
  {
    if (administration.AdministratorBankAccountId is null)
    {
      return null;
    }

    var subject = await dataLoader.LoadAsync(administration.AdministratorSubjectId, cancellationToken);

    return subject?.BankAccounts.SingleOrDefault(bankAccount => bankAccount.Id == administration.AdministratorBankAccountId.Value);
  }
}
