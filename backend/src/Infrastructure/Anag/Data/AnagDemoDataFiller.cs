using Bogus;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Anag.Data;

public class AnagDemoDataFiller : IDemoDataFiller
{
  private static readonly Faker<Address> _fakeAddress = new Faker<Address>().UseSeed(0);
  private static readonly Faker<Address> _fakeBirthAddress = new Faker<Address>().UseSeed(1);
  private static readonly Faker<Contact> _fakeContact = new Faker<Contact>().UseSeed(0);
  private static readonly Faker<BankAccount> _fakeBankAcc = new Faker<BankAccount>().UseSeed(0);
  private static readonly Faker<OrgUnit> _fakeOrgUnits = new Faker<OrgUnit>().UseSeed(0);
  public int ExecutionOrder => 1;
  private readonly AnagDbContext _context;
  private readonly ILogger<AnagDemoDataFiller> _logger;

  private static readonly DateTime RelativeDateFaker = new(2023, 1, 1);

  static AnagDemoDataFiller()
  {
    _fakeAddress.CustomInstantiator(f =>
    {
      var na = new Address();
      na.SetType(AddressType.LegalResidential);
      na.SetToponymy(f.Address.StreetName());
      na.SetCity(f.Address.City(), null);
      return na;
    });

    _fakeAddress.RuleFor(a => a.CountryISO, f => f.RgCountryCode());
    _fakeAddress.RuleFor(a => a.CountryName, f => f.Address.Country());
    _fakeAddress.RuleFor(a => a.CountyName, f => f.Address.County());
    _fakeAddress.RuleFor(a => a.LocalPostCode, f => f.Address.ZipCode());
    _fakeAddress.RuleFor(a => a.Numbering, f => f.Address.BuildingNumber());

    _fakeBirthAddress.CustomInstantiator(f =>
    {
      var na = new Address();
      na.SetType(AddressType.BirthLocation);
      na.SetCity(f.Address.City(), null);
      return na;
    });

    _fakeBirthAddress.RuleFor(a => a.CountryISO, f => f.RgCountryCode());
    _fakeBirthAddress.RuleFor(a => a.CountryName, f => f.Address.Country());
    _fakeBirthAddress.RuleFor(a => a.CountyName, f => f.Address.County());

    _fakeBankAcc.CustomInstantiator(f =>
    {
      var nb = new BankAccount();
      nb.SetType(BankAccountType.Main);
      nb.SetReference(f.Finance.Iban(), BankAccountCodeType.IBAN);
      nb.SetHolder(f.Finance.AccountName());
      return nb;
    });

    _fakeContact.CustomInstantiator(f =>
    {
      var nc = new Contact();
      nc.SetContactType(ContactType.Main);
      nc.SetContactInfo(f.PickRandomParam(
        ContactInfoType.LandlinePhone,
        ContactInfoType.MobilePhone
      ),
      f.Phone.PhoneNumber("##########"));
      return nc;
    });
  }

  public AnagDemoDataFiller(AnagDbContext context, ILogger<AnagDemoDataFiller> logger)
  {
    _context = context;
    _logger = logger;
  }

  public async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    var categories = _context.SubjectCategories.ToList();

    await SeedManagementSubjects(_context, categories, cancellationToken);

    _logger.LogInformation("Management subjects created.");

    var owners = _context.Subjects.Local
      .AsQueryable()
      .Where(s => s.PersonType == PersonType.ManagementSubject)
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .ToList();

    // generate some test data using bogus
    await SeedPhysicalSubjects(_context, owners, categories, shortData, cancellationToken);

    _logger.LogInformation("Physical subjects created.");

    var officers = _context.Subjects.Local
      .Where(s => s.PersonType == PersonType.PhysicalPerson
        && s.Categories.Any(c => c.Function == CategoryFunction.Officer))
      .ToList();

    await SeedLegalSubjects(_context, owners, categories, officers, shortData, cancellationToken);

    _logger.LogInformation("Legal subjects created.");

    var legals = _context.Subjects.Local
     .Where(s => s.PersonType == PersonType.LegalPerson)
     .ToList();

    await SeedOrgUnits(_context, owners, legals, shortData, cancellationToken);

