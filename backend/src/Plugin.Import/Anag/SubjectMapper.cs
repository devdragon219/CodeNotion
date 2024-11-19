using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common;
using RealGimm.Core.Anag.SubjectAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Shared;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.Plugin.Import.Anag;

public partial class SubjectMapper
{
  public required IRepository<Subject> _subjectRepository { protected get; init; }
  public required IReadRepository<SubjectCategory> _subjectCategoryRepository { protected get; init; }
  public required ILogger<SubjectMapper> _logger { protected get; init; }

  public async Task<Subject> MapSubject(SubjectDTO subject,
    AnagImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var localSub = _subjectRepository
      .AsQueryable(new SubjectIncludeAllSpec())
      .Where(s => s.InternalCode == subject.InternalCode)
      .FirstOrDefault();

    //We expect that the subject cannot change its type during synchronization
    // on updates

    if (localSub is null)
    {
      if (subject.IsMgmtSubject)
      {
        localSub = new ManagementSubject();
      }
      else
      {
        if (subject.SubjectType == "F")
        {
          localSub = new PhysicalSubject();
        }
        else
        {
          localSub = new LegalSubject();

          if (subject.SubjectType == "C")
          {
            ((LegalSubject)localSub)
              .SetLegalSubjectType(LegalSubjectType.UnrecognizedNonbusinessSociety);
          }
        }
      }
    }

    //Updates
    localSub.SetCreationDate(
      ImportDataConverter.MakeUTCFromCentralEuropean(subject.LastUpdatedDate)
        ?? DateTime.UtcNow);

    localSub.SetExternalSourceCode(subject.ExternalCode);
    if (!string.IsNullOrEmpty(subject.InternalCode))
    {
      localSub.SetInternalCode(subject.InternalCode);
    }
    else
    {
      localSub.SetInternalCode(subject.Id);
    }

    localSub.SetEntryStatus(
      subject.IsClosed
        ? EntryStatus.FrozenClosed
        : EntryStatus.Working,
      subject.IsClosed
        ? ImportDataConverter.MakeUTCFromCentralEuropean(
            subject.LastUpdatedDate)
        : null
    );

    await MapCategories(localSub, subject, cancellationToken);

    MapContacts(localSub, subject.InternalCode is not null
          && workspace.Contacts.TryGetValue(subject.InternalCode, out var contacts)
            ? contacts
            : null);
    MapAddresses(localSub, subject.InternalCode is not null
          && workspace.Addresses.TryGetValue(subject.InternalCode, out var addresses)
            ? addresses
            : null,
          workspace);
    MapBankAccounts(localSub, subject.InternalCode is not null
          && workspace.BankAccounts.TryGetValue(subject.InternalCode, out var bankAccounts)
            ? bankAccounts
            : null);
    MapTaxStatus(localSub, subject, subject.InternalCode is not null
          && workspace.SplitPayments.TryGetValue(subject.InternalCode, out var taxStatus)
            ? taxStatus
            : null);
    await MapOfficer(localSub, subject.InternalCode is not null
          && workspace.Officers.TryGetValue(subject.InternalCode, out var officers)
            ? officers
            : null);

    if (localSub is PhysicalSubject pSubject)
    {
      await MapPhysicalSubject(pSubject, subject, workspace);
    }
    else if (localSub is LegalSubject lSubject)
    {
      await MapLegalSubject(lSubject, subject, workspace);
    }
    else if (localSub is ManagementSubject mSubject)
    {
      await MapManagementSubject(mSubject, subject, workspace);
    }

    return localSub;
  }

