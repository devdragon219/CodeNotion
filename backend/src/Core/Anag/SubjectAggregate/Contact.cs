using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.Core.Anag.OrgUnitAggregate;

namespace RealGimm.Core.Anag.SubjectAggregate;

public class Contact : EntityBase, IContact
{
  [GraphQLIgnore]
  public int? SubjectId { get; private set; }
  [GraphQLIgnore]
  public Subject? Subject { get; private set; }
  [GraphQLIgnore]
  public int? OrgUnitId { get; private set; }
  [GraphQLIgnore]
  public OrgUnit? OrgUnit { get; private set; }

  public ContactType ContactType { get; private set; }
  [MaxLength(StrFieldSizes.CONTACT_INFO)]
  public string? ContactInfo { get; private set; }
  public ContactInfoType ContactInfoType { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;
  public void SetCreationDate(DateTime newCreationDate) => CreationDate = newCreationDate;
  public void SetNotes(string? notes) => Notes = notes;

  public void SetContactInfo(ContactInfoType newContactInfoType, string? info)
  {
    ContactInfo = info;
    ContactInfoType = newContactInfoType;
  }

  public void SetContactType(ContactType newContactType)
  {
    ContactType = newContactType;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(ContactInfo))
    {
      yield break;
    }

    if (ContactInfoType is ContactInfoType.EMail or ContactInfoType.RegisteredEmail && !ContactValidator.CheckEmail(ContactInfo!))
    {
      yield return ErrorCode.ContactInfoIsNotValidEMail.ToValidationError();
    }

    if ((ContactInfoType is ContactInfoType.MobilePhone or ContactInfoType.LandlinePhone) && !ContactValidator.CheckPhone(ContactInfo!))
    {
      yield return ErrorCode.ContactInfoIsNotValidPhone.ToValidationError();
    }
  }
}
