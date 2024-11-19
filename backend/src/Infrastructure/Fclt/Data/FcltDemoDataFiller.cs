using Bogus;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.SharedKernel;

namespace RealGimm.Infrastructure.Fclt.Data;

public class FcltDemoDataFiller : DemoDataFillerBase<FcltDbContext, FcltDemoDataFiller>
{
  private readonly AnagDbContext _anagContext;
  private readonly AsstDbContext _asstContext;
  private readonly IAMDbContext _iamContext;

  public override int ExecutionOrder => 50;

  public FcltDemoDataFiller(
    FcltDbContext context,
    AnagDbContext anagContext,
    AsstDbContext asstContext,
    IAMDbContext iamContext,
    ILogger<FcltDemoDataFiller> logger)
    : base(context, logger)
  {
    _anagContext = anagContext;
    _asstContext = asstContext;
    _iamContext = iamContext;
  }

  public override async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    await FillCraftAsync(shortData ? 5 : 20, cancellationToken);
    await FillPriceListMeasurementUnitAsync(shortData ? 5 : 20, cancellationToken);
    await FillInterventionTypeAsync(shortData ? 5 : 20, cancellationToken);
    await FillQualificationLevelAsync(shortData ? 5 : 20, cancellationToken);
    await FillTicketTypeAsync(shortData ? 5 : 20, cancellationToken);
    await FillWorkTeamsAsync(shortData ? 5 : 20, cancellationToken);
    await FillEstateUnitGroupsAsync(shortData ? 50 : 100, cancellationToken);
    await FillContractTypeAsync(shortData ? 50 : 100, cancellationToken);
    await FillCalendarsAsync(2, cancellationToken);
    await FillSLAsAsync(shortData ? 50 : 100, cancellationToken);
    await FillPenaltiesAsync(shortData ? 50 : 100, cancellationToken);
    await FillPriceListsAsync(10, cancellationToken);
    await FillPriceListArticlesAsync(shortData ? 50 : 100, cancellationToken);
    await FillTicketChecklistTemplatesAsync(shortData ? 5 : 10, cancellationToken);
    await FillContractTemplateAsync(shortData ? 50 : 100, cancellationToken);
    await FillContractAsync(shortData ? 10 : 100, cancellationToken);
    await FillServiceCategoryAsync(cancellationToken);
  }

  private Task FillCraftAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => FillEntitiesAsync(new CraftFaker(), entitiesToGenerateCount, cancellationToken);
  
  private Task FillPriceListMeasurementUnitAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => FillEntitiesAsync(new PriceListMeasurementUnitFaker(), entitiesToGenerateCount, cancellationToken);

  private Task FillInterventionTypeAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => FillEntitiesAsync(new InterventionTypeFaker(), entitiesToGenerateCount, cancellationToken);

  private Task FillQualificationLevelAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => FillEntitiesAsync(new QualificationLevelFaker(), entitiesToGenerateCount, cancellationToken);

  private Task FillTicketTypeAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => FillEntitiesAsync(new TicketTypeFaker(), entitiesToGenerateCount, cancellationToken);

  private async Task FillWorkTeamsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var crafts = Context.Crafts.Local;
    var qualificationLevels = Context.QualificationLevels.Local;

    var faker = new WorkTeamFaker
    {
      WorkerFakerFactory = date => new WorkerFaker
      {
        MinSinceDate = date,
        Crafts = crafts,
        QualificationLevels = qualificationLevels
      },
      
      Subjects = await _anagContext
        .Subjects
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .ToListAsync(cancellationToken),

      Users = await _iamContext
        .Users
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .ToListAsync(cancellationToken),
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillEstateUnitGroupsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new EstateUnitGroupFaker
    {
      EstateUnitIds = await _asstContext
        .EstateUnits
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .Select(estateUnit => estateUnit.Id)
        .ToListAsync(cancellationToken),

      ManagementSubjectIds = await _anagContext
        .Subjects
        .OfType<ManagementSubject>()
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .Select(managementSubject => managementSubject.Id)
        .ToListAsync(cancellationToken),
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private Task FillContractTypeAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => FillEntitiesAsync(new ContractTypeFaker(), entitiesToGenerateCount, cancellationToken);

  private async Task FillContractTemplateAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new ContractTemplateFaker
    {
      ContractTypes = Context.ContractTypes.Local,
      SLAs = Context.SLAs.Local,
      Penalties = Context.Penalties.Local,
      
      CatalogueTypes = await _asstContext
        .CatalogueTypes
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .ToListAsync(cancellationToken)
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillCalendarsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => await FillEntitiesAsync(new CalendarFaker(), entitiesToGenerateCount, cancellationToken);

  private async Task FillSLAsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new SLAFaker
    {
      ComplexTicketConditionFaker = new ComplexTicketConditionFaker
      {
        InternalConditionFaker = new TicketConditionFaker
        {
          TicketTypes = Context.TicketTypes.Local,
          Calendars = Context.Calendars.Local,
          
          CatalogueCategories = await _asstContext
            .CatalogueCategories
            .TagWith(Constants.SKIP_ACCESS_FILTER)
            .ToListAsync(cancellationToken),

          CatalogueSubCategories = await _asstContext
            .CatalogueCategories
            .SelectMany(catalogueCategory => catalogueCategory.SubCategories)
            .TagWith(Constants.SKIP_ACCESS_FILTER)
            .ToListAsync(cancellationToken),

          CatalogueTypes = await _asstContext
            .CatalogueTypes
            .TagWith(Constants.SKIP_ACCESS_FILTER)
            .ToListAsync(cancellationToken),
        },
      },
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillPenaltiesAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new PenaltyFaker
    {
      ComplexTicketConditionFaker = new ComplexTicketConditionFaker
      {
        InternalConditionFaker = new TicketConditionFaker
        {
          TicketTypes = Context.TicketTypes.Local,
          Calendars = Context.Calendars.Local,

          CatalogueCategories = await _asstContext
            .CatalogueCategories
            .TagWith(Constants.SKIP_ACCESS_FILTER)
            .ToListAsync(cancellationToken),

          CatalogueSubCategories = await _asstContext
            .CatalogueCategories
            .SelectMany(catalogueCategory => catalogueCategory.SubCategories)
            .TagWith(Constants.SKIP_ACCESS_FILTER)
            .ToListAsync(cancellationToken),

          CatalogueTypes = await _asstContext
            .CatalogueTypes
            .TagWith(Constants.SKIP_ACCESS_FILTER)
            .ToListAsync(cancellationToken),
        },
      },
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillTicketChecklistTemplatesAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new TicketChecklistTemplateFaker
    {
      Crafts = Context.Crafts.Local,
      InterventionTypes = Context.InterventionTypes.Local,
      
      CatalogueTypes = await _asstContext
        .CatalogueTypes
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .Where(catalogueType => catalogueType.SubCategory != null)
        .Include(catalogueType => catalogueType.Activities)
        .ToListAsync(cancellationToken),
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillContractAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new ContractFaker
    {
      ContractTypes = Context.ContractTypes.Local,
      ContractTemplates = Context.ContractTemplates.Local,
      EstateUnitGroups = Context.EstateUnitGroups.Local,
      PriceLists = Context.PriceLists.Local,
      TicketChecklistTemplates = Context.TicketChecklistTemplates.Local,
      
      SLAFakerFactory = contractInternalCode => new SLAFaker
      {
        ContractInternalCode = contractInternalCode,
        ComplexTicketConditionFaker = new ComplexTicketConditionFaker
        {
          InternalConditionFaker = new TicketConditionFaker
          {
            TicketTypes = Context.TicketTypes.Local,
            Calendars = Context.Calendars.Local,

            CatalogueCategories = _asstContext
              .CatalogueCategories
              .TagWith(Constants.SKIP_ACCESS_FILTER)
              .ToList(),

            CatalogueSubCategories = _asstContext
              .CatalogueCategories
              .SelectMany(catalogueCategory => catalogueCategory.SubCategories)
              .TagWith(Constants.SKIP_ACCESS_FILTER)
              .ToList(),

            CatalogueTypes = _asstContext
              .CatalogueTypes
              .TagWith(Constants.SKIP_ACCESS_FILTER)
              .ToList(),
          },
        },
      },

      PenaltyFakerFactory = contractInternalCode => new PenaltyFaker
      {
        ContractInternalCode = contractInternalCode,
        ComplexTicketConditionFaker = new ComplexTicketConditionFaker
        {
          InternalConditionFaker = new TicketConditionFaker
          {
            TicketTypes = Context.TicketTypes.Local,
            Calendars = Context.Calendars.Local,

            CatalogueCategories = _asstContext
              .CatalogueCategories
              .TagWith(Constants.SKIP_ACCESS_FILTER)
              .ToList(),

            CatalogueSubCategories = _asstContext
              .CatalogueCategories
              .SelectMany(catalogueCategory => catalogueCategory.SubCategories)
              .TagWith(Constants.SKIP_ACCESS_FILTER)
              .ToList(),

            CatalogueTypes = _asstContext
              .CatalogueTypes
              .TagWith(Constants.SKIP_ACCESS_FILTER)
              .ToList(),
          },
        },
      },

      ProviderSubjects = await _anagContext
        .Subjects
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .ToListAsync(cancellationToken),

      EstateUnits = await _asstContext
        .EstateUnits
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .ToListAsync(cancellationToken),

      CatalogueTypes = await _asstContext
        .CatalogueTypes
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .ToListAsync(cancellationToken)
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private Task FillPriceListsAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
    => FillEntitiesAsync(new PriceListFaker(), entitiesToGenerateCount, cancellationToken);

  private async Task FillPriceListArticlesAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new PriceListArticleFaker
    {
      PriceLists = Context.PriceLists.Local,
      PriceListMeasurementUnits = Context.PriceListMeasurementUnits.Local,

      CatalogueTypes = await _asstContext
        .CatalogueTypes
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .ToListAsync(cancellationToken),
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillServiceCategoryAsync(CancellationToken cancellationToken)
  {
    var serviceCategories = new Dictionary<string, Dictionary<string, string[]>>
    {
      ["Igiene ambientale"] = new()
      {
        ["Pulizia e sanificazione"] =
        [
          "Pulizia interna di edifici",
          "Pulizia esterna di spazi pubblici e aree verdi",
          "Disinfezione e sanificazione di superfici e ambienti"
        ],
        ["Gestione dei rifiuti"] =
        [
          "Raccolta differenziata e smaltimento rifiuti",
          "Gestione dei rifiuti speciali e pericolosi",
          "Trattamento e riciclo dei rifiuti"
        ],
        ["Disinfestazione e deratizzazione"] =
        [
          "Trattamenti antiparassitari",
          "Derattizzazione e controllo infestazioni",
          "Bonifica ambientale (aree infestate o contaminate)"
        ]
      },
      ["Manutenzione del verde"] = new()
      {
        ["Manutenzione ordinaria"] =
        [
          "Taglio dell’erba e pulizia delle aree verdi",
          "Potatura e cura degli alberi e delle siepi",
          "Rimozione di fogliame e altri detriti"
        ],
        ["Irrigazione e concimazione"] =
        [
          "Installazione e manutenzione di impianti di irrigazione",
          "Concimazione e trattamenti del suolo",
          "Raccolta e utilizzo di acqua piovana per irrigazione"
        ],
        ["Servizi di Arboricoltura"] =
        [
          "Valutazione e cura della salute degli alberi",
          "Interventi di rimozione e abbattimento alberi pericolosi",
          "Piantumazione e sostituzione di specie vegetali"
        ]
      },
      ["Sicurezza"] = new()
      {
        ["Vigilanza e controllo accessi"] =
        [
          "Monitoraggio e controllo degli accessi",
          "Videosorveglianza e allarmi",
          "Servizio di guardie di sicurezza"
        ],
        ["Sicurezza sul Lavoro"] =
        [
          "Valutazione dei rischi e adeguamenti normativi"
        ]
      }
    };

    var serviceIndex = 0;
    var activityFaker = new ServiceActivityFaker();

    foreach (var (categoryData, categoryIndex) in serviceCategories.Select((data, index) => (data, index)))
    {
      var serviceCategory = new ServiceCategory();
      serviceCategory.SetName(categoryData.Key);
      serviceCategory.SetInternalCode($"SC{(categoryIndex + 1).ToString().PadLeft(5, '0')}");

      foreach (var (subCategoryData, subCategoryIndex) in categoryData.Value.Select((data, index) => (data, index)))
      {
        var serviceSubCategory = new ServiceSubCategory();
        serviceSubCategory.SetName(subCategoryData.Key);
        serviceSubCategory.SetInternalCode($"{serviceCategory.InternalCode}SC{(subCategoryIndex + 1).ToString().PadLeft(3, '0')}");
        serviceCategory.SubCategories.Add(serviceSubCategory);

        foreach (var serviceData in subCategoryData.Value)
        {
          var service = new Service();
          service.SetName(serviceData);
          service.SetInternalCode($"S{(serviceIndex + 1).ToString().PadLeft(6, '0')}");
          service.SetCategory(serviceCategory, serviceSubCategory);
          service.Activities.AddRange(activityFaker.Generate(5));

          Context.Services.Add(service);
          serviceIndex++;
        }
      }

      Context.ServiceCategories.Add(serviceCategory);
    }

    await Context.SaveChangesAsync(cancellationToken);
    Logger.LogInformation("{entity} added", nameof(ServiceCategory).Humanize().Pluralize());
  }
}
