using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Resources;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Asst;

public class AsstDataSeeder : IModuleDataSeeder
{
  private readonly ILogger<AsstDataSeeder> _logger;
  private readonly IStringLocalizer<SharedResources> _sharedLocalizer;
  private readonly IRepository<CadastralCategory> _cadastralCategoryRepository;
  private readonly IRepository<EstateUsageType> _usageTypeRepository;
  private readonly IRepository<EstateMainUsageType> _mainUsageTypeRepository;
  private readonly IRepository<CadastralLandCategory> _cadastralLandCategoryRepository;
  private readonly IRepository<FloorTemplate> _floorTemplateRepository;
  private readonly IRepository<FunctionArea> _functionAreaRepository;

  public AsstDataSeeder(
    ILogger<AsstDataSeeder> logger,
    IStringLocalizer<SharedResources> sharedLocalizer,
    IRepository<CadastralCategory> categoryRepository,
    IRepository<EstateUsageType> usageTypeRepository,
    IRepository<EstateMainUsageType> mainUsageTypeRepository,
    IRepository<CadastralLandCategory> cadastralLandCategoryRepository,
    IRepository<FloorTemplate> floorTemplateRepository,
    IRepository<FunctionArea> functionAreaRepository)
  {
    _logger = logger;
    _sharedLocalizer = sharedLocalizer;
    _cadastralCategoryRepository = categoryRepository;
    _usageTypeRepository = usageTypeRepository;
    _mainUsageTypeRepository = mainUsageTypeRepository;
    _cadastralLandCategoryRepository = cadastralLandCategoryRepository;
    _floorTemplateRepository = floorTemplateRepository;
    _functionAreaRepository = functionAreaRepository;
  }

  public async Task InitializeAsync()
  {
    if (await _cadastralCategoryRepository.CountAsync() > 0)
    {
      //Skip
      _logger.LogInformation("Not running data seeder on already-initialized repository.");
      return;
    }

    _logger.LogInformation("Adding default cadastral categories...");

    //Always add italian cadastral categories
    await _cadastralCategoryRepository.AddRangeAsync(
      _categoriesItaly.Select(cat =>
      {
        var groupName = cat.Code.Split('/').First();
        var ncat = new CadastralCategory(cat.Description, groupName, CountryISO3.ITA);
        ncat.SetExternalCode(cat.Code);
        ncat.SetFactors((decimal)(cat.CadastralCoeffPct / 100),
            (decimal)(cat.CadastralTaxCoeffPct / 100));
        ncat.SetFlags(cat.isInstrumental, cat.isTaxed);
        return ncat;
      })
    );

    _logger.LogInformation("Adding default usage types...");

    await _usageTypeRepository.AddRangeAsync(
      _usageTypeLabels.Select((kvp, index) =>
      {
        var nusage = new EstateUsageType();
        nusage.SetName(_sharedLocalizer[kvp.Value]);
        nusage.SetInternalCode(kvp.Key);
        nusage.SetUsage(true, true, true, true);
        return nusage;
      })
    );

    await _mainUsageTypeRepository.AddRangeAsync(
      _mainUsageTypeLabels.Select((kvp, index) =>
      {
        var nusage = new EstateMainUsageType();
        nusage.SetName(_sharedLocalizer[kvp.Value]);
        nusage.SetInternalCode(kvp.Key);
        return nusage;
      })
    );

    await _cadastralLandCategoryRepository.AddRangeAsync(
      _cadastralLandCategoryLabels.Select((kvp, index) =>
      {
        var clcItem = new CadastralLandCategory();
        clcItem.SetData(kvp.Value, kvp.Key, CountryISO3.ITA, index);
        return clcItem;
      })
    );
    
    await _floorTemplateRepository.AddRangeAsync(
      _floorTemplates.Select(pair =>
        new FloorTemplate(name: _sharedLocalizer[pair.Value], position: pair.Key)));

    await _functionAreaRepository.AddRangeAsync(
      _functionAreas.Select(dto =>
      {
        var functionArea = new FunctionArea();
        functionArea.SetInternalCode(dto.InternalCode);
        functionArea.SetName(_sharedLocalizer[dto.NameLocalizationKey]);
        functionArea.SetSurfaceType(dto.SurfaceType);

        return functionArea;
      }));
  }

  public Task UpdateAsync()
  {
    return Task.CompletedTask;
  }

