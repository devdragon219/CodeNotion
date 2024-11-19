using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Shared;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.Plugin.Import.Anag;

public partial class SubjectMapper
{
  private async Task MapCategories(Subject subject, SubjectDTO source, CancellationToken cancellationToken)
  {
    var categories = await _subjectCategoryRepository
      .AsQueryable()
      .Where(cat => (source.IsAdministrator && cat.Function.HasFlag(CategoryFunction.BuildingAdministrator))
        || (source.IsEmployee && cat.Function.HasFlag(CategoryFunction.Employee))
        || (source.IsLandlord && cat.Function.HasFlag(CategoryFunction.Landlord))
        || (source.IsOfficer && cat.Function.HasFlag(CategoryFunction.Officer))
        || (source.IsTenant && cat.Function.HasFlag(CategoryFunction.Tenant))
        || (source.IsMgmtSubject && cat.Function.HasFlag(CategoryFunction.CompanyGroup))
        || ((source.IsTenant || source.IsLandlord) && cat.Function.HasFlag(CategoryFunction.AgreementParty))
        )
      .ToListAsync(cancellationToken);

    subject.SetCategories(categories);
  }

  private static void MapContacts(Subject subject, IEnumerable<ContactDTO>? contacts)
  {
    if(contacts is null)
    {
      //Just clear the existing contacts, if any
      foreach(var c in subject.Contacts.ToList())
      {
        subject.RemoveContact(c);
      }

      return;
    }

    var existing = subject.Contacts
      .Select(c => $"{c.ContactType}//{c.ContactInfoType}//{c.ContactInfo}//{c.Notes}")
      .ToHashSet();

    var contactsToBe = contacts!
      .Select(c => {
        var contactInfoType = c.ContactType switch
        {
          "TC1" => ContactInfoType.LandlinePhone,
          "TC2" => ContactInfoType.MobilePhone, //Also, "TELEX"
          "TC3" => ContactInfoType.Unknown,     //Actually, "FAX"
          "TC4" => ContactInfoType.EMail,
          //TC5 would have been internal communication via employee registration number
          _ => ContactInfoType.Unknown
        };

        var newContact = new Contact();

        if (c.SubjectLastUpdated.HasValue)
        {
          newContact.SetCreationDate(
            ImportDataConverter.MakeUTCFromCentralEuropean(
              c.SubjectLastUpdated)!.Value);
        }

        newContact.SetContactInfo(
          contactInfoType,
          c.ContactInfo);

        var notes = c.Notes;

        if ("TC3" == c.ContactType)
        {
          notes = (string.IsNullOrEmpty(notes)
              ? string.Empty
              : (notes + "; ")
            ) + "FAX";
        }

        newContact.SetNotes(notes);

        ImportDataConverter.FixStringLengths(newContact);

        return newContact;
      })
      .ToList();

    var toBe = contactsToBe
      .Select(c => $"{c.ContactType}//{c.ContactInfoType}//{c.ContactInfo}//{c.Notes}")
      .ToHashSet();

    if(toBe.Count == existing.Count && existing.All(e => toBe.Contains(e)))
    {
      //Both sets are equal, nothing to do
      return;
    }

    foreach (var c in subject.Contacts.ToList())
    {
      subject.RemoveContact(c);
    }

    //There is simply no way of updating contacts, so we remove and replace
    foreach (var c in contactsToBe)
    {
      subject.AddContact(c);
    }
  }

