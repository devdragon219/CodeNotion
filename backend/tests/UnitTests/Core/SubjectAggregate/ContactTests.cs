using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.CrossModule;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.SubjectAggregate;

sealed file class ValidationData : TheoryData<Contact, bool>
{
  public ValidationData()
  {
    Add(Make(ContactType.Main, "", ContactInfoType.EMail), true);
    Add(Make(ContactType.Main, "      ", ContactInfoType.MobilePhone), true);
    Add(Make(ContactType.Main, "ContactInfo", ContactInfoType.Unknown), true);
    Add(Make(ContactType.Main, "example@gmail.com", ContactInfoType.EMail), true);
    Add(Make(ContactType.Backup, "+555555555", ContactInfoType.MobilePhone), true);

    Add(Make(ContactType.Main, "InvalidInfo", ContactInfoType.LandlinePhone), false);
    Add(Make(ContactType.Main, "InvalidInfo", ContactInfoType.RegisteredEmail), false);
  }

  private static Contact Make(ContactType t, string c, ContactInfoType ci) {
    var contact = new Contact();
    contact.SetContactType(t);
    contact.SetContactInfo(ci, c);
    return contact;
  }
}

public class ContactTests
{
  private readonly ITestOutputHelper _output;

  public ContactTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizeProperiesCorrectly()
  {
    // Arrange
    var contactType = ContactType.Main;
    var contactInfo = "FirstName";
    var contactInfoType = ContactInfoType.EMail;

    // Act
    var contact = new Contact();
    contact.SetContactType(contactType);
    contact.SetContactInfo(contactInfoType, contactInfo);

    // Assert
    Assert.Equal(contactType, contact.ContactType);
    Assert.Equal(contactInfo, contact.ContactInfo);
    Assert.Equal(contactInfoType, contact.ContactInfoType);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(Contact contact, bool isValid)
  {
    // Act
    var errors = contact.Validate();

    // Assert
    if (isValid)
    {
      Assert.Empty(errors);
      return;
    }

    Assert.NotEmpty(errors);
    _output.WriteLine(string.Join(Environment.NewLine, errors.Select(error => error.ErrorMessage)));
  }
}