  private static readonly Dictionary<string, string> _mainUsageTypeLabels = new()
  {
    ["MU01"] = "MainUsageType.Other",
    ["MU02"] = "MainUsageType.Residential",
    ["MU03"] = "MainUsageType.ClinicOrNursingHomeOrHospital",
    ["MU04"] = "MainUsageType.Commercial",
    ["MU05"] = "MainUsageType.Industrial",
    ["MU06"] = "MainUsageType.Artisanal",
    ["MU07"] = "MainUsageType.Directional",
    ["MU08"] = "MainUsageType.Agricultural",
    ["MU09"] = "MainUsageType.RecreationalOrSportsStructure",
    ["MU10"] = "MainUsageType.HospitalityStructure",
    ["MU11"] = "MainUsageType.Garage",
    ["MU12"] = "MainUsageType.BoatSpot",
    ["MU13"] = "MainUsageType.Land",
    ["MU14"] = "MainUsageType.Mixed"
  };

  private static readonly Dictionary<string, string> _usageTypeLabels = new()
  {
    ["U01"] = "UsageType.Other",
    ["U02"] = "UsageType.Residential",
    ["U03"] = "UsageType.Office",
    ["U04"] = "UsageType.ShopOrBarOrMarket",
    ["U05"] = "UsageType.GarageOrParkingSpace",
    ["U06"] = "UsageType.Warehouse",
    ["U07"] = "UsageType.Laboratory",
    ["U08"] = "UsageType.CellarOrAttic",
    ["U09"] = "UsageType.School",
    ["U10"] = "UsageType.AssociationHeadquarters",
    ["U11"] = "UsageType.Land",
    ["U12"] = "UsageType.Mixed"
  };

