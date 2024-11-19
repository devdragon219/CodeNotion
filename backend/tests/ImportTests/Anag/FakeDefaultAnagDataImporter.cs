using RealGimm.Plugin.Import.Anag;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.ImportTests.Anag;

internal sealed class FakeDefaultAnagDataImporter : DefaultAnagDataImporter
{
  public required FakeImportData FakeImportData { get; init; }

  internal override Task<Dictionary<string, IEnumerable<AddressDTO>>> SubjectAddresses(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.Addresses);

  internal override Task<Dictionary<string, IEnumerable<BankAccountDTO>>> SubjectBankAccounts(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.BankAccounts);

  internal override Task<Dictionary<string, IEnumerable<ContactDTO>>> SubjectContacts(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.Contacts);

  internal override Task<Dictionary<string, IEnumerable<OfficerDTO>>> SubjectOfficers(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.Officers);

  internal override Task<Dictionary<string, IEnumerable<SplitPaymentDTO>>> SubjectSplitPayments(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.SplitPayments);

  internal override Task<IEnumerable<SubjectDTO>> Subjects(CancellationToken cancellationToken)
    => Task.FromResult(FakeImportData.Subjects);
}
