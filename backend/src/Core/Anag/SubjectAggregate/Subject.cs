using Ardalis.Result;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Common;
using RealGimm.SharedKernel.Interfaces;
using HotChocolate.Types;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using System.ComponentModel.DataAnnotations.Schema;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Anag.SubjectAggregate;

[UnionType("Subject")]
public abstract class Subject : EntityBase, IAggregateRoot, ISubject, IIdentifiable, IInternallyCoded, ISoftDeletable
{
  [FuzzySearchable]
  public abstract string Name { get; protected set; }

  public virtual PersonType PersonType { get; }

  [Required, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalSourceCode { get; private set; }

  public int? CustomPersonType { get; private set; }
  public int? CustomSubjectStatus { get; private set; }
  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;
  public DateTime? ClosureDate { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public EntryStatus EntryStatus { get; private set; }

  private readonly List<Address> _addresses = new();
  private readonly List<Contact> _contacts = new();
  private readonly List<OrgUnit> _orgUnits = new();
  private readonly List<BankAccount> _bankAccounts = new();
  private readonly List<SubjectCategory> _categories = new();
  protected readonly List<SubjectRelation> _relationMains = new();
  protected readonly List<SubjectRelation> _relationSubordinates = new();
  private readonly List<TaxStatus> _taxStatuses = new();

  public virtual IReadOnlyList<Address> Addresses => _addresses.AsReadOnly();
  public IReadOnlyList<Contact> Contacts => _contacts.AsReadOnly();
  public IReadOnlyList<OrgUnit> OrgUnits => _orgUnits.AsReadOnly();
  public IReadOnlyList<BankAccount> BankAccounts => _bankAccounts.AsReadOnly();
  public IReadOnlyList<SubjectCategory> Categories => _categories.AsReadOnly();
  public IReadOnlyList<SubjectRelation> RelationMains => _relationMains.AsReadOnly();
  public IReadOnlyList<SubjectRelation> RelationSubordinates => _relationSubordinates.AsReadOnly();
  public IReadOnlyList<TaxStatus> TaxStatuses => _taxStatuses.AsReadOnly();

  [GraphQLIgnore]
  public Address? LegalResidentialAddress => Addresses
    .FirstOrDefault(address => address.AddressType == AddressType.LegalResidential);

  [NotMapped]
  public IReadOnlyList<SubjectRelation> Officers => _relationMains
    .Where(sr => sr.RelationType == SubjectRelationType.Officer)
    .ToList().AsReadOnly();

  [NotMapped]
  public IReadOnlyList<SubjectRelation> OwningMgmtSubjects => _relationSubordinates
    .Where(sr => sr.RelationType == SubjectRelationType.ManagementEntityOwned)
    .ToList().AsReadOnly();

  [NotMapped]
  public IReadOnlyList<SubjectRelation> SubOrganizations => _relationMains
    .Where(sr => sr.RelationType == SubjectRelationType.SubOrganization)
    .ToList().AsReadOnly();

  [NotMapped]
  public SubjectRelation? CompanyGroupParent => _relationSubordinates
    //This is only valid if this subject is a legal person or a management subject
    .Where(sr => (sr.Subordinate.PersonType == PersonType.LegalPerson
                  || sr.Subordinate.PersonType == PersonType.ManagementSubject)
                 && sr.RelationType == SubjectRelationType.CompanyGroup)
    .FirstOrDefault();

  [NotMapped]
  public IReadOnlyList<SubjectRelation> Heirs => RelationMains
    .Where(r => r.RelationType == SubjectRelationType.Heir)
    .ToList()
    .AsReadOnly();

  public void SetEntryStatus(EntryStatus entryStatus, DateTime? closureDate)
  {
    ClosureDate = closureDate;
    EntryStatus = entryStatus;
  }

  public void SetCreationDate(DateTime newCreationDate) => CreationDate = newCreationDate;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetExternalSourceCode(string? externalSourceCode) => ExternalSourceCode = externalSourceCode;

  public void SetCustomPersonType(int? customPersonType) => CustomPersonType = customPersonType;

  public void SetCustomSubjectStatus(int? customSubjectStatus) => CustomSubjectStatus = customSubjectStatus;

  public void AddAddress(Address newAddress)
  {
    ArgumentNullException.ThrowIfNull(newAddress);

    _addresses.Add(newAddress);
  }

  public void RemoveAddress(Address address)
  {
    ArgumentNullException.ThrowIfNull(address);

    _addresses.Remove(address);
  }

  public void RemoveBankAccount(BankAccount ba)
  {
    ArgumentNullException.ThrowIfNull(ba);

    _bankAccounts.Remove(ba);
  }

  public void AddContact(Contact newContact)
  {
    ArgumentNullException.ThrowIfNull(newContact);

    _contacts.Add(newContact);
  }

  public Contact? GetContact(ContactInfoType infoType)
  {
    return Contacts
      .Where(c => c.ContactInfoType == infoType)
      .OrderBy(c => (int)c.ContactType)
      .FirstOrDefault();
  }

  public void AddOrgUnit(OrgUnit newOrgUnit)
  {
    ArgumentNullException.ThrowIfNull(newOrgUnit);
    _orgUnits.Add(newOrgUnit);
  }

  public void RemoveOrgUnit(OrgUnit orgUnitToRemove)
  {
    ArgumentNullException.ThrowIfNull(orgUnitToRemove);
    _orgUnits.Remove(orgUnitToRemove);
  }

  public void RemoveContact(Contact c)
  {
    ArgumentNullException.ThrowIfNull(c);
    _contacts.Remove(c);
  }

  public void AddBankAccount(BankAccount newBankAccount)
  {
    ArgumentNullException.ThrowIfNull(newBankAccount);

    _bankAccounts.Add(newBankAccount);
  }

  public void AddTaxStatus(TaxStatus newTaxStatus)
  {
    ArgumentNullException.ThrowIfNull(newTaxStatus);

    _taxStatuses.Add(newTaxStatus);
  }

  public void RemoveTaxStatus(TaxStatus oldTaxStatus)
  {
    ArgumentNullException.ThrowIfNull(oldTaxStatus);

    _taxStatuses.Remove(oldTaxStatus);
  }

  public void AddSubOrganization(Subject s)
  {
    ArgumentNullException.ThrowIfNull(s);

    var sr = new SubjectRelation();
    sr.SetMain(this);
    sr.SetSubordinate(s);
    sr.SetRelationType(SubjectRelationType.SubOrganization);
    _relationMains.Add(sr);
  }

  public void RemoveOfficerById(int id)
  {
    _relationMains.RemoveAll(sr => sr.RelationType == SubjectRelationType.Officer && sr.SubordinateId == id);
  }

  public void AddOfficer(Subject s, OfficerType officerType, DateOnly? since, DateOnly? until, string? notes)
  {
    ArgumentNullException.ThrowIfNull(s);

    var sr = new SubjectRelation();
    sr.SetMain(this);
    sr.SetSubordinate(s);
    sr.SetRelationType(SubjectRelationType.Officer);
    sr.SetOfficerRelationType(officerType);
    sr.SetTimeRange(since, until);
    sr.SetNotes(notes);
    _relationMains.Add(sr);
  }

  public void SetCompanyGroupParent(Subject s, bool isGroupLeader, string? notes)
  {
    ArgumentNullException.ThrowIfNull(s);

    var sr = _relationSubordinates
      .FirstOrDefault(s => s.RelationType == SubjectRelationType.CompanyGroup);
      
    if (sr is null)
    {
      sr = new SubjectRelation();
      sr.SetMain(s);
      sr.SetSubordinate(this);
      sr.SetRelationType(SubjectRelationType.CompanyGroup);
      sr.SetGroupRelationType(isGroupLeader ? CompanyGroup.Leader : CompanyGroup.Member);
      sr.SetNotes(notes);
      _relationSubordinates.Add(sr);
    }
    else
    {
      sr.SetMain(s);
      sr.SetGroupRelationType(isGroupLeader ? CompanyGroup.Leader : CompanyGroup.Member);
      sr.SetNotes(notes);
    }
  }

  public void SetCategories(IEnumerable<SubjectCategory> categories)
  {
    _categories.Clear();
    _categories.AddRange(categories);
  }

  public void RemoveCategory(SubjectCategory category)
  {
    ArgumentNullException.ThrowIfNull(category);

    _categories.Remove(category);
  }

  public void AddOwnerManagementSubject(Subject owner)
  {
    ArgumentNullException.ThrowIfNull(owner);

    if (owner is not ManagementSubject)
    {
      throw new ArgumentOutOfRangeException(nameof(owner));
    }

    var relation = new SubjectRelation();
    relation.SetMain(owner);
    relation.SetSubordinate(this);
    relation.SetRelationType(SubjectRelationType.ManagementEntityOwned);

    _relationSubordinates.Add(relation);
  }

  public void SetOwnerManagementSubjects(IEnumerable<Subject> ownerList)
  {
    ArgumentNullException.ThrowIfNull(ownerList);

    ownerList = ownerList
      .Where(s => s.PersonType == PersonType.ManagementSubject)
      .ToList();

    var ownerIdList = ownerList.Select(s => s.Id).ToArray();

    var actualIdList = OwningMgmtSubjects.Select(s => s.MainId).ToArray();

    foreach (var toRemove in _relationSubordinates
               .Where(rs => rs.RelationType == SubjectRelationType.ManagementEntityOwned
                            && !ownerIdList.Contains(rs.MainId))
               .ToList())
    {
      _relationSubordinates.Remove(toRemove);
    }

    foreach (var toAdd in ownerList.Where(s => !actualIdList.Contains(s.Id)))
    {
      var sr = new SubjectRelation();
      sr.SetMain(toAdd);
      sr.SetSubordinate(this);
      sr.SetRelationType(SubjectRelationType.ManagementEntityOwned);
      _relationSubordinates.Add(sr);
    }
  }

  [GraphQLIgnore]
  public virtual IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.InternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (EntryStatus is EntryStatus.IncompleteDraft)
    {
      yield break;
    }

    foreach (var address in Addresses)
    {
      foreach (var validation in address.Validate())
      {
        yield return validation;
      }
    }

    if (EntryStatus is EntryStatus.FrozenClosed && ClosureDate is not null && ClosureDate > DateTime.Today.AddDays(1))
    {
      yield return ErrorCode.ClosureDateIsInTheFuture.ToValidationError();
    }

    if (!Addresses.Any(address => address.AddressType is AddressType.LegalResidential))
    {
      yield return ErrorCode.LegalResidentialAddressIsNotProvided.ToValidationError();
    }

    foreach (var contact in Contacts)
    {
      foreach (var validation in contact.Validate())
      {
        yield return validation;
      }
    }

    foreach (var account in BankAccounts)
    {
      foreach (var validation in account.Validate())
      {
        yield return validation;
      }
    }

    if (BankAccounts.Any() && !BankAccounts.Any(account => account.BankAccountType is BankAccountType.Main))
    {
      yield return ErrorCode.MainBankAccountIsNotProvided.ToValidationError();
    }

    foreach (var taxStatus in TaxStatuses)
    {
      foreach (var validation in taxStatus.Validate())
      {
        yield return validation;
      }
    }

    foreach (var txsGroup in TaxStatuses.GroupBy(t => t.TaxStatusType))
    {
      if (txsGroup.ContainsOverlaps())
      {
        yield return ErrorCode.TaxStatusDoOverlap.ToValidationError();
      }
    }

    foreach (var officer in RelationSubordinates.Where(s => s.RelationType == SubjectRelationType.Officer))
    {
      if (!officer.Since.HasValue)
      {
        yield return ErrorCode.OfficerMustHaveStartDate.ToValidationError();
      }
    }

    if (Categories.Any(category => category.Function == CategoryFunction.Officer) &&
        RelationSubordinates.Any(subject => subject.RelationType == SubjectRelationType.Officer))
    {
      yield return ErrorCode.OfficerCanNotHaveOfficers.ToValidationError();
    }

    if (Categories.Any(category => category.Function == CategoryFunction.Heir) &&
        PersonType != PersonType.PhysicalPerson)
    {
      yield return ErrorCode.OnlyPhysicalSubjectCanBeHeir.ToValidationError();
    }
  }

  public void MarkAsDeleted()
  {
    //If this subject has org units, remove them all
    _orgUnits.Clear();

    DeletionDate = DateTime.UtcNow;
  }
}
