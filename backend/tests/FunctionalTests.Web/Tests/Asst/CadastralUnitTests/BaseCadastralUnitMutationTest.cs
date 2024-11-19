using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.CrossModule;
using RealGimm.Web.Asst.Models;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;
using AddressType = RealGimm.Core.Asst.EstateAggregate.AddressType;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.CadastralUnitTests;

public class BaseCadastralUnitMutationTest : EmptyDbWebTest
{
  private const string InspectionFragment = """
    date
    protocolDate
    protocolNumber
    heading
    macroZone
    microZone
    isHistoricalEstate
    isDirectRestriction
    """;

  private const string IncomeFragment = """
    macroCategory
    microCategory
    metric
    metricAmount
    metricRentedAmount
    registeredSurface
    type
    cadastralAmount
    """;

  private const string CoordinatesFragment = """
    coordinateType
    level1
    level2
    level3
    level4
    level5
    hasITTavData
    itTavPartita
    itTavCorpo
    itTavPorzione
    unmanagedOverride
    notes
    """;

  private const string ExpensesFragment = """
    id
    expenseType
    fiscalYear
    referenceYear
    amount
    revaluationFactor
    """;

  private const string UnavailabilitiesFragment = """
    id
    since
    until
    notes
    """;

  private const string HistoryFragment = """
     internalCode
     status
     type
     since
     until
     deletionDate
     historyTags
     cadastralNotes
     fiscalNotes
     consortiumNotes
     id
     """;

  private const string ResultValueFragment = $$"""
    id
    internalCode
    income {
      {{IncomeFragment}}
    }
    cadastralNotes
    status
    consortiumNotes
    inspection {
      {{InspectionFragment}}
    }
    coordinates {
      {{CoordinatesFragment}}
    }
    expenses {
      {{ExpensesFragment}}
    }
    unavailabilities {
      {{UnavailabilitiesFragment}}
    }
    type
    estateUnit {
      id
    }
    historyTags
    history {
      {{HistoryFragment}}
    }
    since
    until
    """;

  private const string ValidationErrorFragment = """
    identifier
    errorMessage
    errorCode
    severity
    """;

  public const string ResultFragment = $$"""
    isSuccess
    status
    value {
      {{ResultValueFragment}}
    }
    validationErrors {
      {{ValidationErrorFragment}}
    }
    """;

