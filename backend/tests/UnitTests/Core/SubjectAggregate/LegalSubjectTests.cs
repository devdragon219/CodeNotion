using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.CrossModule;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.SubjectAggregate;

sealed file class ValidationData : TheoryData<LegalSubject, bool>
{
  public static LegalSubject ValidSubject1
  {
    get
    {
      var subject = new LegalSubject();
      subject.SetFullName("Subject Name");
      subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);
      subject.SetInternalCode("InternalCode");
      subject.SetEntryStatus(EntryStatus.IncompleteDraft, null);

      return subject;
    }
  }
  public static LegalSubject ValidSubject2
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.LegalResidential);
      address.SetToponymy("Toponomy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");

      var subject = new LegalSubject();
      subject.SetFullName("Name");
      subject.SetBaseCountryTaxIdCode("BaseCountryTaxIdCode");
      subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);
      subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
      subject.SetInternalCode("InternalCode");
      subject.SetExternalSourceCode(null);
      subject.SetCustomSubjectStatus(null);
      subject.SetAdditionalTaxIdCode(null);
      subject.SetBaseCountryISO("BaseCountryISO");
      subject.SetLocation("Location");
      subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);
      var nba = new BankAccount();
      nba.SetType(BankAccountType.Main);
      nba.SetReference("PL61109010140000071219812874", BankAccountCodeType.IBAN);
      nba.SetHolder("AccountHolder");
      subject.AddBankAccount(nba);
      subject.AddAddress(address);

      return subject;
    }
  }
  public static LegalSubject ValidSubject3
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

      var subject = new LegalSubject();
      subject.SetFullName("Name");
      subject.SetBaseCountryTaxIdCode("BaseCountryTaxIdCode");
      subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);
      subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
      subject.SetInternalCode("InternalCode");
      subject.SetExternalSourceCode("ExternalSourceCode");
      subject.SetCustomSubjectStatus(0);
      subject.SetBaseCountryTaxIdCode("BaseCountryTaxIdCode");
      subject.SetAdditionalTaxIdCode("AdditionalTaxIdCode");
      subject.SetBaseCountryISO("BaseCountryISO");
      subject.SetLocation("Location");
      subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);
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
  public static LegalSubject ValidSubject4
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.LegalResidential);
      address.SetToponymy("Toponomy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");

      var subject = new LegalSubject();
      subject.SetFullName("Name");
      subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);
      subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
      subject.SetInternalCode("InternalCode");
      var nba = new BankAccount();
      nba.SetType(BankAccountType.Main);
      nba.SetReference("PL61109010140000071219812874", BankAccountCodeType.IBAN);
      nba.SetHolder("AccountHolder");
      subject.AddBankAccount(nba);
      subject.AddAddress(address);

      return subject;
    }
  }
  public static LegalSubject InvalidSubject1
  {
    get
    {
      var subject = new LegalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);

      return subject;
    }
  }
  public static LegalSubject InvalidSubject2
  {
    get
    {
      var subject = new LegalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);
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
  public static LegalSubject InvalidSubject3
  {
    get
    {
      var subject = new LegalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);

      var officerCategory = new SubjectCategory(nameof(CategoryFunction.Officer), CategoryFunction.Officer);
      subject.SetCategories(new[] { officerCategory });

      var officer = new PhysicalSubject();
      subject.AddOfficer(officer, OfficerType.Guardian, DateOnly.FromDateTime(new DateTime(2022, 01, 01)), null, null);

      return subject;
    }
  }
  public static LegalSubject InvalidSubject4
  {
    get
    {
      var subject = new LegalSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);

      var companyGroupCategory = new SubjectCategory(nameof(CategoryFunction.CompanyGroup), CategoryFunction.CompanyGroup);
      subject.SetCategories(new[] { companyGroupCategory });

      var companyGroup = new ManagementSubject();
      subject.SetCompanyGroupParent(companyGroup, true, null);

      return subject;
    }
  }

  public ValidationData()
  {
    Add(ValidSubject1, true);
    Add(ValidSubject2, true);
    Add(ValidSubject3, true);
    Add(ValidSubject4, true);

    Add(InvalidSubject1, false);
    Add(InvalidSubject2, false);
    Add(InvalidSubject3, false);
    Add(InvalidSubject4, false);
  }
}

public class LegalSubjectTests
{
  private readonly ITestOutputHelper _output;

  public LegalSubjectTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizeProperiesCorrectly()
  {
    // Arrange
    var name = "Name";
    var baseCountryTaxIdCode = "BaseCountryTaxIdCode";

    // Act
    var subject = new LegalSubject();
    subject.SetFullName(name);
    subject.SetBaseCountryTaxIdCode(baseCountryTaxIdCode);
    subject.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    // Assert
    Assert.Equal(name, subject.Name);
    Assert.Equal(baseCountryTaxIdCode, subject.BaseCountryTaxIdCode);
    Assert.Equal(PersonType.LegalPerson, subject.PersonType);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(LegalSubject subject, bool isValid)
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