  private async Task MapPhysicalSubject(
    PhysicalSubject destination,
    SubjectDTO source,
    AnagImportWorkspace workspace)
  {
    destination.SetNames(source.PhysicalFirstName, source.PhysicalLastName);
    if (source.PhysicalBirthDate.HasValue)
    {
      destination.SetBirthDate(DateOnly.FromDateTime(source.PhysicalBirthDate.Value));
    }

    if (!string.IsNullOrEmpty(source.PhysicalBirthSex))
    {
      destination.SetBirthSex(source.PhysicalBirthSex == "M"
        ? BirthSex.Male
        : BirthSex.Female);
    }

    if (!string.IsNullOrEmpty(source.PhysicalBirthCityId)
      && workspace.CitiesCache.TryGetValue(
        source.PhysicalBirthCityId,
        out var birthCity))
    {
      Address birth = destination.BirthLocation ?? new Address();

      birth.SetType(AddressType.BirthLocation);

      birth.SetCity(birthCity.Name, birthCity.Guid);
      birth.SetCounty(birthCity.CountyName, birthCity.CountyGuid);
      birth.SetCountry(birthCity.CountryISO, null);

      if (destination.BirthLocation is null)
      {
        destination.SetBirthLocation(birth);
      }
    }

    if (!string.IsNullOrEmpty(source.BaseCountryTaxIdCode))
    {
      destination.SetBirthCountryTaxIdCode(source.BaseCountryTaxIdCode);
    }

    if (!string.IsNullOrEmpty(source.AdditionalTaxIdCode))
    {
      destination.SetProfessionalTaxIdCode(source.AdditionalTaxIdCode);
    }

    if (!string.IsNullOrEmpty(source.MainAddrCityId)
      && workspace.CitiesCache.TryGetValue(source.MainAddrCityId, out var mainCity)
      && !string.IsNullOrEmpty(source.MainAddrToponymy))
    {
      //Information in the main table overrides any
      // information in the detail table
      Address residential = destination.LegalResidentialAddress
        ?? new Address();

      residential.SetType(AddressType.LegalResidential);

      residential.SetCity(mainCity.Name, mainCity.Guid);
      residential.SetCounty(mainCity.CountyName, mainCity.CountyGuid);
      residential.SetCountry(mainCity.CountryISO, null);

      SetNumberingToponymy(residential, source.MainAddrToponymy);
      residential.SetLocalPostCode(source.MainAddrPostCode);

      ImportDataConverter.FixStringLengths(residential);

      if (destination.LegalResidentialAddress is null)
      {
        destination.AddAddress(residential);
      }
    }

    if (destination.FirstName is null && destination.LastName is null)
    {
      //If the first/last names are not available, but an italian tax id code
      // is, and there is the shorthand string, try to guess
      // which words are the first/last name
      if (!string.IsNullOrEmpty(source.Shorthand) &&
        !string.IsNullOrEmpty(destination.BirthCountryTaxIdCode) &&
        destination.BirthLocation is not null &&
        destination.BirthLocation.CountryISO == CountryISO3.ITA &&
        TryDeduceItalianNames(source.Shorthand, destination.BirthCountryTaxIdCode) is (string first, string last))
      {
        destination.SetNames(first, last);
      }
      else
      {
        //Just try with the shorthand
        destination.SetNames("-", source.Shorthand);
      }
    }
    else
    {
      //Complete either name with a dash if it is null
      destination.SetNames(destination.FirstName ?? "-", destination.LastName ?? "-");
    }

    if (!string.IsNullOrEmpty(source.ParentMgmtSubjectId))
    {
      var owner = await _subjectRepository
        .AsQueryable(new EntityNonDeletedSpec<Subject>())
        .FirstOrDefaultAsync(s => s.InternalCode == source.ParentMgmtSubjectId);

      if (owner is not null)
      {
        destination.SetOwnerManagementSubjects([owner]);
      }
    }

    ImportDataConverter.FixStringLengths(destination);
  }

  private static (string? first, string? last) TryDeduceItalianNames(
    string shorthand,
    string birthCountryTaxIdCode)
  {
    if (birthCountryTaxIdCode.Length < 6
      || !birthCountryTaxIdCode.Take(6).All(char.IsLetter))
    {
      return (null, null);
    }

    string lastCode = birthCountryTaxIdCode[..3],
      firstCode = birthCountryTaxIdCode[3..6];
    var nameParts = shorthand.Split(' ');

    if (nameParts.Length < 2)
    {
      return (null, null);
    }

    string? firstName = null, lastName = null;

    foreach (var word in nameParts)
    {
      if (CheckItalianTaxID.NameSurnameCode(word, true) == firstCode)
      {
        firstName = word;
        continue;
      }

      if (CheckItalianTaxID.NameSurnameCode(word, false) == lastCode)
      {
        lastName = word;
        continue;
      }
    }

    return (firstName, lastName);
  }

