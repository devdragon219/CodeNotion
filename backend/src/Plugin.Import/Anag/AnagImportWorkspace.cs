using RealGimm.Core.Common.CityAggregate;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.Plugin.Import.Anag;

public record AnagImportWorkspace(
  bool DisableValidation,
  Dictionary<string, City> CitiesCache,
  Dictionary<string, IEnumerable<ContactDTO>> Contacts,
  Dictionary<string, IEnumerable<AddressDTO>> Addresses,
  Dictionary<string, IEnumerable<BankAccountDTO>> BankAccounts,
  Dictionary<string, IEnumerable<SplitPaymentDTO>> SplitPayments,
  Dictionary<string, IEnumerable<OfficerDTO>> Officers
);
