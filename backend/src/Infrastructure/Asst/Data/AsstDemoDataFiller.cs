using Bogus;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;
using AddressType = RealGimm.Core.Asst.EstateAggregate.AddressType;

namespace RealGimm.Infrastructure.Asst.Data;

public class AsstDemoDataFiller : IDemoDataFiller
{
  private static readonly GeometryFactory _geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
  private static readonly Faker<Address> _fakeAddress = new Faker<Address>().UseSeed(0);
  private static readonly Faker<Stair> _fakeStairs = new Faker<Stair>().UseSeed(0);

  public int ExecutionOrder => 10;
  private readonly AsstDbContext _context;
  private readonly AnagDbContext _anagContext;
  private readonly ILogger<AsstDemoDataFiller> _logger;
  private static readonly Dictionary<string, string> _fakeCountries;
  private static readonly string _fakeCountryITAisocode;

  static AsstDemoDataFiller()
  {
    _fakeCountries = new Dictionary<string, string>()
    {
      {CountryISO3.ITA.ToLower(),"Italy" },
      {"deu","Germany" },
      {"fra","France" },
      {"gbr","United Kingdom" },
      {"che","Switzerland" },
      {"esp","Spain" },
    };

    _fakeCountryITAisocode = CountryISO3.ITA.ToLower();

    _fakeAddress.CustomInstantiator(f =>
    {
      var na = new Address();
      na.SetType(AddressType.Primary);
      na.SetToponymy(f.Address.StreetName());
      na.SetCity(f.Address.City(), null);
      return na;
    });

    _fakeAddress.RuleFor(a => a.CountryISO, f => f.PickRandom<string>(_fakeCountries.Keys));
    _fakeAddress.RuleFor(a => a.CountryName, f => f.Address.Country());
    _fakeAddress.RuleFor(a => a.CountyName, f => f.Address.County());
    _fakeAddress.RuleFor(a => a.Numbering, f => f.Address.BuildingNumber());
    _fakeAddress.RuleFor(a => a.LocalPostCode, f => f.Address.ZipCode());
    _fakeAddress.RuleFor(a => a.LocationLatLon, f => 
      _geometryFactory.CreatePoint(
        new Coordinate(f.Random.Double(44, 49), f.Random.Double(1, 12))));

    _fakeStairs.CustomInstantiator(f =>
    {
      var ns = new Stair();
      ns.SetDescription(f.Lorem.Sentence(3));
      return ns;
    });
  }

  public AsstDemoDataFiller(AsstDbContext context, AnagDbContext anagContext, ILogger<AsstDemoDataFiller> logger)
  {
    _context = context;
    _anagContext = anagContext;
    _logger = logger;
  }