    _logger.LogInformation("OrgUnits created.");
  }

  private static async Task SeedPhysicalSubjects(DbContext context,
    IEnumerable<Subject> owners,
    IEnumerable<SubjectCategory> categories,
    bool shortData,
    CancellationToken cancellationToken)
  {
    var faker = new Faker<PhysicalSubject>().UseSeed(0);
    faker.CustomInstantiator(f =>
    {
      var r = new PhysicalSubject();
      r.SetNames(f.Person.FirstName, f.Person.LastName);
      r.SetBirthSex(f.PickRandom<BirthSex>());
      r.AddAddress(_fakeAddress.Generate());
      r.AddContact(_fakeContact.Generate());
      r.AddBankAccount(_fakeBankAcc.Generate());

      r.SetBirthLocation(_fakeBirthAddress.Generate());

      //Bind owning management entity
      r.AddOwnerManagementSubject(f.PickRandom(owners));

      //Set categories
      r.SetCategories(f.PickRandom(categories
        .Where(c => c.Function == CategoryFunction.Officer
          || c.Function == CategoryFunction.AgreementParty
          || c.Function == CategoryFunction.Employee
          || c.Function == CategoryFunction.Landlord
          || c.Function == CategoryFunction.Tenant
          || c.Function == CategoryFunction.Supplier
          || c.Function == CategoryFunction.BuildingAdministrator), 3));

      return r;
    });

    RuleForBaseProperties(faker);
    faker.RuleFor(p => p.BirthCountryTaxIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.ProfessionalTaxIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.BirthDate, f => f.Date.PastDateOnly(40, DateOnly.FromDateTime(RelativeDateFaker)));

    var data = faker.Generate(shortData ? 30 : 5_000);
    await context.AddRangeAsync(data, cancellationToken);
    await context.SaveChangesAsync(cancellationToken);
  }

  private static async Task SeedLegalSubjects(DbContext context,
    IEnumerable<Subject> owners,
    IEnumerable<SubjectCategory> categories,
    IEnumerable<Subject> officers,
    bool shortData,
    CancellationToken cancellationToken)
  {
    var faker = new Faker<LegalSubject>().UseSeed(0);
    faker.CustomInstantiator(f =>
    {
      var r = new LegalSubject();
      r.SetFullName(f.Person.FullName);
      r.SetBaseCountryTaxIdCode(f.Random.AlphaNumeric(10));
      r.SetLegalSubjectType(LegalSubjectType.ActualLegalSubject);

      r.AddAddress(_fakeAddress.Generate());
      r.AddContact(_fakeContact.Generate());
      r.AddBankAccount(_fakeBankAcc.Generate());

      //Bind owning management entity
      var owner = f.PickRandom(owners);
      r.AddOwnerManagementSubject(owner);

      //Set categories
      r.SetCategories(f.PickRandom(categories
        .Where(c => c.Function == CategoryFunction.AgreementParty
          || c.Function == CategoryFunction.Employee
          || c.Function == CategoryFunction.Landlord
          || c.Function == CategoryFunction.Tenant
          || c.Function == CategoryFunction.Supplier
          || c.Function == CategoryFunction.BuildingAdministrator), 3));

      //Optionally set as part of business group for the owner
      if (f.Random.Bool())
      {
        r.SetCompanyGroupParent(owner, false, f.Lorem.Paragraph());
        r.UpdateGroupSignature(f.Random.AlphaNumeric(4));
      }

      //Optionally set an officer
      if (f.Random.Bool())
      {
        r.AddOfficer(f.PickRandom(officers), OfficerType.LegalRepresentative,
         f.Date.PastDateOnly(1, DateOnly.FromDateTime(RelativeDateFaker)),
          null,
          f.Lorem.Paragraph());
      }
      return r;
    });
    RuleForBaseProperties(faker);
    faker.RuleFor(p => p.FullName, f => f.Company.CompanyName());
    faker.RuleFor(p => p.BaseCountryTaxIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.AdditionalTaxIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.BaseCountryISO, f => f.RgCountryCode());
    faker.RuleFor(p => p.Location, f => f.Address.FullAddress());
    faker.RuleFor(p => p.BusinessStart, f => f.Date.PastDateOnly(1, DateOnly.FromDateTime(RelativeDateFaker)));
    faker.RuleFor(p => p.ShareCapital, f => f.Random.Decimal(1_000, 1_000_000));
    faker.RuleFor(p => p.CompaniesHouseIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.AdditionalGovIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.BankingId1, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.BankingId2, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.InterGroupSignature, f => f.Random.AlphaNumeric(5));

    var data = faker.Generate(shortData ? 30 : 1_000);
    await context.AddRangeAsync(data, cancellationToken);
    await context.SaveChangesAsync(cancellationToken);
  }

  private static async Task SeedManagementSubjects(DbContext context,
    IEnumerable<SubjectCategory> categories,
    CancellationToken cancellationToken)
  {
    var faker = new Faker<ManagementSubject>().UseSeed(0);
    faker.CustomInstantiator(f =>
    {
      var r = new ManagementSubject();
      r.SetFullName(f.Person.FullName);
      r.SetManagementCode(f.Random.AlphaNumeric(5));
      r.SetBaseCountryTaxIdCode(f.Random.AlphaNumeric(10));
      r.AddSelfManagementRelation();
      r.UpdateGroupSignature(f.Random.AlphaNumeric(4));
      r.AddAddress(_fakeAddress.Generate());
      r.AddContact(_fakeContact.Generate());
      r.AddBankAccount(_fakeBankAcc.Generate());
      r.SetCategories(categories.Where(c => c.Function == CategoryFunction.CompanyGroup));
      return r;
    });

    RuleForBaseProperties(faker);
    faker.RuleFor(p => p.FullName, f => f.Company.CompanyName());
    faker.RuleFor(p => p.BaseCountryTaxIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.AdditionalTaxIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.BaseCountryISO, f => f.RgCountryCode());
    faker.RuleFor(p => p.Location, f => f.Address.FullAddress());
    faker.RuleFor(p => p.BusinessStart, f => f.Date.PastDateOnly(5, new DateOnly(2023, 1, 1)));
    faker.RuleFor(p => p.ShareCapital, f => f.Random.Decimal(1_000, 1_000_000));
    faker.RuleFor(p => p.CompaniesHouseIdCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.AdditionalGovIdCode, f => f.Random.AlphaNumeric(10));

    //This number is guessed by the AsstDemoDataFiller
    var data = faker.Generate(20);
    await context.AddRangeAsync(data, cancellationToken);
    await context.SaveChangesAsync(cancellationToken);
  }

  private static void RuleForBaseProperties<TSubject>(IRuleSet<TSubject> faker)
    where TSubject : Subject
  {
    faker.RuleFor(p => p.InternalCode, f => (10000 + f.IndexGlobal).ToString());
    faker.RuleFor(p => p.ExternalSourceCode, f => f.Random.AlphaNumeric(10));
    faker.RuleFor(p => p.CreationDate, f => f.Date.Past(1, RelativeDateFaker).ToUniversalTime());
    faker.RuleFor(p => p.EntryStatus, f => f.PickRandom(
      EntryStatus.Working,
      EntryStatus.IncompleteDraft
    ));
  }

  private static async Task SeedOrgUnits(DbContext context,
    IEnumerable<Subject> managementSubjects,
    IEnumerable<Subject> legalSubjects,
    bool shortData,
    CancellationToken cancellationToken)
  {
    //seed orgunits for ManagementSubjects
    _fakeOrgUnits.CustomInstantiator(f =>
    {
      var parentSubject = f.Random.Bool()
        ? f.PickRandom(managementSubjects)
        : f.PickRandom(legalSubjects);

      var orgUnit = NewOrgUnit(f, parentSubject);
      if (f.Random.Bool())
      {
        orgUnit.AddChild(NewOrgUnit(f, parentSubject, orgUnit));
      }
      return orgUnit;
    });
    var dataMS = _fakeOrgUnits.Generate(shortData ? 20 : 100);
    await context.AddRangeAsync(dataMS, cancellationToken);

    await context.SaveChangesAsync(cancellationToken);
  }

  private static OrgUnit NewOrgUnit(Faker f, Subject s, OrgUnit? ouParent = null)
  {
    var orgUnit = new OrgUnit();
    orgUnit.SetType(
      ouParent == null
        ? f.PickRandom(OrgUnitType.ManagementHierarchy, OrgUnitType.GeographicalHierarchy)
        : ouParent.OrgUnitType);

    orgUnit.SetName(f.Company.CompanyName());
    orgUnit.SetInternalCode(f.Random.AlphaNumeric(5));
    orgUnit.SetExternalCode(f.Random.AlphaNumeric(6));
    orgUnit.SetParentSubject(s);

    if (orgUnit.OrgUnitType == OrgUnitType.GeographicalHierarchy)
    {
      //Adds some hopefully-existing cities - they may not exist. The application should handle that just fine.
      orgUnit.AddGeographicalCities(Enumerable.Range(0, f.Random.Int(2, 5))
        .Select(i => f.Random.Int(10, 1000))
        .ToArray()
        );
    }
    orgUnit.AddContact(_fakeContact.Generate());
    orgUnit.AddContact(_fakeContact.Generate());
    return orgUnit;
  }
}
