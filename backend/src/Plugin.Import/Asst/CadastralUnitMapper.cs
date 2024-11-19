using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate.Specifications;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public partial class CadastralUnitMapper
{
  public required ILogger<EstateUnitMapper> _logger { protected get; init; }
  public required IReadRepository<CadastralUnit> _cadastralUnitRepository { protected get; init; }
  public required IReadRepository<EstateUnit> _estateUnitRepository { protected get; init; }
  public required IRepository<EstateUsageType> _usageTypeRepository { protected get; init; }
  public required ICustomEstateEnumMapper _customEstateEnumMapper { protected get; init; }

  public async Task<CadastralUnit> MapCadastralUnit(CadastralUnitDTO source,
    int estateUnitId,
    EstateImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var parent = await _estateUnitRepository
      .AsQueryable(new GetByIdSpec<EstateUnit>(estateUnitId))
      .Include(eu => eu.Address)
      .FirstOrDefaultAsync(cancellationToken)
      ?? throw new InvalidOperationException("Cannot find parent EstateUnit with ID " + estateUnitId);

    var internalCode = parent.InternalCode + "C"
      + (source.Code ?? "1").PadLeft(3, '0');

    var localCU = await _cadastralUnitRepository
      .AsQueryable()
      .Include(cu => cu.EstateUnit)
      .Include(cu => cu.Address)
      .Include(cu => cu.Coordinates)
      .Include(cu => cu.Income)
      .Include(cu => cu.Inspection)
      .Include(cu => cu.Unavailabilities)
      .FirstOrDefaultAsync(cu => cu.EstateUnit!.Id == estateUnitId
        && cu.InternalCode == internalCode,
        cancellationToken)
      ?? new CadastralUnit();

    //Updates
    var cuAddress = localCU.Address;

    if (cuAddress is null)
    {
      cuAddress = new Address();
      localCU.SetAddress(cuAddress);
    }

    if (!string.IsNullOrEmpty(source.ComuneId)
          && workspace.CitiesCache.TryGetValue(source.ComuneId, out var mainCity)
          && !string.IsNullOrEmpty(source.ToponimoCatastale))
    {
      cuAddress.SetType(AddressType.Primary);

      cuAddress.SetCity(mainCity.Name, mainCity.Guid);
      cuAddress.SetCounty(mainCity.CountyName, mainCity.CountyGuid);
      cuAddress.SetCountry(mainCity.CountryISO, null);

      var (toponymy, numbering) = AddressMiner.MineData(source.ToponimoCatastale);

      cuAddress.SetToponymy(toponymy);
      cuAddress.SetNumbering(numbering);

      cuAddress.SetLocalPostCode(source.CAPComune);

      ImportDataConverter.FixStringLengths(cuAddress);
    }

    localCU.SetDates(
      (source.DataInizioValiditaCatastale ?? source.DataInizioGestione).ToDateOnly(),
      (source.DataFineValiditaCatastale ?? source.DataFineGestione).ToDateOnly());
    localCU.SetInternalCode(internalCode);
    if (source.DataVariazioniCatastali.HasValue)
    {
      localCU.SetLastRelevantChangeDate(
        source.DataVariazioniCatastali.Value.ToUniversalTime()
      );
    }
    else
    {
      localCU.SetLastRelevantChangeDate(null);
    }

    localCU.SetNotes(source.NotaCatastale,
      source.NotaFiscale,
      source.NotaProtocollo);
    localCU.SetType(
      await _customEstateEnumMapper.MapEstateUnitType(
        source.TipoPatrimonioId));

    var income = localCU.Income ?? new CadastralUnitIncome();

    if (source.IsLand)
    {
      if (!string.IsNullOrEmpty(source.DescQualita)
        && workspace.CadastralLandCategoriesByDescription
          .TryGetValue(source.DescQualita.ToLowerInvariant(), out var cadastralLandCategory))
      {
        income.SetCadastralLandCategory(cadastralLandCategory);
      }
      else
      {
        income.SetCategories(source.DescQualita, income.MicroCategory);
      }

      income.SetFarmAmount(source.RedditoAgrario);
      income.SetLandAmount(source.RedditoDominicale);
      income.SetMarketValue(source.ValoreVenale);
      income.SetMetricsAmounts(
        await _customEstateEnumMapper.MapIncomeMetric(source.TipoConsistenzaId),
        source.Consistenza,
        source.DicuiLocata,
        source.SuperficieCatastale);

      income.SetRegisteredSurface(source.SuperficieCatastale);

      income.SetType(source.TipoRendita.ParseAsRG2IncomeType());
    }
    else
    {
      if (!string.IsNullOrEmpty(source.CodCategoria)
              && workspace.CadastralCategoriesByCode
                .TryGetValue(source.CodCategoria, out var cadastralCategory))
      {
        income.SetCadastralCategory(cadastralCategory);
      }
      else
      {
        income.SetCategories(source.CodCategoria, income.MicroCategory);
      }

      income.SetMetricsAmounts(
        await _customEstateEnumMapper.MapIncomeMetric(source.TipoConsistenzaId),
        source.Consistenza,
        source.DicuiLocata,
        source.RenditaCatastale);

      income.SetRegisteredSurface(source.SuperficieCatastale);

      income.SetCategories(income.MacroCategory, source.Classe);

      income.SetType(source.TipoRendita.ParseAsRG2IncomeType());
    }

    localCU.SetIncome(income);

    var inspection = localCU.Inspection ?? new CadastralUnitInspection();

    inspection.SetDate(source.DataVisura.ToDateOnly());
    inspection.SetHeading(source.IntestazioneVisura);
    inspection.SetIsDirectRestriction(source.FlagVincoloDiretto);
    inspection.SetIsHistoricalEstate(source.FlagImmStorico || source.FlagIntStorico);
    inspection.SetMacroZone(source.ZonaCensuaria);
    inspection.SetMicroZone(source.Microzona);

    localCU.SetInspection(inspection);

    if (localCU.Id == 0)
    {
      //Do not update the estate unit if the unit is already in the database
      localCU.SetEstateUnit(parent);
    }

    if (source.FlagCessato)
    {
      localCU.MarkAsDeleted();
    }

    localCU.SetStatus(
      source.FlagCessato
        ? CadastralUnitStatus.Cancelled
        : CadastralUnitStatus.Existing);

    ImportDataConverter.FixStringLengths(localCU);

    return localCU;
  }
}
