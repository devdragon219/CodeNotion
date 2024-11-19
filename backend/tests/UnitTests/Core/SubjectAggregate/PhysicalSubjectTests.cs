using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.CrossModule;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.SubjectAggregate;

sealed file class ValidationData : TheoryData<PhysicalSubject, bool>
{
  public static PhysicalSubject ValidSubject1
  {
    get
    {
      var subject = new PhysicalSubject();
      subject.SetNames("FirstName", "LastName");
      subject.SetEntryStatus(EntryStatus.IncompleteDraft, null);

      return subject;
    }
  }
  public static PhysicalSubject ValidSubject2
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.LegalResidential);
      address.SetToponymy("Toponomy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");

      var birthAddress = new Address();
      birthAddress.SetType(AddressType.BirthLocation);
      birthAddress.SetToponymy("Toponomy");
      birthAddress.SetCity("CityName", null);

      var subject = new PhysicalSubject();
      subject.SetNames("FirstName", "LastName");
      subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
      subject.SetInternalCode("InternalCode");
      subject.SetExternalSourceCode(null);
      subject.SetCustomSubjectStatus(null);
      subject.SetCustomGender(0);
      subject.SetLifePeriod(DateOnly.FromDateTime(new DateTime(2004, 01, 01)), null);
      subject.SetBirthLocation(birthAddress);
      subject.SetBirthSex(BirthSex.Male);
      subject.SetBirthCountryTaxIdCode("BirthCountryTaxIdCode");
      subject.SetProfessionalTaxIdCode("ProfessionalTaxIdCode");
      var nba = new BankAccount();
      nba.SetType(BankAccountType.Main);
      nba.SetReference("PL61109010140000071219812874", BankAccountCodeType.IBAN);
      nba.SetHolder("AccountHolder");
      subject.AddBankAccount(nba);
      subject.AddAddress(address);

      return subject;
    }
  }
  public static PhysicalSubject ValidSubject3
  {
    get
    {
      var residentialAddress = new Address();
      residentialAddress.SetType(AddressType.LegalResidential);
      residentialAddress.SetToponymy("Toponomy");
      residentialAddress.SetCity("CityName", null);
      residentialAddress.SetLocalPostCode("LocalPostCode");

      var mailingAddress = new Address();
      mailingAddress.SetType(AddressType.Mailing);
      mailingAddress.SetToponymy("Toponomy");
      mailingAddress.SetCity("CityName", null);
      
      mailingAddress.SetLocalPostCode("LocalPostCode");

      var birthAddress = new Address();
      birthAddress.SetType(AddressType.BirthLocation);
      birthAddress.SetToponymy("Toponomy");
      birthAddress.SetCity("CityName", null);

      var subject = new PhysicalSubject();
      subject.SetNames("FirstName", "LastName");
      subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
      subject.SetInternalCode("InternalCode");
      subject.SetExternalSourceCode("ExternalSourceCode");
      subject.SetCustomSubjectStatus(0);
      subject.SetCustomGender(0);
      subject.SetLifePeriod(DateOnly.FromDateTime(new DateTime(2004, 01, 01)), DateOnly.FromDateTime(new DateTime(2064, 01, 01)));
      subject.SetBirthLocation(birthAddress);
      subject.SetBirthSex(BirthSex.Female);
      subject.SetBirthCountryTaxIdCode("BirthCountryTaxIdCode");
      subject.SetProfessionalTaxIdCode("ProfessionalTaxIdCode");
      var nba = new BankAccount();
      nba.SetType(BankAccountType.Main);
      nba.SetReference("PL61109010140000071219812874", BankAccountCodeType.IBAN);
      nba.SetHolder("AccountHolder");
      subject.AddBankAccount(nba);
      nba = new BankAccount();
      nba.SetType(BankAccountType.Backup);
      nba.SetReference("AL35202111090000000001234567", BankAccountCodeType.IBAN);
      nba.SetHolder("AccountHolder");
      subject.AddBankAccount(nba);
      var nc = new Contact();
      nc.SetContactType(ContactType.Main);
      nc.SetContactInfo(ContactInfoType.EMail, "example@gmail.com");
      subject.AddContact(nc);
      nc = new Contact();
      nc.SetContactType(ContactType.Main);
      nc.SetContactInfo(ContactInfoType.MobilePhone, "+555555555");
      subject.AddContact(nc);
      subject.AddAddress(residentialAddress);
      subject.AddAddress(mailingAddress);

      return subject;
    }
  }
  public static PhysicalSubject InvalidSubject1
  {
    get
    {
      var subject = new PhysicalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);

      return subject;
    }
  }
  public static PhysicalSubject InvalidSubject2
  {
    get
    {
      var subject = new PhysicalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);
      subject.SetLifePeriod(DateOnly.FromDateTime(new DateTime(2004, 01, 01)), DateOnly.FromDateTime(new DateTime(2003, 01, 01)));
      var nba = new BankAccount();
      nba.SetType(BankAccountType.Backup);
      nba.SetReference("PL6110901014000INVALID", BankAccountCodeType.IBAN);
      subject.AddBankAccount(nba);
      var na = new Address();
      na.SetType(AddressType.Mailing);
      subject.AddAddress(na);
      var nc = new Contact();
      nc.SetContactType(ContactType.Backup);

      return subject;
    }
  }
  public static PhysicalSubject InvalidSubject3
  {
    get
    {
      var subject = new PhysicalSubject();
      subject.SetEntryStatus(EntryStatus.IncompleteDraft, null);

      return subject;
    }
  }
  public static PhysicalSubject InvalidSubject4
  {
    get
    {
      var subject = new PhysicalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);

      var officerCategory = new SubjectCategory(nameof(CategoryFunction.Officer), CategoryFunction.Officer);
      subject.SetCategories(new[] { officerCategory });

      var officer = new PhysicalSubject();
      subject.AddOfficer(officer, OfficerType.Guardian, DateOnly.FromDateTime(new DateTime(2022, 01, 01)), null, null);

      return subject;
    }
  }
  public static PhysicalSubject InvalidSubject5
  {
    get
    {
      var subject = new PhysicalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);

      var companyGroupCategory = new SubjectCategory(nameof(CategoryFunction.CompanyGroup), CategoryFunction.CompanyGroup);
      subject.SetCategories(new[] { companyGroupCategory });

      var companyGroup = new ManagementSubject();
      companyGroup.AddSelfManagementRelation();
      subject.SetCompanyGroupParent(companyGroup, true, null);

      return subject;
    }
  }

  public ValidationData()
  {
    Add(ValidSubject1, true);
    Add(ValidSubject2, true);
    Add(ValidSubject3, true);

    Add(InvalidSubject1, false);
    Add(InvalidSubject2, false);
    Add(InvalidSubject3, false);
    Add(InvalidSubject4, false);
    Add(InvalidSubject5, false);
  }
}

public class PhysicalSubjectTests
{
  private readonly ITestOutputHelper _output;

  public PhysicalSubjectTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizePropertiesCorrectly()
  {
    // Arrange
    var firstName = "FirstName";
    var lastName = "LastName";

    // Act
    var subject = new PhysicalSubject();
    subject.SetNames(firstName, lastName);

    // Assert
    Assert.Equal(firstName, subject.FirstName);
    Assert.Equal(lastName, subject.LastName);
    Assert.Equal(PersonType.PhysicalPerson, subject.PersonType);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(PhysicalSubject subject, bool isValid)
  {
    // Act
    var errors = subject.Validate();

    // Assert
    if (isValid)
    {
      Assert.Collection(errors, e => {
        Assert.Equal(ErrorCode.AtLeastOneManagementEntityOwnedRequired.Identifier, e.Identifier);
      });
      
      return;
    }

    Assert.NotEmpty(errors);
    _output.WriteLine(string.Join(Environment.NewLine, errors.Select(error => error.ErrorMessage)));
  }
}
