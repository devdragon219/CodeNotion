using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.CrossModule;
using Xunit;
using Xunit.Abstractions;

namespace RealGimm.UnitTests.Core.SubjectAggregate;

sealed file class ValidationData : TheoryData<ManagementSubject, bool>
{
  public static ManagementSubject ValidSubject1
  {
    get
    {
      var subject = new ManagementSubject();
      subject.SetFullName("SubjectName");
      subject.SetEntryStatus(EntryStatus.IncompleteDraft, null);
      subject.SetInternalCode("InternalCode");
      subject.AddSelfManagementRelation();

      return subject;
    }
  }
  public static ManagementSubject ValidSubject2
  {
    get
    {
      var address = new Address();
      address.SetType(AddressType.LegalResidential);
      address.SetToponymy("Toponomy");
      address.SetCity("CityName", null);
      address.SetLocalPostCode("LocalPostCode");

      var subject = new ManagementSubject();
      subject.SetFullName("Name");
      subject.SetBaseCountryTaxIdCode("BaseCountryTaxIdCode");
      subject.AddSelfManagementRelation();
      subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
      subject.SetInternalCode("InternalCode");
      subject.SetExternalSourceCode(null);
      subject.SetCustomSubjectStatus(null);
      subject.SetBaseCountryTaxIdCode("BaseCountryTaxIdCode");
      subject.SetAdditionalTaxIdCode("AdditionalTaxIdCode");
      subject.SetBaseCountryISO("BaseCountryISO");
      subject.SetLocation("Location");
      var nba = new BankAccount();
      nba.SetType(BankAccountType.Main);
      nba.SetReference("PL61109010140000071219812874", BankAccountCodeType.IBAN);
      nba.SetHolder("AccountHolder");
      subject.AddBankAccount(nba);
      subject.AddAddress(address);

      return subject;
    }
  }
  public static ManagementSubject ValidSubject3
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

      var subject = new ManagementSubject();
      subject.SetFullName("Name");
      subject.SetBaseCountryTaxIdCode("BaseCountryTaxIdCode");
      subject.AddSelfManagementRelation();
      subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
      subject.SetInternalCode("InternalCode");
      subject.SetExternalSourceCode("ExternalSourceCode");
      subject.SetCustomSubjectStatus(0);
      subject.SetBaseCountryTaxIdCode("BaseCountryTaxIdCode");
      subject.SetAdditionalTaxIdCode("AdditionalTaxIdCode");
      subject.SetBaseCountryISO("BaseCountryISO");
      subject.SetLocation("Location");
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
  public static ManagementSubject InvalidSubject1
  {
    get
    {
      var subject = new ManagementSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);
      subject.AddSelfManagementRelation();

      return subject;
    }
  }
  public static ManagementSubject InvalidSubject2
  {
    get
    {
      var subject = new ManagementSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);
      subject.SetAdditionalTaxIdCode(null);
      var nba = new BankAccount();
      nba.SetType(BankAccountType.Backup);
      nba.SetReference("PL6110901014000INVALID", BankAccountCodeType.IBAN);
      subject.AddBankAccount(nba);
      var na = new Address();
      na.SetType(AddressType.Mailing);
      subject.AddAddress(na);
      var nc = new Contact();
      nc.SetContactType(ContactType.Backup);
      subject.AddContact(nc);

      return subject;
    }
  }
  public static ManagementSubject InvalidSubject3
  {
    get
    {
      var subject = new ManagementSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);
      subject.AddSelfManagementRelation();

      var officerCategory = new SubjectCategory(nameof(CategoryFunction.Officer), CategoryFunction.Officer);
      subject.SetCategories(new[] { officerCategory });

      var officer = new PhysicalSubject();
      subject.AddOfficer(officer, OfficerType.Guardian, DateOnly.FromDateTime(new DateTime(2022, 01, 01)), null, null);

      return subject;
    }
  }
  public static ManagementSubject InvalidSubject4
  {
    get
    {
      var subject = new ManagementSubject();
      subject.SetEntryStatus(EntryStatus.Working, null);
      subject.AddSelfManagementRelation();

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
  }
}

public class ManagementSubjectTests
{
  private readonly ITestOutputHelper _output;

  public ManagementSubjectTests(ITestOutputHelper output)
  {
    _output = output;
  }

  [Fact]
  public void Should_InitilizeProperiesCorrectly()
  {
    // Arrange
    var name = "Name";
    var mgmtCode = "MgmtCode";
    var baseCountryTaxIdCode = "BaseCountryTaxIdCode";

    // Act
    var subject = new ManagementSubject();
    subject.SetFullName(name);
    subject.SetManagementCode(mgmtCode);
    subject.SetBaseCountryTaxIdCode(baseCountryTaxIdCode);

    // Assert
    Assert.Equal(name, subject.Name);
    Assert.Equal(mgmtCode, subject.ManagementCode);
    Assert.Equal(baseCountryTaxIdCode, subject.BaseCountryTaxIdCode);
    Assert.Equal(PersonType.ManagementSubject, subject.PersonType);
  }

  [Theory]
  [ClassData(typeof(ValidationData))]
  public void Should_ValidateCorrectly(ManagementSubject subject, bool isValid)
  {
    // Act
    var errors = subject.Validate();

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