  private void MapAddresses(
    Subject subject,
    IEnumerable<AddressDTO>? addresses,
    AnagImportWorkspace workspace)
  {
    var sourceAddr = addresses ?? [];

    var existingAddr = subject
      .Addresses
      .Where(add => add.AddressType != AddressType.LegalResidential
        && add.AddressType != AddressType.BirthLocation)
      .Select(a => new {
        Address = a,
        ToponymyFix = a.Toponymy ?? "-",
        CityFix = a.CityName ?? "-"
      })
      .Select(a => new
      {
        a.Address,
        Key = $"{a.Address.AddressType}%{a.CityFix}%{a.ToponymyFix[..Math.Min(25, a.ToponymyFix.Length)]}%{a.Address.Numbering ?? "-"}%{a.Address.LocalPostCode ?? "-"}"
          .ToLowerInvariant()
      })
      .ToDictionary(a => a.Key, a => a.Address);

    var newAddr = sourceAddr
        .Select(FixNumberingToponymy)
        .Select(a => new
        {
          Address = a,
          CityName = a.CityId is not null && workspace.CitiesCache.TryGetValue(a.CityId, out var value)
            ? value.Name
            : "-",
          AddressType = a.AddressType.ParseAsRG2AddressType(),
          Toponymy = a.Toponymy ?? "-"
        })
        .Select(a => new {
          a.Address,
          a.AddressType,
          Key = $"{a.AddressType}%{a.CityName}%{a.Toponymy[..Math.Min(25, a.Toponymy.Length)]}%{a.Address.Numbering ?? "-"}%{a.Address.PostCode ?? "-"}"
            .ToLowerInvariant()
        })
        .GroupBy(a => a.Key)
        .ToDictionary(a => a.Key, a => a.First());

    foreach (var toRemove in existingAddr.Where(kvp => !newAddr.ContainsKey(kvp.Key)))
    {
      subject.RemoveAddress(toRemove.Value);
    }

    foreach (var toAdd in newAddr.Where(kvp => !existingAddr.ContainsKey(kvp.Key)
      && kvp.Value.AddressType != AddressType.LegalResidential))
    {
      var address = new Address();
      address.SetType(toAdd.Value.AddressType);

      UpdateAddress(workspace, address, toAdd.Value.Address);

      if(!string.IsNullOrEmpty(address.CityName)
        && !string.IsNullOrEmpty(address.Toponymy))
      {
        subject.AddAddress(address);
      }
    }

    foreach (var toUpdate in newAddr.Where(kvp => existingAddr.ContainsKey(kvp.Key)
      || kvp.Value.AddressType == AddressType.LegalResidential))
    {
      var destAddress = toUpdate.Value.AddressType == AddressType.LegalResidential
        ? subject.LegalResidentialAddress
        : existingAddr[toUpdate.Key];

      if (destAddress is null)
      {
        destAddress = new Address();
        destAddress.SetType(AddressType.LegalResidential);
        UpdateAddress(workspace, destAddress, toUpdate.Value.Address);

        if(!string.IsNullOrEmpty(destAddress.CityName)
          && !string.IsNullOrEmpty(destAddress.Toponymy))
        {
          subject.AddAddress(destAddress);
        }
      } else {
        UpdateAddress(workspace, destAddress, toUpdate.Value.Address);
      }
    }
  }

  private static void UpdateAddress(
    AnagImportWorkspace workspace,
    Address address,
    AddressDTO source)
  {
    if (source.CityId is null)
    {
      return;
    }

    if (workspace.CitiesCache.TryGetValue(source.CityId, out var city))
    {
      address.SetCity(city.Name, city.Guid);
      address.SetCounty(city.CountyName, city.CountyGuid);
      address.SetCountry(city.CountryISO, city.CountryName);

      address.SetLocalPostCode(source.PostCode);
      address.SetToponymy(source.Toponymy);
      address.SetNumbering(source.Numbering);

      ImportDataConverter.FixStringLengths(address);
    }
  }

  private static void MapBankAccounts(Subject subject, IEnumerable<BankAccountDTO>? accounts)
  {
    if(accounts is null)
    {
      //Just clear the existing bank accounts, if any
      foreach(var ba in subject.BankAccounts.ToList())
      {
        subject.RemoveBankAccount(ba);
      }

      return;
    }

    var existing = subject.BankAccounts
      .Select(ba => $"{ba.BankAccountType}//{ba.AccountHolder}//{ba.ReferenceCodeType}//{ba.ReferenceCode}//{ba.Notes}")
      .ToHashSet();

    var didInsertMain = false;

    var bankAccountToBe = accounts!
      .Where(a => !a.IsClosed)
      .Select(ba => {
        var newAccount = new BankAccount();

        if (ba.SubjectLastUpdated.HasValue)
        {
          newAccount.SetCreationDate(
            ImportDataConverter.MakeUTCFromCentralEuropean(
              ba.SubjectLastUpdated)!.Value);
        }

        newAccount.SetHolder(ba.AccountHolder);
        newAccount.SetReference(ba.IBAN, BankAccountCodeType.IBAN);
        newAccount.SetType(
          didInsertMain
          ? BankAccountType.Backup
          : BankAccountType.Main);

        ImportDataConverter.FixStringLengths(newAccount);

        return newAccount;
      })
      .ToList();

    var toBe = bankAccountToBe
      .Select(ba => $"{ba.BankAccountType}//{ba.AccountHolder}//{ba.ReferenceCodeType}//{ba.ReferenceCode}//{ba.Notes}")
      .ToHashSet();

    if(toBe.Count == existing.Count && existing.All(e => toBe.Contains(e)))
    {
      //Both sets are equal, nothing to do
      return;
    }

    foreach (var ba in subject.BankAccounts.ToList())
    {
      subject.RemoveBankAccount(ba);
    }

    //There is simply no way of updating contacts, so we remove and replace
    foreach (var ba in bankAccountToBe)
    {
      subject.AddBankAccount(ba);
    }
  }

