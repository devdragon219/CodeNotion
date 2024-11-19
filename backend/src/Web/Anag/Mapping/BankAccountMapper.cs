using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Anag.Mapping;

public class BankAccountMapper : IMapper<BankAccountInput, BankAccount>
{
  public Task<BankAccount?> MapAsync(BankAccountInput? from, BankAccount? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static BankAccount? Map(BankAccountInput? from, BankAccount? into)
  {
    if (from is null)
    {
      return null;
    }

    var bankAccount = into ?? new BankAccount();
    bankAccount.SetType(from.BankAccountType);
    bankAccount.SetReference(from.ReferenceCode, BankAccountCodeType.IBAN);
    bankAccount.SetHolder(from.AccountHolder);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      bankAccount.Id = from.Id!.Value;
    }

    bankAccount.SetNotes(from.Notes);

    return bankAccount;
  }
}
