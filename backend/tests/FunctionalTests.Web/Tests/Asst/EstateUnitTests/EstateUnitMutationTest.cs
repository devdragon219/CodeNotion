using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;
using AddressType = RealGimm.Core.Asst.EstateAggregate.AddressType;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

public abstract class EstateUnitMutationTest : EmptyDbWebTest
{
  private const string EstateFragment = """
    id
    """;

  private const string FloorFragment = """
    id
    name
    position
    """;

  private const string StairFragment = """
    id
    description
    """;

  private const string AddressFragment = """
    id
    addressType
    localPostCode
    countryISO
    cityName
    toponymy
    numbering
    """;

  private const string OfficialActFragment = """
    id
    protocolNumber
    registrationDate
    registrationNumber
    actRegistrationDates {
      dateType
      value
    }
    actRegistrationFields {
      fieldType
      value
    }
    """;

  private const string ValidationErrorSelector = """
    identifier
    errorMessage
    errorCode
    severity
    """;

  protected const string EstateUnitSelector = $$"""
    id
    estate {
      {{EstateFragment}}
    }
    internalCode
    type
    status
    ownershipStartDate
    ownershipType
    sharedArea
    floors {
      {{FloorFragment}}
    }
    stair {
      {{StairFragment}}
    }
    address {
      {{AddressFragment}}
    }
    subNumbering
    officialAct {
      {{OfficialActFragment}}
    }
    """;

  public EstateUnitMutationTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected static string ResultFragment(string? valueFragment = null)
  {
    var selector = $$"""
      isSuccess
      status
      validationErrors {
        {{ValidationErrorSelector}}
      }
      """;

    if (valueFragment is not null)
    {
      selector += Environment.NewLine;
      selector += $$"""
        value {
          {{valueFragment}}
        }
        """;
    }

    return selector;
  }

  public static ManagementSubject CreateManagementSubject(int id)
  {
    var subject = new ManagementSubject();
    subject.SetFullName("FinanceDepartment");
    subject.SetManagementCode("MGMT2023_42");
    subject.SetBaseCountryTaxIdCode("US123456789");
    subject.SetEntryStatus(EntryStatus.IncompleteDraft, closureDate: null);
    subject.SetInternalCode("MNG_SUBJ_2023_42");
    subject.AddSelfManagementRelation();

    subject.Id = id;

    return subject;
  }

  public static Address CreateAddress(string numbering)
  {
    var address = new Address();
    address.SetType(AddressType.Primary);
    address.SetToponymy("Downtown");
    address.SetCity("New York", null);
    address.SetLocalPostCode("10001");
    address.SetCounty("Manhattan", countyGuid: null);
    address.SetCountry("USA", "United States");
    address.SetNumbering(numbering);

    return address;
  }

  public static Estate CreateEstate(int id,
    int managementSubjectId,
    EstateUsageType usageType,
    EstateMainUsageType mainUsageType)
  {
    var estate = new Estate();
    estate.SetName("GreenVilleEstate");
    estate.SetStatus(EstateStatus.Operational);
    estate.SetType(EstateType.Building);
    estate.SetOwnership(EstateOwnership.Mixed);
    estate.SetMainUsageType(mainUsageType);
    estate.SetUsageType(usageType);
    estate.SetManagement(managementSubjectId, null);

    estate.SetInternalCode("EST2023_42");
    var ns = new Stair();
    ns.SetDescription("Stair1");
    estate.AddStairs(ns);
    ns = new Stair();
    ns.SetDescription("Stair2");
    estate.AddStairs(ns);
    ns = new Stair();
    ns.SetDescription("Stair3");
    estate.AddStairs(ns);
    var nf = new Floor();
    nf.SetName("Floor0");
    nf.SetPosition(0);
    estate.AddFloor(nf);
    nf = new Floor();
    nf.SetName("Floor1");
    nf.SetPosition(1);
    estate.AddFloor(nf);
    nf = new Floor();
    nf.SetName("Floor2");
    nf.SetPosition(3);
    estate.AddFloor(nf);
    estate.AddAddress(CreateAddress(numbering: "1"));
    estate.AddAddress(CreateAddress(numbering: "2"));
    estate.AddAddress(CreateAddress(numbering: "3"));

    estate.Id = id;

    return estate;
  }