  private async Task MapLegalSubject(
    LegalSubject destination,
    SubjectDTO source,
    AnagImportWorkspace workspace)
  {
    destination.SetFullName(source.Name ?? "-");
    destination.SetShorthandDescription(source.Shorthand);

    if (!string.IsNullOrEmpty(source.BaseCountryTaxIdCode))
    {
      destination.SetBaseCountryTaxIdCode(source.BaseCountryTaxIdCode);
    }

    if (!string.IsNullOrEmpty(source.AdditionalTaxIdCode))
    {
      destination.SetAdditionalTaxIdCode(source.AdditionalTaxIdCode);
    }

    if (!string.IsNullOrEmpty(source.MainAddrCityId)
      && workspace.CitiesCache.TryGetValue(source.MainAddrCityId, out var mainCity)
      && !string.IsNullOrEmpty(source.MainAddrToponymy))
    {
      //Information in the main table overrides any
      // information in the detail table
      Address legal = destination.LegalResidentialAddress
        ?? new Address();
      legal.SetType(AddressType.LegalResidential);

      legal.SetCity(mainCity.Name, mainCity.Guid);
      legal.SetCounty(mainCity.CountyName, mainCity.CountyGuid);
      legal.SetCountry(mainCity.CountryISO, null);

      SetNumberingToponymy(legal, source.MainAddrToponymy);
      legal.SetLocalPostCode(source.MainAddrPostCode);

      ImportDataConverter.FixStringLengths(legal);

      if (destination.LegalResidentialAddress is null)
      {
        destination.AddAddress(legal);
      }
    }

    if (!string.IsNullOrEmpty(source.ParentMgmtSubjectId))
    {
      var owner = await _subjectRepository
        .AsQueryable(new EntityNonDeletedSpec<Subject>())
        .FirstOrDefaultAsync(s => s.InternalCode == source.ParentMgmtSubjectId);

      if (owner is not null)
      {
        destination.SetOwnerManagementSubjects([owner]);
      }
    }

    ImportDataConverter.FixStringLengths(destination);
  }

  private async Task MapManagementSubject(
    ManagementSubject destination,
    SubjectDTO source,
    AnagImportWorkspace workspace)
  {
    destination.SetFullName(source.Name ?? "-");
    destination.SetShorthandDescription(source.Shorthand);

    if (!string.IsNullOrEmpty(source.BaseCountryTaxIdCode))
    {
      destination.SetBaseCountryTaxIdCode(source.BaseCountryTaxIdCode);
    }

    if (!string.IsNullOrEmpty(source.AdditionalTaxIdCode))
    {
      destination.SetAdditionalTaxIdCode(source.AdditionalTaxIdCode);
    }
    if (!string.IsNullOrEmpty(source.MainAddrCityId)
          && workspace.CitiesCache.TryGetValue(source.MainAddrCityId, out var mainCity)
          && !string.IsNullOrEmpty(source.MainAddrToponymy))
    {
      //Information in the main table overrides any
      // information in the detail table
      Address legal = destination.LegalResidentialAddress
        ?? new Address();
      legal.SetType(AddressType.LegalResidential);

      legal.SetCity(mainCity.Name, mainCity.Guid);
      legal.SetCounty(mainCity.CountyName, mainCity.CountyGuid);
      legal.SetCountry(mainCity.CountryISO, null);

      SetNumberingToponymy(legal, source.MainAddrToponymy);
      legal.SetLocalPostCode(source.MainAddrPostCode);

      ImportDataConverter.FixStringLengths(legal);

      if (destination.LegalResidentialAddress is null)
      {
        destination.AddAddress(legal);
      }
    }

    if (!string.IsNullOrEmpty(source.ParentMgmtSubjectId))
    {
      var owner = await _subjectRepository
        .AsQueryable(new EntityNonDeletedSpec<Subject>())
        .FirstOrDefaultAsync(s => s.InternalCode == source.ParentMgmtSubjectId);

      if (owner is not null)
      {
        destination.SetOwnerManagementSubjects([destination, owner]);
      }
      else
      {
        destination.SetOwnerManagementSubjects([destination]);
      }
    }
    else
    {
      destination.SetOwnerManagementSubjects([destination]);
    }

    if (source.IsInCompanyGroup)
    {
      if (!string.IsNullOrEmpty(source.ParentMgmtSubjectId))
      {
        var owner = await _subjectRepository
          .AsQueryable(new EntityNonDeletedSpec<Subject>())
          .FirstOrDefaultAsync(s => s.InternalCode == source.ParentMgmtSubjectId);

        if (owner is not null)
        {
          destination.SetCompanyGroupParent(owner, source.IsGroupLeader, null);
        }
        else
        {
          destination.SetCompanyGroupParent(destination, source.IsGroupLeader, null);
        }
      }
      else
      {
        destination.SetCompanyGroupParent(destination, source.IsGroupLeader, null);
      }

      if (source.IsGroupSignaturePresent && !string.IsNullOrEmpty(source.GroupSignature))
      {
        destination.UpdateGroupSignature(source.GroupSignature);
      }
    }

    ImportDataConverter.FixStringLengths(destination);
  }
}