  public BaseCadastralUnitMutationTest(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected static ManagementSubject CreateManagementSubject(int id)
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

  protected static Address CreateAddress(int id, string numbering)
  {
    var address = new Address()
    {
      Id = id
    };
    address.SetType(AddressType.Primary);
    address.SetToponymy("Downtown");
    address.SetCity("New York", null);
    address.SetLocalPostCode("10001");
    address.SetCounty("Manhattan", countyGuid: null);
    address.SetCountry("USA", "United States");
    address.SetNumbering(numbering);

    return address;
  }

  protected static Estate CreateEstate(int id,
    int managementSubjectId,
    EstateUsageType usageType,
    EstateMainUsageType mainUsageType)
  {
    var estate = new Estate() { Id = id };
    estate.SetName("GreenVilleEstate");
    estate.SetStatus(EstateStatus.Operational);
    estate.SetType(EstateType.Building);
    estate.SetOwnership(EstateOwnership.Mixed);
    estate.SetMainUsageType(mainUsageType);
    estate.SetUsageType(usageType);
    estate.SetManagement(managementSubjectId, null);

    estate.SetInternalCode("EST2023_42");

    for (int i = 1; i <= 3; i++)
    {
      var subEntityId = id * 10 + i;

      var stair = new Stair() { Id = subEntityId };
      stair.SetDescription($"Stair{i}");

      var floor = new Floor() { Id = subEntityId };
      floor.SetName($"Floor{i}");
      floor.SetPosition(i);

      estate.AddStairs(stair);
      estate.AddFloor(floor);
      estate.AddAddress(CreateAddress(subEntityId, numbering: i.ToString()));
    }

    return estate;
  }

  protected static EstateUnit CreateEstateUnit(int id, Estate estate)
  {
    var estateUnit = new EstateUnit();
    estateUnit.SetName("EU2023_41X");
    estateUnit.SetInternalCode("EU2023_41");
    estateUnit.SetType(EstateUnitType.Other);
    estateUnit.SetStatus(EstateUnitStatus.Disused);
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
    estateUnit.SetAddress(estate.Addresses[0], "Suite 101");
    estateUnit.SetStair(estate.Stairs[0]);
    estateUnit.AddFloor(estate.Floors[0]);

    estateUnit.Id = id;

    return estateUnit;
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
    cadastralUnit.SetHistoryTags(new Guid[] { new() });
    cadastralUnit.SetEstateUnit(estateUnit);
    cadastralUnit.SetNotes("CadastralNotes", "FiscalNotes", "ConsortiumNotes");
    cadastralUnit.SetAddress(CreateAddress(id: default, "Numbering"));
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

  protected static CadastralUnitInput CreateCadastralUnitInput(
    EstateUnit estateUnit,
    bool shouldCreateExpenses,
    bool shouldCreateUnavailabilities)
    => new()
    {
      EstateUnitId = estateUnit.Id,
      InternalCode = "CU" + estateUnit.InternalCode,
      Address = new AddressInput
      {
        AddressType = AddressType.Primary,
        CityName = "Rome",
        Toponymy = "Via Roma",
        CountryISO = "ITA",
        RegionName = "Lazio",
        CountyName = "Rome",
        LocalPostCode = "00118",
        Numbering = "10",
        SubNumbering = "A",
        Notes = "Near the Colosseum"
      },
      Type = EstateUnitType.BuildingArea,
      Status = CadastralUnitStatus.Cancelled,
      Since = new DateOnly(1990, 5, 20),
      Until = new DateOnly(2000, 10, 11),
      Inspection = new CadastralUnitInspectionInput
      {
        MacroZone = "Historical Center",
        MicroZone = "Trastevere",
        IsHistoricalEstate = true,
        IsDirectRestriction = true,
        ProtocolDate = new DateOnly(2022, 1, 15),
        Date = new DateOnly(2022, 1, 16),
        ProtocolNumber = "RM20220115",
        Heading = "Historical Inspection"
      },
      Income = new CadastralUnitIncomeInput
      {
        MacroCategory = "Residential",
        MicroCategory = "Apartment",
        Metric = IncomeMetric.SquareMetres,
        MetricAmount = 120.0m,
        MetricRentedAmount = 100.0m,
        RegisteredSurface = 130.0m,
        Type = IncomeType.ActualIncome,
        CadastralAmount = 1500.00m
      },
      Coordinates = new CadastralCoordinatesInput[]
      {
        new()
        {
          Type = CoordinateType.ItalianOrdinary,
          Level1 = "Level1",
          Level2 = "Level2",
          Level3 = "Level3",
          Level4 = "Level4",
          Level5 = "Level5",
          ITTavCorpo = "ITTavCorpo",
          ITTavPartita = "ITTavPartita",
          ITTavPorzione = "ITTavPorzione",
          Notes = "Notes"
        }
      },
      CadastralNotes = "Apartment with park view",
      FiscalNotes = "Tax exempt until 2025",
      ConsortiumNotes = "Part of a building consortium",
      Expenses = !shouldCreateExpenses
        ? Array.Empty<CadastralExpensesInput>()
        : new CadastralExpensesInput[]
        {
          new()
          {
            ExpenseType = CadastralExpenseType.Increment,
            FiscalYear = 2021,
            ReferenceYear = 2020,
            Amount = 1000.00m,
            RevaluationFactor = 1.0
          }
        },
      Unavailabilities = !shouldCreateUnavailabilities
        ? Array.Empty<CadastralUnavailabilityInput>()
        : new CadastralUnavailabilityInput[]
        {
          new()
          {
            Since = new DateOnly(2021, 01, 01),
            Until = null,
            Notes = "Notes"
          }
        }
    };
}