  public async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    await EstateFillAsync(shortData, cancellationToken);
    await EstateUnitFillAsync(shortData, cancellationToken);
    await EstateSubUnitFillAsync(shortData, cancellationToken);
    await CadastralUnitFillAsync(shortData, cancellationToken);
    await CatalogueCategoriesAndTypesFillAsync(cancellationToken);
    await CatalogueItemFillAsync(shortData, cancellationToken);
  }

  public async Task EstateFillAsync(bool shortData, CancellationToken cancellationToken)
  {
    var managementSubjectIds = await _anagContext.Subjects
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .OfType<ManagementSubject>()
      .Where(subject => subject.EntryStatus == EntryStatus.Working)
      .Select(subject => subject.Id)
      .ToListAsync(cancellationToken);

    var floorTemplates = await _context.FloorTemplates.TagWith(Constants.SKIP_ACCESS_FILTER).ToListAsync(cancellationToken);

    var estateFaker = new EstateFaker
    {
      UsageTypes = await _context.EstateUsageTypes.TagWith(Constants.SKIP_ACCESS_FILTER).ToListAsync(cancellationToken),
      MainUsageTypes = await _context.EstateMainUsageTypes.TagWith(Constants.SKIP_ACCESS_FILTER).ToListAsync(cancellationToken),
      ManagementSubjectIds = managementSubjectIds,
      AddressFaker = _fakeAddress,
      StairFaker = _fakeStairs,
      FloorFakerFactory = () => new FloorFaker()
      {
        FloorTemplates = floorTemplates
      }
    };

    var data = estateFaker.Generate(shortData ? 30 : 5_000);

    _context.Estates.AddRange(data);
    await _context.SaveChangesAsync(cancellationToken);

    _logger.LogInformation("Estates created.");
  }

  public async Task EstateUnitFillAsync(bool shortData, CancellationToken cancellationToken)
  {
    var faker = new EstateUnitFaker
    {
      Estates = _context.Estates.Local
        .Where(e => EstateUnit.AllowedOwnershipTypes.ContainsKey(e.Ownership))
        .ToList(),
      UsageTypes = _context.EstateUsageTypes.Local
    };
    
    var data = faker.Generate(shortData ? 30 : 1_000);
    await _context.AddRangeAsync(data, cancellationToken);
    await _context.SaveChangesAsync(cancellationToken);

    _logger.LogInformation("Estate Units created.");
  }

  public async Task EstateSubUnitFillAsync(bool shortData, CancellationToken cancellationToken)
  {
    var faker = new EstateSubUnitFaker
    {
      EstatesUnits = _context.EstateUnits.Local,
      UsageTypes = _context.EstateUsageTypes.Local
    };

    var data = faker.Generate(shortData ? 30 : 1_000);
    await _context.AddRangeAsync(data, cancellationToken);
    await _context.SaveChangesAsync(cancellationToken);

    _logger.LogInformation("Estate SubUnits created.");
  }

  public async Task CadastralUnitFillAsync(bool shortData, CancellationToken cancellationToken)
  {
    var faker = new CadastralUnitFaker()
    {
      EstateUnits = _context.EstateUnits.Local,
      AddressFaker = _fakeAddress
    };

    var data = faker.Generate(shortData ? 30 : 1_000);
    await _context.AddRangeAsync(data, cancellationToken);
    await _context.SaveChangesAsync(cancellationToken);

    _logger.LogInformation("Cadastral units created.");
  }

  private async Task CatalogueCategoriesAndTypesFillAsync(CancellationToken cancellationToken)
  {
    var catalogueData = new Dictionary<string, Dictionary<string, string[]>>
    {
      ["Impianti elettrici"] = new()
      {
        ["Impianto elettrico"] = [],
        ["Impianto di terra e protezione scariche atmosferiche"] =
        [
          "Impianto di terra",
          "Impianto di protezione da scariche atmosferiche"
        ],
        ["Impianto di telecomunicazioni"] = [],
        ["Sistema di alimentazione normale"] =
        [
          "Cabine ricezione MT e di trasformazione MT/BT",
          "Impianto rifasamento (anello e anello B )",
          "Quadri elettrici di ricezione e distribuzione in media tensione",
          "Quadro generale di bassa tensione"
        ],
        ["Sistema di alimentazione emergenza"] = ["Gruppo elettrogeno"],
        ["Sistema di alimentazione in continuità assoluta"] = [],
        ["Sistema generale"] = []
      },
      ["Impianti e attrezzature antincendio"] = new()
      {
        ["Attrezzature antincendio"] = ["Estintori", "Idranti", "Evacuatori di fumo"],
        ["Impianto rilevazione incendio"] = [],
        ["Impianto spegnimento incendio"] = [],
        ["Compartimentazione antincendio"] =
        [
          "Porte tagliafuoco e uscite di sicurezza",
          "Serrande di compartimentazione"
        ],
        ["Manichette antincendio"] = []
      },
      ["Elevatori"] = new()
      {
        ["Elevatori elettromeccanici"] =
        [
          "Argano e motogeneratore",
          "Quadro di manovra",
          "Vano corsa e cabina",
          "Imp. elevatore elettrico AC/VF fino a 6 fermate",
          "Imp. elevatore elettrico AC/VF fino a 12 fermate"
        ],
        ["Elevatori idraulici"] =
        [
          "Imp. elevatore idraulico fino a 6 fermate",
          "Imp. elevatore idraulico fino a 12 fermate"
        ],
        ["Elevatori speciali"] = [],
        ["Rampe idrauliche"] = [],
        ["Ponteggi sospesi"] = [],
        ["Scale e tappeti mobili"] = [],
        ["Montascale"] = [],
        ["Montacarte"] = [],
        ["Servoscala / piattaforme"] = [],
        ["Rampe di carico idrauliche"] = []
      },
      ["Chiusure automatiche"] = new()
      {
        ["Cancelli e portoni"] = [],
        ["Barriere"] = [],
        ["Porte automatiche"] = [],
        ["Tapparelle"] = []
      },
      ["Condizionamento e riscaldamento"] = new()
      {
        ["Climatizzazione"] =
        [
          "Unità di trattamento aria primaria",
          "Filtri aria",
          "Ventilconvettori"
        ],
        ["Riscaldamento"] = [],
        ["Reti e terminali per fluidi vettori"] = [],
        ["Reti e terminali di distribuzione dell’aria"] = [],
        ["Termoregolazione"] = [],
        ["Rete di distribuzione gas combustibile"] = [],
        ["Impianto smaltimento aria"] = [],
        ["Termoregolazione e risparmio energetico"] = []
      },
      ["Impianti idrici"] = new()
      {
        ["Impianto idrosanitario"] = [],
        ["Fognature e caditoie"] = [],
        ["Impianto acque meteoriche"] = [],
        ["Innaffiamento"] = []
      }
    };

    var catalogueTypeIndex = 0;
    var faker = new Faker { Random = new Randomizer(localSeed: 0) };
    var activityFaker = new CatalogueTypeActivityFaker();
    var fieldFaker = new CatalogueTypeFieldFaker();
    var estateUsageTypes = await _context.EstateUsageTypes.TagWith(Constants.SKIP_ACCESS_FILTER).ToListAsync(cancellationToken);

    foreach (var (categoryData, categoryIndex) in catalogueData.Select((data, index) => (data, index)))
    {
      var catalogueCategory = new CatalogueCategory();
      catalogueCategory.SetName(categoryData.Key);
      catalogueCategory.SetInternalCode($"CO{(categoryIndex + 1).ToString().PadLeft(5, '0')}");

      foreach (var (subCategoryData, subCategoryIndex) in categoryData.Value.Select((data, index) => (data, index)))
      {
        var catalogueSubCategory = new CatalogueSubCategory();
        catalogueSubCategory.SetName(subCategoryData.Key);
        catalogueSubCategory.SetInternalCode($"{catalogueCategory.InternalCode}SC{(subCategoryIndex + 1).ToString().PadLeft(3, '0')}");
        catalogueCategory.SubCategories.Add(catalogueSubCategory);

        foreach (var typeData in subCategoryData.Value)
        {
          var catalogueType = new CatalogueType();
          catalogueType.SetName(typeData);
          catalogueType.SetInternalCode($"TO{(catalogueTypeIndex + 1).ToString().PadLeft(5, '0')}");
          catalogueType.SetCategory(catalogueCategory, catalogueSubCategory);
          catalogueType.SetUsageTypes(faker.PickRandom(estateUsageTypes, amountToPick: faker.Random.Int(1, 5)));
          catalogueType.SetFields(Enumerable.Range(1, 3).Select(row => fieldFaker.GenerateBetween(1, 4).ToArray()).ToArray());
          catalogueType.Activities.AddRange(activityFaker.Generate(5));

          _context.CatalogueTypes.Add(catalogueType);
          catalogueTypeIndex++;
        }
      }

      _context.CatalogueCategories.Add(catalogueCategory);
    };

    await _context.SaveChangesAsync(cancellationToken);
    _logger.LogInformation("{entity} added", typeof(CatalogueCategory).Name.Humanize().Pluralize());
  }

  public async Task CatalogueItemFillAsync(bool shortData, CancellationToken cancellationToken)
  {
    var faker = new CatalogueItemFaker()  
      .UseEstates(_context.Estates.Local)
      .UseTypes(_context.CatalogueTypes.Local);
    
    var data = faker.Generate(shortData ? 30 : 100);
    _context.CatalogueItems.AddRange(data);

    await _context.SaveChangesAsync(cancellationToken);

    _logger.LogInformation("Catalogue Items created.");
  }
}
