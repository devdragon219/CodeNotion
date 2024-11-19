using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using HotChocolate.Types;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.IAM.UserAggregate;

[ObjectType(nameof(IAM) + nameof(Contact))]
public class Contact : EntityBase, IContact
{
  public ContactType ContactType { get; private set; }
  [MaxLength(StrFieldSizes.CONTACT_INFO)]
  public string? ContactInfo { get; private set; }
  public ContactInfoType ContactInfoType { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateTime CreationDate { get; private set; }
  public DateTime? DeletionDate { get; private set; }

  public Contact(ContactType contactType, string? contactInfo, ContactInfoType contactInfoType)
  {
    ContactType = contactType;
    ContactInfo = contactInfo;
    ContactInfoType = contactInfoType;
    CreationDate = DateTime.UtcNow;
  }

  public void SetNotes(string? notes) => Notes = notes;

  public void SetContactInfo(string? info)
  {
    ContactInfo = info;
  }
  
  public void SetContactInfoType(ContactInfoType newContactInfoType)
  {
    ContactInfoType = newContactInfoType;
  }

  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

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