  protected static OfficialAct CreateOfficialAct(int id)
  {
    var officialAct = new OfficialAct();
    officialAct.SetProtocolNumber("PRTCL2023_41");
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_REPERTOIRE_NUMBER, "RPTR2023_41"));

    officialAct.SetRegistrationData("REG2023_41", DateOnly.Parse("2023-01-11"));
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_WRITTEN_AT_CITY, "San Diego"));

    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_TRANSCRIPTION_NUMBER, "TRANS2023_41"));
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_TRANSCRIPTION_CITY, "Los Angeles"));
    officialAct.AddActRegistrationDate(new(RegistrationDateType.IT_TRANSCRIPTION_DATE, DateOnly.Parse("2023-01-14")));

    officialAct.AddActRegistrationDate(new(RegistrationDateType.IT_NOTARY_ACT_DATE, DateOnly.Parse("2023-01-04")));
    officialAct.AddActRegistrationField(new(RegistrationFieldType.IT_COLLECTION_NUMBER, "CN2023_41"));
    officialAct.SetIssueData("Jacob Smith", null, null, null);

    officialAct.Id = id;

    return officialAct;
  }

  public static EstateUnit CreateEstateUnit(
    int id,
    Estate estate,
    Address address,
    IEnumerable<Floor> floors,
    Stair? stair = null,
    int? officialActId = null,
    EstateUnitSurface[]? surfaces = null)
  {
    var estateUnit = new EstateUnit();
    estateUnit.SetName("EU2023_41X");
    estateUnit.SetInternalCode("EU2023_41");
    estateUnit.SetType(EstateUnitType.Other);
    estateUnit.SetStatus(EstateUnitStatus.Existing);
    estateUnit.SetUsageType(estate.UsageType);

    estateUnit.SetOwnership(
      EstateUnitOwnershipType.Loan,
      DateOnly.Parse("2023-01-01"),
      0.1d,
      null);

    estateUnit.SetExternalCode("EXT2023_41");
    estateUnit.SetNotes("EstateUnit 41");
    estateUnit.SetSharedArea(true);
    estateUnit.SetEstate(estate);
    estateUnit.SetAddress(address, "Suite 101");
    estateUnit.SetStair(stair);
    estateUnit.SetOfficialActId(officialActId);

    foreach (var floor in floors)
    {
      estateUnit.AddFloor(floor);
    }

    if (surfaces is not null)
    {
      estateUnit.SetSurfaces(surfaces);
    }

    estateUnit.Id = id;

    return estateUnit;
  }

  protected static EstateUnitOfficialActInput CreateOfficialActInput()
    => new()
    {
      CollectionNumber = "CN2023_42",
      NotaryActDate = DateOnly.Parse("2023-01-05"),
      NotaryName = "John Doe",
      ProtocolNumber = "PRTCL2023_42",
      RegistrationDate = DateOnly.Parse("2023-01-10"),
      RegistrationNumber = "REG2023_42",
      RepertoireNumber = "RPTR2023_42",
      TranscriptionCity = "Los Angeles",
      TranscriptionDate = DateOnly.Parse("2023-01-15"),
      TranscriptionNumber = "TRANS2023_42",
      WrittenAtCity = "Los Angeles"
    };

  protected static EstateUnitInput CreateEstateUnitInput(
    int estateId,
    int addressId,
    IEnumerable<int> floorIds,
    int usageTypeId,
    int? stairId = null,
    EstateUnitOfficialActInput? officialAct = null,
    CadastralUnitInput? cadastralUnit = null)
  {
    return new EstateUnitInput
    {
      EstateId = estateId,
      ExternalCode = "EXT2023_42",
      Name = "EU2023_42X",
      Notes = "EstateUnit 42",
      OwnershipPercent = 0.2d,
      UsageTypeId = usageTypeId,
      InternalCode = "EU2023_42",
      Type = EstateUnitType.Building,
      Status = EstateUnitStatus.Existing,
      OwnershipStartDate = DateOnly.Parse("2023-01-02"),
      OwnershipType = EstateUnitOwnershipType.Property,
      SharedArea = false,
      AddressId = addressId,
      SubNumbering = "42a",
      StairId = stairId,
      FloorIds = floorIds.ToArray(),
      OfficialAct = officialAct,
      CadastralUnit = cadastralUnit
    };
  }

  protected static CadastralUnitIncome CreateCadastralIncome()
  {
    var income = new CadastralUnitIncome();
    income.SetCategories("Residential", "Apartments");
    income.SetMetricsAmounts(IncomeMetric.SquareMetres, 100m, 75m, 5000m);
    income.SetRegisteredSurface(120m);
    income.SetType(IncomeType.ActualIncome);

    return income;
  }

  protected static CadastralUnavailability CreateCadastralUnavailability()
  {
    var unavailability = new CadastralUnavailability();
    unavailability.SetData(new DateOnly(2023, 01, 01), new DateOnly(2023, 12, 31), "Scheduled maintenance");
    return unavailability;
  }

  protected static CadastralExpenses CreateCadastralExpense()
  {
    var expense = new CadastralExpenses();
    expense.SetExpenseType(CadastralExpenseType.Increment);
    expense.SetReferenceYear(2022);
    expense.SetFiscalYear(2023);
    expense.SetAmount(1500.00m);
    expense.SetRevaluationFactor(1.02);
    return expense;
  }

  protected static CadastralCoordinates CreateCadastralCoordinates()
  {
    var coordinates = new CadastralCoordinates();
    coordinates.SetData(CoordinateType.ItalianOrdinary, "Adjacent to park", "100", "200", "300", "400", "500", null);
    coordinates.SetITTavData("123456", "A", "1");
    return coordinates;
  }

  protected static CadastralUnit CreateCadastralUnit(int id, EstateUnit estateUnit)
  {
    var cadastralUnit = new CadastralUnit();
    cadastralUnit.SetInternalCode("C" + estateUnit.InternalCode);
    cadastralUnit.SetType(EstateUnitType.Building);
    cadastralUnit.SetStatus(CadastralUnitStatus.Existing);
    cadastralUnit.SetDates(new DateOnly(2023, 01, 01), null);

    cadastralUnit.SetEstateUnit(estateUnit);
    cadastralUnit.SetNotes("CadastralNotes", "FiscalNotes", "ConsortiumNotes");
    cadastralUnit.SetAddress(CreateAddress("Numbering"));
    cadastralUnit.SetIncome(CreateCadastralIncome());
    cadastralUnit.SetInspection(CreateCadastralInspection());
    cadastralUnit.Coordinates.Add(CreateCadastralCoordinates());
    cadastralUnit.Expenses.Add(CreateCadastralExpense());
    cadastralUnit.Unavailabilities.Add(CreateCadastralUnavailability());

    return cadastralUnit;
  }

  protected static CadastralUnitInspection CreateCadastralInspection()
  {
    var inspection = new CadastralUnitInspection();
    inspection.SetMacroZone("Urban");
    inspection.SetMicroZone("Downtown");
    inspection.SetIsHistoricalEstate(true);
    inspection.SetIsDirectRestriction(false);
    inspection.SetProtocolDate(new DateOnly(2023, 01, 01));
    inspection.SetDate(new DateOnly(2023, 01, 01));
    inspection.SetProtocolNumber("12345/2023");
    inspection.SetHeading("Routine Inspection");
    return inspection;
  }

  protected static CadastralUnitInput CreateCadastralUnitInput(int seed)
    => new()
    {
      InternalCode = "CU" + seed,
      Address = new AddressInput
      {
        AddressType = AddressType.Primary,
        CityName = $"Rome {seed}",
        Toponymy = $"Via Roma {seed}",
        CountryISO = "ITA",
        RegionName = $"Lazio {seed}",
        CountyName = $"Rome {seed}",
        LocalPostCode = $"000{seed}",
        Numbering = seed.ToString(),
        Notes = $"Near the Colosseum ({seed})"
      },
      Type = EstateUnitType.BuildingArea,
      Status = CadastralUnitStatus.Existing,
      Since = new DateOnly(1990, 5, 20).AddDays(seed),
      Inspection = new CadastralUnitInspectionInput
      {
        MacroZone = $"Historical Center {seed}",
        MicroZone = $"Trastevere {seed}",
        IsHistoricalEstate = seed % 2 == 0,
        IsDirectRestriction = seed % 2 == 0,
        ProtocolDate = new DateOnly(2022, 1, 15).AddDays(seed),
        Date = new DateOnly(2022, 1, 16).AddDays(seed),
        ProtocolNumber = $"RM000{seed}",
        Heading = $"Historical Inspection {seed}"
      },
      Income = new CadastralUnitIncomeInput
      {
        MacroCategory = $"Residential {seed}",
        MicroCategory = $"Apartment {seed}",
        Metric = IncomeMetric.SquareMetres,
        MetricAmount = 100m * seed,
        MetricRentedAmount = 50m * seed,
        RegisteredSurface = 130m * seed,
        Type = IncomeType.ActualIncome,
        CadastralAmount = 1500.00m * seed
      },
      Coordinates = new CadastralCoordinatesInput[]
      {
        new()
        {
          Type = CoordinateType.ItalianOrdinary,
          Level1 = $"Level1 {seed}",
          Level2 = $"Level2 {seed}",
          Level3 = $"Level3 {seed}",
          Level4 = $"Level4 {seed}",
          Level5 = $"Level5 {seed}",
          ITTavCorpo = $"ITTavCorpo {seed}",
          ITTavPartita = $"ITTavPartita {seed}",
          ITTavPorzione = $"ITTavPorzione {seed}",
          Notes = $"Notes {seed}"
        }
      },
      CadastralNotes = $"Apartment with park view {seed}",
      FiscalNotes = $"Tax exempt until 2025 {seed}",
      ConsortiumNotes = $"Part of a building consortium {seed}"
    };
}