  private static readonly CategoryDto[] _categoriesItaly =
  [
    new("A/01", false, false, "Abitazione di Tipo Signorile", 120, 160),
    new("A/02", false, false, "Abitazione di Tipo Civile", 120, 160),
    new("A/03", false, false, "Abitazione di Tipo Economico", 120, 160),
    new("A/04", false, false, "Abitazione di Tipo Popolare", 120, 160),
    new("A/05", false, false, "Abitazione di Tipo Ultrapopolare", 120, 160),
    new("A/06", false, false, "Abitazione di Tipo Rurale", 120, 160),
    new("A/07", false, false, "Abitazione In Villini", 120, 160),
    new("A/08", false, false, "Abitazione In Ville", 120, 160),
    new("A/09", false, false, "Castelli, Palazzi di Eminenti Pregi Artistici e Storici", 120, 160),
    new("A/10", false, true, "Uffici e Studi Privati", 60, 80),
    new("A/11", false, false, "Abitazioni ed Alloggi Tipici Dei Luoghi", 120, 160),
    new("B/01", false, true, "Collegi e Convitti; Educandati, Ricoveri, Orfanotrofi, Ospizi, Conventi, Seminari, e Caserme", 168, 140),
    new("B/02", false, true, "Case di Cura ed Ospedali", 168, 140),
    new("B/03", false, true, "Prigioni e Riformatori", 168, 140),
    new("B/04", false, true, "Uffici Pubblici", 168, 140),
    new("B/05", false, true, "Scuole, Laboratori Scientifici", 168, 140),
    new("B/06", false, true, "Biblioteche, Pinacoteche, Musei, Gallerie, Accademie, che non hanno Sede in Edifici della Categoria A09", 168, 140),
    new("B/07", false, true, "Cappelle ed Oratori non Destinati all'esercizio Pubblico dei Culti", 168, 140),
    new("B/08", false, true, "Magazzini Sotterranei per Deposito Derrate", 168, 140),
    new("C/01", false, true, "Negozi e Botteghe", 40.8, 55),
    new("C/02", false, true, "Magazzini e Locali di Deposito", 120, 160),
    new("C/03", false, true, "Laboratori per Arti e Mestieri", 120, 140),
    new("C/04", false, true, "Fabbricati e Locali per Esercizi Sportivi (senza Fine di Lucro)", 120, 140),
    new("C/05", false, true, "Stabilimenti Balneari e di Acque Curativi", 120, 140),
    new("C/06", false, true, "Stalle, Scuderie, Rimesse e Autorimesse", 120, 160),
    new("C/07", false, true, "Tettoie Chiuse ed Aperte", 120, 160),
    new("D/01", true, true, "Opifici", 60, 50),
    new("D/02", true, true, "Alberghi e Pensioni", 60, 50),
    new("D/03", true, true, "Teatri, Cinematografi, Sale per Concerti e Simili", 60, 50),
    new("D/04", true, true, "Casa di Cura ed Ospedali", 60, 50),
    new("D/05", true, true, "Istituti di Credito, Cambio ed Assicurazione", 60, 50),
    new("D/06", true, true, "Fabbricati e Locali per Esercizi Sportivi (con Fini di Lucro)", 60, 50),
    new("D/07", true, true, "Fabbricati Costruiti o Adattati per Speciali Esigenze di Attività Industriale e non Suscettibili di Destinazione Diversa senza Radicali Trasformazioni", 60, 50),
    new("D/08", true, true, "Fabbricati Costruiti o Adattati per Speciali Esigenze di una Attività Commerciale e non Suscettibili di Destinazione Diversa senza Radicali Trasformazioni", 60, 50),
    new("D/09", true, true, "Edifici Galleggianti o Sospesi, Assicurati a Punti Fissi al Suolo: Ponti Privati Soggetti a Pedaggio", 60, 50),
    new("D/10", true, true, "Fabbricati Produttivi Connessi alle Attività Agricole", 60, 50),
    new("D/11", true, true, "Scuole e Laboratori Scientifici Privati", 60, 65),
    new("D/12", true, true, "Posti Barca, Stabilimenti Balneari", 60, 65),
    new("E/01", false, true, "Stazioni per Servizi di Trasporto Terrestri, Marittimi ed Aerei", 40.8, 34),
    new("E/02", false, true, "Ponti Comunali e Provinciali Soggetti a Pedaggio", 40.8, 34),
    new("E/03", false, true, "Costruzioni e Fabbricati per Speciali Esigenze Pubbliche", 40.8, 34),
    new("E/04", false, true, "Recinti Chiusi per Speciali Esigenze Pubbliche", 40.8, 34),
    new("E/05", false, true, "Fabbricati Costituenti Fortificazioni e Loro Dipendenze", 40.8, 34),
    new("E/06", false, true, "Fari, Semafori, Torri per Rendere d'uso Pubblico l'orologio Comunale", 40.8, 34),
    new("E/07", false, true, "Fabbricati Destinati all'uso Pubblico Dei Culti", 40.8, 34),
    new("E/08", false, true, "Fabbricati e Costruzioni nei Cimiteri, esclusi i Colombari, i Sepolcri e le Tombe di Famiglia", 40.8, 34),
    new("E/09", false, true, "Edifici a Destinazione Particolare non compresi nelle Categorie Precedenti del Gruppo E", 40.8, 34),
    new("F/01", false, false, "Area Urbana", 0, 0),
    new("F/02", false, false, "Unità Collabenti", 0, 0),
    new("F/03", false, false, "Unità in Corso di Costruzione", 0, 0),
    new("F/04", false, false, "Unità in Corso di Definizione", 0, 0),
    new("F/05", false, false, "Lastrico Solare", 0, 0),
    new("F/06", false, false, "Procedimenti Davanti alle Commissioni Tributarie", 0, 0),
    new("F/07", false, false, "Portico", 0, 0),
    new("F/09", false, false, "Unità Proveniente dal Catasto Fondiario", 0, 0),
    new("F/10", false, false, "Fabbricato Ritenuto Rurale", 0, 0),
    new("F/11", false, false, "In Attesa di Classamento", 0, 0)
  ];

