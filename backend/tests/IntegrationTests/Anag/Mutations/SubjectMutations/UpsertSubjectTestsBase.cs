using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using RealGimm.Core;
using RealGimm.Core.Anag.Services;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.EventSystem;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.IAM.Data;
using Rebus.TestHelpers;
using Xunit;

namespace RealGimm.IntegrationTests.Anag.Mutations.SubjectMutations;

public abstract class UpsertSubjectTestsBase<TSubject>
  where TSubject : Subject
{
  [Fact]
  protected async Task Should_CreateSubjectAndNavigationProperties()
  {
    // Arrange
    var fakebus = new FakeBus();
    var user = new UserDataProvider();
    await using var context = CreateDbContext();
    await using var contextIAM = CreateDbContextIAM();
    var subjectRepository = new AnagEfRepository<Subject>(context);
    var userRepository = new IAMEfRepository<User>(contextIAM);
    await using var contextCities = CreateDbContextCities();
    var citiesRepository = new CommonEfRepository<City>(contextCities);
    var checkTakIdCode = new CheckItalianTaxID();
    var subjectToCreate = CreateSubject1();

    var upsertService = new SubjectUpsertService(subjectRepository,
      citiesRepository,
      userRepository,
      checkTakIdCode,
      fakebus,
      user);

    // Act
    var result = await upsertService.Upsert(subjectToCreate);

    context.ChangeTracker.Clear();

    // Assert
    Assert.True(result.IsSuccess);

    var createdSubject = await IncludeAll(context.Set<TSubject>().AsNoTracking())
      .SingleAsync(subject => subject.Id == result.Value.Id);

    AssertEqual(subjectToCreate, createdSubject);
  }

  [Fact]
  protected async Task Should_CreateSubjectAndNavigationPropertiesWithBirthTaxIdCode()
  {
    // Arrange
    await using var context = CreateDbContext();
    await using var contextIAM = CreateDbContextIAM();
    var fakebus = new FakeBus();
    var user = new UserDataProvider();
    var subjectRepository = new AnagEfRepository<Subject>(context);
    var userRepository = new IAMEfRepository<User>(contextIAM);
    await using var contextCities = CreateDbContextCities();
    var citiesRepository = new CommonEfRepository<City>(contextCities);
    var checkTakIdCode = new CheckItalianTaxID();

    var city = CreateCity();
    await citiesRepository.AddAsync(city);
    await citiesRepository.SaveChangesAsync();

    var subjectToCreate = CreateSubject3(city: city);

    var upsertService = new SubjectUpsertService(subjectRepository,
      citiesRepository,
      userRepository,
      checkTakIdCode,
      fakebus,
      user);

    // Act
    var result = await upsertService.Upsert(subjectToCreate);
    context.ChangeTracker.Clear();

    // Assert
    Assert.True(result.IsSuccess);

    var createdSubject = await IncludeAll(context.Set<TSubject>().AsNoTracking())
      .SingleAsync(subject => subject.Id == result.Value.Id);

    AssertEqual(subjectToCreate, createdSubject);
  }

  [Fact]
  public async Task Should_UpdateSubjectAndUpsertNavigationProperties()
  {
    // Arrange
    await using var context = CreateDbContext();
    await using var contextIAM = CreateDbContextIAM();
    var fakebus = new FakeBus();
    var user = new UserDataProvider();
    var subjectRepository = new AnagEfRepository<Subject>(context);
    var userRepository = new IAMEfRepository<User>(contextIAM);
    await using var contextCities = CreateDbContextCities();
    var citiesRepository = new CommonEfRepository<City>(contextCities);
    var checkTakIdCode = new CheckItalianTaxID();
    var subjectToUpdate = CreateSubject1(id: 1);

    var existedSubject = CreateSubject2(id: 1);
    context.Add(existedSubject);
    await context.SaveChangesAsync();
    context.ChangeTracker.Clear();

    var upsertService = new SubjectUpsertService(subjectRepository,
      citiesRepository,
      userRepository,
      checkTakIdCode,
      fakebus,
      user);

    // Act
    var result = await upsertService.Upsert(subjectToUpdate);
    context.ChangeTracker.Clear();

    // Assert
    Assert.True(result.IsSuccess);

    var updatedSubject = await IncludeAll(context.Set<TSubject>().AsNoTracking())
      .SingleAsync(subject => subject.Id == result.Value.Id);

    AssertEqual(subjectToUpdate, updatedSubject);
  }

  [Fact]
  public async Task Should_NotAllowForSubjectInternalCodeDuplicate()
  {
    // Arrange
    await using var context = CreateDbContext();
    await using var contextIAM = CreateDbContextIAM();
    var fakebus = new FakeBus();
    var user = new UserDataProvider();
    var subjectRepository = new AnagEfRepository<Subject>(context);
    var userRepository = new IAMEfRepository<User>(contextIAM);
    await using var contextCities = CreateDbContextCities();
    var citiesRepository = new CommonEfRepository<City>(contextCities);
    var checkTakIdCode = new CheckItalianTaxID();
    var subjToAdd = CreateSubject1(id: 1);
    var internalcode = "INTERNALCODE01";
    subjToAdd.SetInternalCode(internalcode);

    context.Add(subjToAdd);
    await context.SaveChangesAsync();
    context.ChangeTracker.Clear();

    subjToAdd = CreateSubject2(id: 2);
    subjToAdd.SetInternalCode(internalcode);

    var upsertService = new SubjectUpsertService(subjectRepository,
      citiesRepository,
      userRepository,
      checkTakIdCode,
      fakebus,
      user);

    // Act
    var result = await upsertService.Upsert(subjToAdd);
    context.ChangeTracker.Clear();

    // Assert
    Assert.False(result.IsSuccess);

    Assert.Collection(result.ValidationErrors, e =>
    {
      Assert.Equal(ErrorCode.DuplicateInternalCode.Identifier, e.Identifier);
    });
  }

  protected static Address CreateAddress(AddressType addressType, int? id = null)
  {
    var address = new Address();
    address.SetType(addressType);
    address.SetToponymy("Toponymy");
    address.SetCity("CityName", null);

    if (id.HasValue)
    {
      address.Id = id.Value;
    }

    address.SetCountry("CountryISO", "CountryName");
    address.SetLocalPostCode("12345");
    address.SetNumbering("10");
    address.SetRegion("RegionName", null);
    address.SetNotes("Notes");

    return address;
  }

  protected City CreateCity()
  {
    var cityName = "Taurano";
    var cityReference = Guid.NewGuid();
    var cadastralCode = "L061";
    var countryIsoCode = "ITA";

    var city = new City(cityName, cityReference, countryIsoCode, Guid.NewGuid());
    city.SetCadastralCode(cadastralCode);

    return city;
  }

  protected Address CreateAddress2(AddressType addressType, City city, int? id = null)
  {
    var country = "Italia";
    var zip = "83020";
    var regionName = "Campania";

    var address = new Address();
    address.SetType(addressType);
    address.SetToponymy("Toponymy");
    address.SetCity(city.Name, null);

    if (id.HasValue)
    {
      address.Id = id.Value;
    }

    address.SetCountry(city.CountryISO, country);
    address.SetLocalPostCode(zip);
    address.SetNumbering("20");
    address.SetRegion(regionName, null);
    address.SetCity(city.Name, city.Guid);
    address.SetNotes("Notes");

    return address;
  }

  protected static Core.Anag.SubjectAggregate.Contact CreateContact(ContactType contactType, int? id = null)
  {
    var contact = new Core.Anag.SubjectAggregate.Contact();
    contact.SetContactType(contactType);
    contact.SetContactInfo(ContactInfoType.EMail, "email@mail.com");

    if (id.HasValue)
    {
      contact.Id = id.Value;
    }

    contact.SetNotes("Notes");

    return contact;
  }

  protected static TaxStatus CreateTaxStatus(int? id = null)
  {
    var taxStatus = new TaxStatus();
    taxStatus.SetType(TaxStatusType.ApplySplitPayment);
    taxStatus.SetNotes("Notes");

    if (id.HasValue)
    {
      taxStatus.Id = id.Value;
    }

    return taxStatus;
  }

  protected static BankAccount CreateBankAccount(BankAccountType bankAccountType, int? id = null)
  {
    var bankAccount = new BankAccount();
    bankAccount.SetType(bankAccountType);
    bankAccount.SetReference("IT60X0542811101000000123456", BankAccountCodeType.IBAN);
    bankAccount.SetHolder("AccountHolder");

    if (id.HasValue)
    {
      bankAccount.Id = id.Value;
    }

    bankAccount.SetNotes("Notes");

    return bankAccount;
  }

  protected abstract TSubject CreateSubject1(int? id = null);

  protected abstract TSubject CreateSubject2(int? id = null);

  protected abstract TSubject CreateSubject3(City city, int? id = null);

  public static void InitializeProperties1(TSubject subject, int? id = null)
  {
    if (id.HasValue)
    {
      subject.Id = id.Value;
    }

    subject.SetEntryStatus(EntryStatus.Working, null);
    subject.SetInternalCode("1 InternalCode");
    subject.SetExternalSourceCode("1 ExternalSourceCode");
    subject.SetCustomPersonType(1);
    subject.SetCustomSubjectStatus(1);

    subject.AddAddress(CreateAddress(AddressType.LegalResidential, id + 1));
    subject.AddBankAccount(CreateBankAccount(BankAccountType.Main, id + 2));
    subject.AddContact(CreateContact(ContactType.Main, id + 3));
    subject.AddTaxStatus(CreateTaxStatus(id + 4));

    var group = new ManagementSubject()
    {
      Id = id + 5 ?? default
    };
    group.SetFullName("1 Name");
    group.SetInternalCode("1 MCode");
    group.SetManagementCode("1 ManagementCode");
    group.SetBaseCountryTaxIdCode("1 BaseCountryTaxIdCode");

    subject.SetCompanyGroupParent(group, true, "1 Notes");

    var officer = new LegalSubject()
    {
      Id = id + 6 ?? default
    };
    officer.SetFullName("1 Name");
    officer.SetInternalCode("1 LCode");
    officer.SetBaseCountryTaxIdCode("1 BaseCountryTaxIdCode");
    officer.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    subject.AddOfficer(officer, OfficerType.LegalRepresentative, DateOnly.FromDateTime(new DateTime(2022, 01, 01)), until: null, "1 Notes");

    var owner = new ManagementSubject()
    {
      Id = id + 7 ?? default
    };
    owner.SetFullName("1 Name");
    owner.SetInternalCode("1 OWNCode");
    owner.SetManagementCode("1 ManagementCode");
    owner.SetBaseCountryTaxIdCode("1 BaseCountryTaxIdCode");

    subject.AddOwnerManagementSubject(owner);

    var category = new SubjectCategory("1 Name", CategoryFunction.Employee)
    {
      Id = id + 8 ?? default
    };
    subject.SetCategories(new[] { category });
  }

  protected void InitializeProperties2(TSubject subject, int? id = null)
  {
    if (id.HasValue)
    {
      subject.Id = id.Value;
    }

    subject.SetEntryStatus(EntryStatus.FrozenClosed, DateTime.UtcNow);
    subject.SetInternalCode("2 InternalCode");
    subject.SetExternalSourceCode("2 ExternalSourceCode");
    subject.SetCustomPersonType(2);
    subject.SetCustomSubjectStatus(2);

    subject.AddAddress(CreateAddress(AddressType.LegalResidential, id + 1));
    subject.AddBankAccount(CreateBankAccount(BankAccountType.Main, id + 2));
    subject.AddContact(CreateContact(ContactType.Main, id + 3));
    subject.AddTaxStatus(CreateTaxStatus(id + 4));

    var group = new ManagementSubject()
    {
      Id = id + 5 ?? default
    };
    group.SetFullName("2 Name");
    group.SetInternalCode("2 MG Name");
    group.SetManagementCode("2 ManagementCode");
    group.SetBaseCountryTaxIdCode("2 BaseCountryTaxIdCode");

    subject.SetCompanyGroupParent(group, true, "2 Notes");

    var officer = new LegalSubject()
    {
      Id = id + 6 ?? default
    };
    officer.SetFullName("1 Name");
    officer.SetInternalCode("2 OFF Name");
    officer.SetBaseCountryTaxIdCode("1 BaseCountryTaxIdCode");
    officer.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

    subject.AddOfficer(officer, OfficerType.Guardian, DateOnly.FromDateTime(new DateTime(2022, 02, 02)), until: null, "2 Notes");

    var owner = new ManagementSubject()
    {
      Id = id + 7 ?? default
    };
    owner.SetFullName("2 Name");
    owner.SetInternalCode("2 OWN Name");    
    owner.SetManagementCode("2 ManagementCode");
    owner.SetBaseCountryTaxIdCode("2 BaseCountryTaxIdCode");

    subject.AddOwnerManagementSubject(owner);

    var category = new SubjectCategory("2 Name", CategoryFunction.Landlord)
    {
      Id = id + 8 ?? default
    };
    subject.SetCategories(new[] { category });
  }

  protected IQueryable<TSubject> IncludeAll(IQueryable<TSubject> query)
    => query
      .Include(subject => subject.Addresses)
      .Include(subject => subject.BankAccounts)
      .Include(subject => subject.Contacts)
      .Include(subject => subject.TaxStatuses)
      .Include(subject => subject.RelationSubordinates)
      .Include(subject => subject.RelationMains)
      .Include(subject => subject.Categories);

  protected virtual void AssertEqual(TSubject subject1, TSubject subject2)
  {
    Assert.Equal(subject1.Id, subject2.Id);
    Assert.Equal(subject1.Name, subject2.Name);
    Assert.Equal(subject1.EntryStatus, subject2.EntryStatus);
    Assert.Equal(subject1.InternalCode, subject2.InternalCode);
    Assert.Equal(subject1.ExternalSourceCode, subject2.ExternalSourceCode);
    Assert.Equal(subject1.CustomPersonType, subject2.CustomPersonType);
    Assert.Equal(subject1.CustomSubjectStatus, subject2.CustomSubjectStatus);

    AssertEqual(subject1.Addresses, subject2.Addresses, AssertEqual);
    AssertEqual(subject1.Contacts, subject2.Contacts, AssertEqual);
    AssertEqual(subject1.BankAccounts, subject2.BankAccounts, AssertEqual);
    AssertEqual(subject1.TaxStatuses, subject2.TaxStatuses, AssertEqual);
    AssertEqual(subject1.Categories, subject2.Categories, AssertEqual);
    AssertEqual(subject1.RelationMains, subject2.RelationMains);
    AssertEqual(subject1.RelationSubordinates, subject2.RelationSubordinates);
    AssertEqual(subject1.CompanyGroupParent, subject2.CompanyGroupParent);
  }

  protected AnagDbContext CreateDbContext()
    => new(
      CreateNewContextOptions(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>(),
      null);

  private static DbContextOptions<AnagDbContext> CreateNewContextOptions()
  {
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    var builder = new DbContextOptionsBuilder<AnagDbContext>()
      .UseInMemoryDatabase("cleanarchitecture")
      .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }

  protected IAMDbContext CreateDbContextIAM()
    => new(
      CreateNewContextOptionsIAM(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>());

  private static DbContextOptions<IAMDbContext> CreateNewContextOptionsIAM()
  {
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    var builder = new DbContextOptionsBuilder<IAMDbContext>()
      .UseInMemoryDatabase("cleanarchitecture")
      .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }
  protected CommonDbContext CreateDbContextCities()
    => new(
      CreateNewContextCitiesOptions(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>(),
      null);

  private static DbContextOptions<CommonDbContext> CreateNewContextCitiesOptions()
  {
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    var builder = new DbContextOptionsBuilder<CommonDbContext>()
      .UseInMemoryDatabase("cleanarchitecture")
      .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }

  private static void AssertEqual<T>(IEnumerable<T> enumerable1, IEnumerable<T> enumerable2, Action<T, T> assertEqualAction)
    where T : EntityBase
  {
    Assert.Equal(enumerable1.Count(), enumerable2.Count());

    foreach (var (item1, item2) in enumerable1.OrderBy(item => item.Id).Zip(enumerable2.OrderBy(itme => itme.Id)))
    {
      assertEqualAction(item1, item2);
    }
  }

  private static void AssertEqual(IEnumerable<SubjectRelation> relations1, IEnumerable<SubjectRelation> relations2)
  {
    Assert.Equal(relations1.Count(), relations2.Count());

    var keySelector = (SubjectRelation relation) => (relation.MainId, relation.SubordinateId, relation.RelationType);

    foreach (var (relation1, relation2) in relations1.OrderBy(keySelector).Zip(relations2.OrderBy(keySelector)))
    {
      AssertEqual(relation1, relation2);
    }
  }

  private static void AssertEqual(Address address1, Address address2)
  {
    Assert.Equal(address1.Id, address2.Id);
    Assert.Equal(address1.AddressType, address2.AddressType);
    Assert.Equal(address1.Toponymy, address2.Toponymy);
    Assert.Equal(address1.CityReference, address2.CityReference);
    Assert.Equal(address1.CityName, address2.CityName);
    Assert.Equal(address1.CountryISO?.ToUpper(), address2.CountryISO?.ToUpper());
    Assert.Equal(address1.CountryName, address2.CountryName);
    Assert.Equal(address1.LocalPostCode, address2.LocalPostCode);
    Assert.Equal(address1.Numbering, address2.Numbering);
    Assert.Equal(address1.RegionName, address2.RegionName);
    Assert.Equal(address1.RegionReference, address2.RegionReference);
    Assert.Equal(address1.Notes, address2.Notes);
  }

  private static void AssertEqual(Core.Anag.SubjectAggregate.Contact contact1,
    Core.Anag.SubjectAggregate.Contact contact2)
  {
    Assert.Equal(contact1.Id, contact2.Id);
    Assert.Equal(contact1.ContactType, contact2.ContactType);
    Assert.Equal(contact1.ContactInfoType, contact2.ContactInfoType);
    Assert.Equal(contact1.ContactInfo, contact2.ContactInfo);
    Assert.Equal(contact1.Notes, contact2.Notes);
  }

  private static void AssertEqual(BankAccount bankAccount1, BankAccount bankAccount2)
  {
    Assert.Equal(bankAccount1.Id, bankAccount2.Id);
    Assert.Equal(bankAccount1.BankAccountType, bankAccount2.BankAccountType);
    Assert.Equal(bankAccount1.ReferenceCode, bankAccount2.ReferenceCode);
    Assert.Equal(bankAccount1.ReferenceCodeType, bankAccount2.ReferenceCodeType);
    Assert.Equal(bankAccount1.AccountHolder, bankAccount2.AccountHolder);
    Assert.Equal(bankAccount1.Notes, bankAccount2.Notes);
  }

  private static void AssertEqual(TaxStatus taxStatus1, TaxStatus taxStatus2)
  {
    Assert.Equal(taxStatus1.Id, taxStatus1.Id);
    Assert.Equal(taxStatus1.TaxStatusType, taxStatus2.TaxStatusType);
    Assert.Equal(taxStatus1.Notes, taxStatus2.Notes);
  }

  private static void AssertEqual(SubjectRelation? relation1, SubjectRelation? relation2)
  {
    if (relation1 is null)
    {
      Assert.Null(relation2);

      return;
    }

    Assert.Equal(relation1!.Id, relation2!.Id);
    Assert.Equal(relation1.MainId, relation2.MainId);
    Assert.Equal(relation1.SubordinateId, relation2.SubordinateId);
    Assert.Equal(relation1.RelationType, relation2.RelationType);
    Assert.Equal(relation1.OfficerRelationType, relation2.OfficerRelationType);
    Assert.Equal(relation1.GroupRelationType, relation2.GroupRelationType);
    Assert.Equal(relation1.Notes, relation2.Notes);
  }

  private static void AssertEqual(SubjectCategory category1, SubjectCategory category2)
  {
    Assert.Equal(category1.Id, category2.Id);
    Assert.Equal(category1.Name, category2.Name);
    Assert.Equal(category1.Function, category2.Function);
  }
}
