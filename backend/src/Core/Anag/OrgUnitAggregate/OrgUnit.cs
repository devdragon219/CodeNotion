using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Anag.SubjectAggregate;
using NetTopologySuite.Geometries;
using RealGimm.Core.Common;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using Ardalis.Result;
using HotChocolate;

namespace RealGimm.Core.Anag.OrgUnitAggregate;

public class OrgUnit : EntityBase, IAggregateRoot, ISoftDeletable, IInternallyCoded
{
  public OrgUnitType OrgUnitType { get; private set; }
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }
  [Required, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;
  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }

  [MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public EntryStatus EntryStatus { get; private set; } = EntryStatus.Working;

  public Polygon? InfluenceArea { get; private set; }

  public DateTime CreationDate { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public DateTime? ClosureDate { get; private set; }

  private readonly List<OrgUnit> _children = new();
  public IReadOnlyList<OrgUnit> Children => _children.AsReadOnly();

  private readonly List<Contact> _contacts = new();
  public IReadOnlyList<Contact> Contacts => _contacts.AsReadOnly();

  public int[]? GeographicalCities { get; private set; }

  public int? ParentOrgUnitId { get; private set; }
  public OrgUnit? ParentOrgUnit { get; private set; }

  public int ParentSubjectId { get; private set; }
  public Subject ParentSubject { get; private set; } = default!;

  public void SetType(OrgUnitType type) => OrgUnitType = type;

  public void AddContact(Contact newContact)
  {
    ArgumentNullException.ThrowIfNull(newContact);
    _contacts.Add(newContact);
  }

  public void AddChild(OrgUnit child)
  {
    ArgumentNullException.ThrowIfNull(child);
    _children.Add(child);
  }

  public void AddGeographicalCities(int[] geographicalCities)
  {
    GeographicalCities = (GeographicalCities ?? Array.Empty<int>()).Concat(geographicalCities).Distinct().ToArray();
  }

  public void SetEntryStatus(EntryStatus? newEntryStatus)
  {
    if (newEntryStatus is not null) EntryStatus = newEntryStatus.Value;
  }

  public void SetName(string? newName)
  {
    if (!string.IsNullOrEmpty(newName)) Name = newName;
  }

  public void SetInternalCode(string newCode)
  {
    if (!string.IsNullOrEmpty(newCode)) InternalCode = newCode;
  }

  public void SetExternalCode(string? newExternalCode)
  {
    if (!string.IsNullOrEmpty(newExternalCode)) ExternalCode = newExternalCode;
  }

  public void SetNotes(string? notes) => Notes = notes;
  
  public void SetParentOrgUnitId(int parentOrgUnitId) => ParentOrgUnitId = parentOrgUnitId;
  
  public void SetParentOrgUnit(OrgUnit parentOrgUnit) => ParentOrgUnit = parentOrgUnit;

  public void SetParentSubject(Subject parentSubject) => ParentSubject = parentSubject;

  public void SetGeographicalCities(int[] geographicalCities)
  {
    if (geographicalCities.Any()) GeographicalCities = geographicalCities;
  }

  public void RemoveParent()
  {
    ParentOrgUnit = null;
    ParentOrgUnitId = null;
  }

  public void RemoveContact(Contact contactToRemove)
  {
    ArgumentNullException.ThrowIfNull(contactToRemove);
    _contacts.Remove(contactToRemove);
  }

  public void RemoveGeographicalCities()
  {
    GeographicalCities = Array.Empty<int>();
  }

  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

  public void SetClosureDate(DateTime? date)
  {
    ClosureDate = date;
  }

  [GraphQLIgnore]
  public virtual IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(Name))
    {
      yield return ErrorCode.NameIsNullOrEmptyString.ToValidationError();
    }

    if (EntryStatus is EntryStatus.FrozenClosed && ClosureDate is not null && ClosureDate > DateTime.Today.AddDays(1))
    {
      yield return ErrorCode.ClosureDateIsInTheFuture.ToValidationError();
    }
  }
}