  private static readonly Dictionary<string, string> _cadastralLandCategoryLabels = new()
  {
    ["CLC001"] = "TERRENO A PRATO",
    ["CLC002"] = "VIGNETO",
    ["CLC003"] = "BOSCO",
    ["CLC004"] = "BOSCO ALTO",
    ["CLC005"] = "BOSCO CEDUO",
    ["CLC006"] = "BOSCO MISTO",
    ["CLC007"] = "CASTAGNETO DA FRUTTO",
    ["CLC008"] = "FABBRICATO RURALE",
    ["CLC009"] = "FRUTTETO",
    ["CLC010"] = "INCOLTO IMPRODUTTIVO",
    ["CLC011"] = "INCOLTO PRODUTTIVO",
    ["CLC012"] = "ORTO",
    ["CLC013"] = "PASCOLO",
    ["CLC014"] = "PRATO",
    ["CLC015"] = "PRATO PARCHEGGIO",
    ["CLC016"] = "SEMINATIVO",
    ["CLC017"] = "PRATO ARBORATO",
    ["CLC018"] = "SEMINATIVO ARBORATO",
    ["CLC019"] = "TERRENO A PASCOLO",
    ["CLC020"] = "TERRENO A VIGNETO",
    ["CLC021"] = "TERRENO INCOLTO",
    ["CLC022"] = "STRADA CONSORTILE",
    ["CLC023"] = "TERRENO SEMINATIVO",
    ["CLC024"] = "FOSSO",
    ["CLC025"] = "PASCOLO CESPUGLIATO",
    ["CLC026"] = "FRUTTETO IRRIGUO",
    ["CLC027"] = "SEMINATIVO IRRIGUO",
    ["CLC028"] = "SEMINATIVO IRRIGUO ARBORATO",
    ["CLC029"] = "INCOLTO STERILE",
    ["CLC030"] = "SEMINATIVO IRRIGUO",
    ["CLC031"] = "SEMINATIVO IRRIGUO ARBORATO",
    ["CLC032"] = "STRADA PRIVATA",
    ["CLC033"] = "TERR N FORM",
    ["CLC034"] = "AREA URBANA",
    ["CLC035"] = "ULIVETO",
    ["CLC036"] = "VIGNETO",
    ["CLC037"] = "AGRUMETO",
    ["CLC038"] = "AREA FAB DM",
    ["CLC039"] = "AREA RURALE",
    ["CLC040"] = "CANALE BON",
    ["CLC041"] = "CANNETO",
    ["CLC042"] = "CAVA",
    ["CLC043"] = "F.U. DI ACCERT",
    ["CLC044"] = "FICO D'INDIA",
    ["CLC045"] = "LIMONETO",
    ["CLC046"] = "MANDORLETO",
    ["CLC047"] = "NOCCIOLETO",
    ["CLC048"] = "NOCETO",
    ["CLC049"] = "ORTO IRRIGUO",
    ["CLC050"] = "ORTO IRRIGUO FLOREALE",
    ["CLC051"] = "PASCOLO ARBORATO",
    ["CLC052"] = "PIOPPETO",
    ["CLC053"] = "PRATO IRRIGUO",
    ["CLC054"] = "PRATO MARCITO",
    ["CLC055"] = "REL ACQ ES",
    ["CLC056"] = "RELIQUATO ENTE URBANO",
    ["CLC057"] = "RELIQUATO STRADALE",
    ["CLC058"] = "RISAIA STABILE",
    ["CLC059"] = "SEMINATIVO IRRIGUO-PRATO",
    ["CLC060"] = "SEMINATIVO IRRIGUO-RISAIA STABILE",
    ["CLC061"] = "SEMINATIVO-CANNETO",
    ["CLC062"] = "SOMMACCHETO",
    ["CLC063"] = "STAGNO",
    ["CLC064"] = "VIGNETO IRRIGUO"
  };

  private static readonly Dictionary<float, string> _floorTemplates = new()
  {
    [-1] = "FloorTemplate.Basement",
    [0] = "FloorTemplate.GroundFloor",
    [1] = "FloorTemplate.FirstFloor",
    [2] = "FloorTemplate.SecondFloor",
    [3] = "FloorTemplate.ThirdFloor",
    [4] = "FloorTemplate.FourthFloor",
    [5] = "FloorTemplate.FifthFloor",
    [6] = "FloorTemplate.SixthFloor",
    [7] = "FloorTemplate.SeventhFloor",
    [8] = "FloorTemplate.EighthFloor",
    [9] = "FloorTemplate.NinthFloor",
    [10] = "FloorTemplate.TenthFloor"
  };

  private static readonly FunctionAreaDto[] _functionAreas =
  [
    new("FA001", "FunctionArea.Office", SurfaceType.MainArea),
    new("FA002", "FunctionArea.Administration", SurfaceType.CommonArea),
    new("FA003", "FunctionArea.Warehouse", SurfaceType.MainArea),
    new("FA004", "FunctionArea.Reception", SurfaceType.CommonArea),
    new("FA005", "FunctionArea.Kitchen", SurfaceType.MainArea),
    new("FA006", "FunctionArea.Bathroom", SurfaceType.CommonArea),
    new("FA007", "FunctionArea.Closet", SurfaceType.SideArea),
    new("FA008", "FunctionArea.Balcony", SurfaceType.SideArea),
    new("FA009", "FunctionArea.Basement", SurfaceType.MainArea),
    new("FA010", "FunctionArea.ParkingSpot", SurfaceType.SideArea),
    new("FA011", "FunctionArea.Garden", SurfaceType.CommonArea)
  ];

  private record CategoryDto(string Code, bool isTaxed, bool isInstrumental, string Description, double CadastralCoeffPct, double CadastralTaxCoeffPct); 
  
  private record FunctionAreaDto(string InternalCode, string NameLocalizationKey, SurfaceType SurfaceType);
}