  private static void MapTaxStatus(Subject subject, SubjectDTO source, IEnumerable<SplitPaymentDTO>? spPeriods)
  {
    foreach (var ts in subject.TaxStatuses
      .ToList())
    {
      subject.RemoveTaxStatus(ts);
    }

    if (source.IsTenantVAT)
    {
      var taxStatus = new TaxStatus();
      taxStatus.SetType(TaxStatusType.VATSubjectAsTenant);
      subject.AddTaxStatus(taxStatus);
    }

    if (source.IsLandlordVAT)
    {
      var taxStatus = new TaxStatus();
      taxStatus.SetType(TaxStatusType.VATSubjectAsLandlord);
      subject.AddTaxStatus(taxStatus);
    }

    if (spPeriods is not null)
    {
      //There is no easy way of updating split payment periods, so we remove and replace
      foreach (var sp in spPeriods)
      {
        var taxStatus = new TaxStatus();

        taxStatus.SetType(TaxStatusType.ApplySplitPayment);
        taxStatus.SetValidityDates(
          sp.StartDate is null ? null : DateOnly.FromDateTime(sp.StartDate!.Value),
          sp.EndDate is null ? null : DateOnly.FromDateTime(sp.EndDate!.Value));

        subject.AddTaxStatus(taxStatus);
      }
    }
  }

  private async Task MapOfficer(Subject subject, IEnumerable<OfficerDTO>? officers)
  {
    foreach (var off in subject.Officers.ToList())
    {
      subject.RemoveOfficerById(off.SubordinateId);
    }

    if (officers is not null)
    {
      //There is no easy way of updating split payment periods, so we remove and replace
      foreach (var officer in officers)
      {
        var localOfficer = await _subjectRepository
          .AsQueryable(new EntityNonDeletedSpec<Subject>())
          .FirstOrDefaultAsync(s => s.InternalCode == officer.OfficerInternalCode);

        var officerType = officer.OfficerType switch
        {
          "DELEGATO ALLA FIRMA" => OfficerType.LegalRepresentative,
          "INCARICATO ALLA FIRMA" => OfficerType.LegalRepresentative,
          "LEGALE RAPPRESENTANTE" => OfficerType.LegalRepresentative,
          "PROCURATORE SPECIALE" => OfficerType.ExecutorAdministrator,
          "RAPPRESENTANTE LEGALE" => OfficerType.LegalRepresentative,
          _ => OfficerType.LegalRepresentative
        };

        if (localOfficer is not null)
        {
          subject.AddOfficer(localOfficer,
            officerType,
            officer.StartDate is null ? null : DateOnly.FromDateTime(officer.StartDate!.Value),
            officer.EndDate is null ? null : DateOnly.FromDateTime(officer.EndDate!.Value),
            null);
        }
      }
    }
  }

  private static void SetNumberingToponymy(Address a, string? srcToponymy)
  {
    var (toponymy, numbering) = AddressMiner.MineData(srcToponymy);

    a.SetToponymy(toponymy);
    a.SetNumbering(numbering);
  }

  private static AddressDTO FixNumberingToponymy(AddressDTO source)
  {
    var (toponymy, numbering) = AddressMiner.MineData(source.Toponymy);

    source.Toponymy = toponymy;
    source.Numbering = numbering;

    return source;
  }
}
