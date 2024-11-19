using RealGimm.Core.Common;
using Ardalis.Result;
using System.ComponentModel.DataAnnotations;
using HotChocolate;
using System.ComponentModel.DataAnnotations.Schema;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Anag.SubjectAggregate;

public class PhysicalSubject : Subject
{
  public override string Name
  {
    get => $"{LastName} {FirstName}";
    protected set { } // generated column
  }

  public override PersonType PersonType => PersonType.PhysicalPerson;
  public int? CustomGender { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? FirstName { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? LastName { get; private set; }

  public BirthSex? BirthSex { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? BirthCountryTaxIdCode { get; private set; }

  [MaxLength(StrFieldSizes.TAX_ID_CODE)]
  public string? ProfessionalTaxIdCode { get; private set; }

  public DateOnly? BirthDate { get; private set; }
  public DateOnly? DeathDate { get; private set; }

  [NotMapped, GraphQLFilterIgnore]
  public Address? BirthLocation => base.Addresses
    .FirstOrDefault(a => a.AddressType == AddressType.BirthLocation);

  [NotMapped]
  public override IReadOnlyList<Address> Addresses => base.Addresses
    .Where(a => a.AddressType != AddressType.BirthLocation)
    .ToList()
    .AsReadOnly();

  public void SetCustomGender(int? customGender) => CustomGender = customGender;

  public void SetNames(string? firstName, string? lastName)
  {
    FirstName = firstName;
    LastName = lastName;
  }

  public void SetBirthCountryTaxIdCode(string? birthCountryTaxIdCode) => BirthCountryTaxIdCode = birthCountryTaxIdCode;

  public void SetBirthSex(BirthSex? birthSex) => BirthSex = birthSex;

  public void SetBirthDate(DateOnly birthDate) => BirthDate = birthDate;

  public void SetBirthLocation(Address birthLocation)
  {
    ArgumentNullException.ThrowIfNull(birthLocation);

    if (birthLocation.AddressType != AddressType.BirthLocation)
    {
      throw new ArgumentOutOfRangeException(nameof(birthLocation));
    }

    if (BirthLocation is not null) RemoveAddress(BirthLocation);

    AddAddress(birthLocation);
  }

  public void SetProfessionalTaxIdCode(string? professionalTaxIdCode) => ProfessionalTaxIdCode = professionalTaxIdCode;

  public void SetLifePeriod(DateOnly? birthDate, DateOnly? deathDate)
  {
    BirthDate = birthDate;
    DeathDate = deathDate;
  }

  public void RemoveHeirById(int id)
  {
    _relationMains.RemoveAll(sr => sr.RelationType == SubjectRelationType.Heir && sr.SubordinateId == id);
  }

  public void AddHeir(PhysicalSubject heir, DateOnly? since, string? notes)
  {
    ArgumentNullException.ThrowIfNull(heir);

    var sr = new SubjectRelation();
    sr.SetMain(this);
    sr.SetSubordinate(heir);
    sr.SetRelationType(SubjectRelationType.Heir);
    sr.SetTimeRange(since, null);
    sr.SetNotes(notes);
    _relationMains.Add(sr);
  }

  [GraphQLIgnore]
  public override IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(LastName))
    {
      yield return ErrorCode.LastNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(FirstName))
    {
      yield return ErrorCode.FirstNameIsNullOrEmptyString.ToValidationError();
    }

    if (RelationSubordinates.All(x => x.RelationType != SubjectRelationType.ManagementEntityOwned))
    {
      yield return ErrorCode.AtLeastOneManagementEntityOwnedRequired.ToValidationError();
    }

    if (EntryStatus is EntryStatus.IncompleteDraft)
    {
      yield break;
    }

    foreach (var validation in base.Validate())
    {
      yield return validation;
    }

    if (BirthSex is null)
    {
      yield return ErrorCode.BirthSexIsNullOrEmpty.ToValidationError();
    }

    if (BirthDate is null)
    {
      yield return ErrorCode.BirthDateIsNullOrEmpty.ToValidationError();
    }

    if (BirthDate is not null && DeathDate is not null && BirthDate > DeathDate)
    {
      yield return ErrorCode.BirthDateGreaterThanDeathDate.ToValidationError();
    }

    if (BirthLocation is null)
    {
      yield return ErrorCode.BirthLocationIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(BirthCountryTaxIdCode))
    {
      yield return ErrorCode.BirthCountryTaxIdCodeIsNullOrEmptyString.ToValidationError();
    }
  }
}
