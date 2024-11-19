using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.ImportTests.Anag;

internal record FakeImportData(
  Dictionary<string, IEnumerable<AddressDTO>> Addresses,
  Dictionary<string, IEnumerable<BankAccountDTO>> BankAccounts,
  Dictionary<string, IEnumerable<ContactDTO>> Contacts,
  Dictionary<string, IEnumerable<OfficerDTO>> Officers,
  Dictionary<string, IEnumerable<SplitPaymentDTO>> SplitPayments,
  IEnumerable<SubjectDTO> Subjects);
