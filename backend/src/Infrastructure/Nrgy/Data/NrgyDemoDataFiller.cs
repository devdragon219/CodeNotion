using Bogus;
using Humanizer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.SharedKernel;

namespace RealGimm.Infrastructure.Nrgy.Data;

public class NrgyDemoDataFiller : DemoDataFillerBase<NrgyDbContext, NrgyDemoDataFiller>
{
  private readonly AsstDbContext _asstContext;
  private readonly AnagDbContext _anagContext;
  private readonly CommonDbContext _commonDbContext;

  public override int ExecutionOrder => 50;

  public NrgyDemoDataFiller(
    NrgyDbContext context,
    AsstDbContext asstContext, 
    AnagDbContext anagContext,
    CommonDbContext commonDbContext,
    ILogger<NrgyDemoDataFiller> logger) : base(context, logger)
  {
    _asstContext = asstContext;
    _anagContext = anagContext;
    _commonDbContext = commonDbContext;
  }

  public override async Task FillAsync(bool shortData, CancellationToken cancellationToken)
  {
    await FillUtilityTypesAsync(cancellationToken);
    await FillUtilityServiceAsync(shortData ? 30 : 100, cancellationToken);
    await FillReadingAsync(shortData ? 100 : 500, cancellationToken);
    await FillCostChargeAsync(shortData ? 100 : 200, cancellationToken);
  }

  private async Task FillUtilityTypesAsync(CancellationToken cancellationToken)
  {
    var utilityTypeData = new (string InternalCode, UtilityCategory Category, string Description, string MeasurementUnit, string MeasurementUnitDescription, int TimeOfUseRateCount, MeteringType MeteringType)[]
    {
       ("TF001", UtilityCategory.Electrical, "Energia elettrica 4 fasi", "KWH", "chilowattora", 4, MeteringType.IncrementalReading),
       ("TF002", UtilityCategory.Electrical, "Energia elettrica 3 fasi", "KWH", "chilowattora", 3, MeteringType.IncrementalReading),
       ("TF003", UtilityCategory.Electrical, "Energia elettrica 2 fasi", "KWH", "chilowattora", 2, MeteringType.IncrementalReading),
       ("TF004", UtilityCategory.Electrical, "Energia elettrica monofase", "KWH", "chilowattora", 1, MeteringType.Usage),
       ("TF005", UtilityCategory.NaturalGas, "Gas naturale 4 fasi", "smc", "metri cubi standard", 4, MeteringType.IncrementalReading),
       ("TF006", UtilityCategory.NaturalGas, "Gas naturale 3 fasi", "smc", "metri cubi standard", 3, MeteringType.IncrementalReading),
       ("TF007", UtilityCategory.NaturalGas, "Gas naturale 2 fasi", "smc", "metri cubi standard", 2, MeteringType.IncrementalReading),
       ("TF008", UtilityCategory.NaturalGas, "Gas naturale monofase", "smc", "metri cubi standard", 1, MeteringType.Usage),
       ("TF009", UtilityCategory.WaterSupply, "Servizio idrico integrato 2 fasi", "mc", "metri cubi", 2, MeteringType.IncrementalReading),
       ("TF010", UtilityCategory.WaterSupply, "Servizio idrico integrato monofase", "mc", "metri cubi", 1, MeteringType.Usage),
       ("TF011", UtilityCategory.WasteManagementCollection, "Gestione rifiuti urbani", "n° svuot.", "numero svuotamenti", 1, MeteringType.Usage)
    };

    var utilityTypes = utilityTypeData.Select(data =>
    {
      var utilityType = new UtilityType();
      utilityType.SetData(data.Category, data.Description, data.InternalCode, null);
      
      utilityType.SetMeasurement(
        data.MeasurementUnit,
        data.MeasurementUnitDescription,
        data.TimeOfUseRateCount,
        data.MeteringType,
        false);

      return utilityType;
    });

    Context.UtilityTypes.AddRange(utilityTypes);
    await Context.SaveChangesAsync(cancellationToken);

    Logger.LogInformation("{entity} added", typeof(UtilityType).Name.Humanize().Pluralize());
  }

  private async Task FillUtilityServiceAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var utilityTypes = Context.UtilityTypes.Local;
    var orgUnitsIds = await _anagContext.OrgUnit.TagWith(Constants.SKIP_ACCESS_FILTER).Select(es => es.Id).ToListAsync(cancellationToken);
    var subjectsIds = await _anagContext.Subjects.TagWith(Constants.SKIP_ACCESS_FILTER).Select(es => es.Id).ToListAsync(cancellationToken);
    var accountingItemsIds = await _commonDbContext.AccountingItems.TagWith(Constants.SKIP_ACCESS_FILTER).Select(es => es.Id).ToListAsync(cancellationToken);
    
    var estateUnitsPerEstateIds = await _asstContext.Estates
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(estate => new
      {
        estate.Id,
        EstateUnitIds = estate.EstateUnits.Select(estateUnit => estateUnit.Id)
      })
      .ToDictionaryAsync(estate => estate.Id, estate => estate.EstateUnitIds, cancellationToken);

    var utilityServicefaker = new UtilityServiceFaker 
    {
      SubjectsIds = subjectsIds,
      OrgUnitsIds = orgUnitsIds,
      EstateUnitsPerEstateIds = estateUnitsPerEstateIds.Select(pair => (pair.Key, pair.Value)),
      AccountingItemsIds = accountingItemsIds,
      UtilityTypes = utilityTypes
    };

    await FillEntitiesAsync(utilityServicefaker, entitiesToGenerateCount, cancellationToken);
  }

  private async Task FillReadingAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new ReadingFaker
    {
      UtilityServices = Context.UtilityServices.Local
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }
  
  private async Task FillCostChargeAsync(int entitiesToGenerateCount, CancellationToken cancellationToken)
  {
    var faker = new CostChargeFaker
    {
      UtilityServices = Context.UtilityServices.Local
    };

    await FillEntitiesAsync(faker, entitiesToGenerateCount, cancellationToken);
  }
}
