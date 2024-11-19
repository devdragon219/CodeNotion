using Dapper;
using Microsoft.Extensions.Logging;
using RealGimm.Plugin.Import.Asst.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Asst;

public partial class DefaultAsstDataImporter
{
  internal virtual async Task<Dictionary<string, SimpleCodeDTO>> EstateBuildingTypes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<SimpleCodeDTO>(
      @"SELECT
          [IdTipoPatrimonio] [Id],
          [CodTipoPatrimonio] [Code],
          [DescTipoPatrimonio] [Description],
          [NaturaPatrimonio] [Category]
        FROM [TipoPatrimonio]",
          cancellationToken
    )).ToDictionary(k => k.Id);
  }

  internal virtual async Task<Dictionary<string, SimpleCodeDTO>> EstateOwnershipTypes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<SimpleCodeDTO>(
      @"SELECT
          [IdTipoPossesso] [Id],
          [CodTipoPossesso] [Code],
          [DescTipoPossesso] [Description]
        FROM [TipoPossesso]",
          cancellationToken
    )).ToDictionary(k => k.Id);
  }

  internal virtual async Task<Dictionary<string, string>> EstateUnitNotes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var notesRaw = await dbConnection.QueryAsync<(string Type, string UnitId, string Text)>(
      @"SELECT
          [fk_TipoNote_Id] [Type],
          [fk_UI_Id] [UnitId],
          [Note] [Text]
        FROM [NoteUI]",
          cancellationToken
    );

    return notesRaw
      .Where(nr => !string.IsNullOrWhiteSpace(nr.Text))
      .GroupBy(nr => nr.UnitId)
      .ToDictionary(
        grp => grp.Key,
        grp => string.Join(";\n\n", grp
          .OrderByDescending(nr => nr.Type)
          .Select(nr => nr.Text.Trim()))
      );
  }

  internal virtual async Task<Dictionary<string, FloorDTO>> AllFloors(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var floors = await dbConnection.QueryAsync<FloorDTO>(
      @"SELECT
          [IdPiano] [Id],
          [DescPiano] [Name],
          [NumeroPiano] * CASE WHEN [FlagFuoriTerra] = '1' THEN 1 ELSE -1 END [Ordering]
        FROM [PianoUI]",
          cancellationToken
    );

    return floors
      .ToDictionary(f => f.Id, f => f);
  }

  internal virtual async Task<Dictionary<string, FunctionAreaDTO>> AllFunctionAreas(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var funcAreas = await dbConnection.QueryAsync<FunctionAreaDTO>(
      @"SELECT
          [IdAreaFunzionaleUI] [Id],
          [DescAreaFunzionaleUI] [Name],
          [CodAreaFunzionaleUI] [Code]
        FROM [AreaFunzionaleUI]",
          cancellationToken
    );

    return funcAreas.ToDictionary(f => f.Id, f => f);
  }

  internal virtual async Task<Dictionary<string, string[]>> FloorsByEstate(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var floors = await dbConnection.QueryAsync<(string Id, string EstateId)>(
      @"WITH FloorIds AS (
            -- Floors linked directly through UnitaImmobiliare
            SELECT ui.[fk_Immobile_Id], ui.[Piano] AS [IdPiano]
            FROM [UnitaImmobiliare] ui
            WHERE ui.[Piano] IS NOT NULL

            UNION

            -- Floors linked indirectly through SuperficieUI
            SELECT ui.[fk_Immobile_Id], s.[fk_Piano_Id] AS [IdPiano]
            FROM [UnitaImmobiliare] ui
            JOIN [SuperficieUI] s ON s.[fk_UI_Id] = ui.[IdUI]
            WHERE s.[fk_Piano_Id] IS NOT NULL
        )
        SELECT DISTINCT
            f.[IdPiano] AS [Id],
            i.[CodImmobile] AS [EstateId]
        FROM FloorIds f
        JOIN [Immobile] i ON i.[IdImmobile] = f.[fk_Immobile_Id]
        JOIN [PianoUI] p ON p.[IdPiano] = f.[IdPiano]",
          cancellationToken
    );

    return floors
      .GroupBy(f => f.EstateId)
      .ToDictionary(f => f.Key, grp => grp.Select(f => f.Id).ToArray());
  }

  internal virtual async Task<Dictionary<string, StairDTO[]>> StairsByEstate(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var stairs = await dbConnection.QueryAsync<StairDTO>(
      @"SELECT
          s.[IdScala] [Id],
          s.[DescScala] [Name],
          i.[CodImmobile] [EstateId]
        FROM [Scala] s
          JOIN [Immobile] i
            ON i.[IdImmobile] = s.[fk_Immobile_Id]",
          cancellationToken
    );

    return stairs
      .Where(s => !string.IsNullOrEmpty(s.EstateId))
      .GroupBy(s => s.EstateId!)
      .ToDictionary(g => g.Key, g => g.ToArray());
  }

  internal virtual async Task<Dictionary<string, SimpleCodeDTO>> UsageMacroTypes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<SimpleCodeDTO>(
      @"SELECT
          [IdTipoDestinazioneMacro] [Id],
          [CodTipoDestinazioneMacro] [Code],
          [DescTipoDestinazioneMacro] [Description]
        FROM [TipoDestinazioneMacro]",
          cancellationToken
    )).ToDictionary(k => k.Id);
  }

  internal virtual async Task<Dictionary<string, EstateSubUnitDTO[]>> EstateSubUnitsByUnit(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<EstateSubUnitDTO>(
      @"SELECT
          s.[IdSubUI] [Id],
          s.[fk_UI_Id] [EstateUnitCode],
          td.[CodTipoDestinazione] [UsageTypeId],
          as2.[CodSoggetto] [OccupantSubjectId],
          s.[fk_UORG_Id] [OrgUnitId],
          s.[CodSubUI] [SubCode],
          s.[DescSubUI] [Name],
          s.[NoteSubUI] [Notes],
          s.[DataAggiornamento] [LastUpdated],
          CASE WHEN s.[FlagAreaComune] = '1' THEN 1 ELSE 0 END [IsCommonArea],
          CASE WHEN s.[FlagSfitto] = '1' THEN 1 ELSE 0 END [IsUnoccupied],
          s.[MQLordi] [GrossAreaSqM],
          s.[DataInizioSubUI] [StartDate],
          s.[DataFineSubUI] [EndDate]
        FROM [SubUI] s
          JOIN [AnagraficaSoggetto] as2
            ON s.[fk_AnagraficaSoggetto_Id] = as2.[IdAnagraficaSoggetto]
          LEFT OUTER JOIN [TipoDestinazione] td
            ON s.[fk_TipoDestinazione_Id] = td.[IdTipoDestinazione]",
          cancellationToken
    ))
    .GroupBy(eu => eu.EstateUnitCode!)
    .ToDictionary(grp => grp.Key, grp => grp.ToArray());
  }

  internal virtual async Task<Dictionary<string, SimpleCodeDTO>> UsageTypes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<SimpleCodeDTO>(
      @"SELECT
          [IdTipoDestinazione] [Id],
          [CodTipoDestinazione] [Code],
          [DescTipoDestinazione] [Description]
        FROM [TipoDestinazione]",
          cancellationToken
    )).ToDictionary(k => k.Id);
  }

  internal virtual async Task<Dictionary<string, IEnumerable<AddressDTO>>> EstateAddresses(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    //This DISTINCT operation will not completely remove all logical duplicates;
    // they will be filtered later.
    return (await dbConnection.QueryAsync<AddressDTO>(
      @"SELECT DISTINCT
          i.[CodImmobile] [EstateId],
          ui.[fk_Comune_Id] [CityId],
          ui.[CapUI] [PostCode],
          TRIM(ui.[IndirizzoUI]) [Toponymy]
          FROM [UnitaImmobiliare] ui
          JOIN [Immobile] i
            ON i.[IdImmobile] = ui.[fk_Immobile_Id]",
          cancellationToken
    ))
    .GroupBy(a => a.EstateId)
    .ToDictionary(grp => grp.Key, grp => grp.AsEnumerable());
  }

  internal virtual async Task<Dictionary<string, EstateUnitOriginActDTO>> EstateUnitOriginActs(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<EstateUnitOriginActDTO>(
      @"SELECT
          [IDAtto] [Id],
          [fk_IdUI] [EstateUnitId],
          [ProtocolloAttoNotarile] [ProtocolNumber],
          [DataAttoNotarile] [Date],
          [Notaio] [IssuerName],
          [NRepertorio] [RepertoireNumber],
          [NRaccolta] [BundleNumber],
          [NRegistrazione] [RegistrationNumber],
          [DataRegistrazione] [RegistrationDate],
          [LuogoRegistrazione] [RegistrationPlace],
          [NTrascrizione] [TrascriptionNumber],
          [DataTrascrizione] [TrascriptionDate],
          [LuogoTrascrizione] [TrascriptionPlace],
          COALESCE([DataAggiornamento], [DataInserimento]) [PreferenceDate]
        FROM [AttiDiProvenienzaUI]
          WHERE [ProtocolloAttoNotarile] IS NOT NULL
            AND [DataAttoNotarile] IS NOT NULL",
          cancellationToken
    ))
    .GroupBy(a => a.EstateUnitId)
    .ToDictionary(
      grp => grp.Key,
      grp => grp
      .OrderByDescending(a => a.PreferenceDate).First()
    );
  }


  internal virtual async Task<(
    IEnumerable<EstateDTO> Estates,
    Dictionary<string, string[]> Equivalences)> Estates(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var estateList = await dbConnection.QueryAsync<EstateDTO>(
      @"SELECT 
          i.[IdImmobile] [Id],
          i.[fk_Comune_Id] [CityId],
          i.[fk_TipoPatrimonio_Id] [EstateTypeId],
          i.[fk_TipoPossesso_Id] [OwnershipTypeId],
          i.[CodImmobile] [InternalCode],
          i.[DescImmobile] [Description],
          i.[CapImmobile] [PostCode],
          i.[DataInzioImmobile] [StartDate],
          i.[DataFineImmobile] [EndDate],
          i.[NoteImmobile] [EstateNotes],
          i.[StatoImmobile] [EstateStatusCode],
          CASE WHEN i.[FlagStatoRecord] = '1' THEN 1 ELSE 0 END [IsRecordFlag],
          i.[AnnoCostruzione] [BuildYear],
          i.[fk_TipoDestinazioneMacro_id] [UsageMacroTypeId],
          i.[fk_TipoDestinazione_id] [UsageTypeId],
          anag.[CodSoggetto] [ManagementOwnerCode],
          i.[IndirizzoImmobile] [Address],
          i.[Note] [Notes],
          i.[Latitudine] [Latitude],
          i.[Longitudine] [Longitude],
          CASE WHEN i.[FlagUtilizzato] = '1' THEN 1 ELSE 0 END [IsInUse],
          CASE WHEN i.[FlagInVendita] = '1' THEN 1 ELSE 0 END [IsForSale],
          CASE WHEN i.[FlagInBonifica] = '1' THEN 1 ELSE 0 END [IsFixing]
          FROM [Immobile] i
            JOIN [AnagraficaSoggetto] anag
              ON i.[fk_AnagraficaSoggetto_id] = anag.[IdAnagraficaSoggetto]",
        cancellationToken
    );

    _logger.LogInformation("Received {numEstates} raw estates from upstream",
      estateList.Count());

    var estateUnitCounts = (await dbConnection.QueryAsync<(string Key, long Value)>(
      @"SELECT
          i.[IdImmobile],
          COUNT(ui.[IdUI])
          FROM [Immobile] i
          LEFT OUTER JOIN [UnitaImmobiliare] ui 
            ON ui.[fk_Immobile_Id]  = i.[IdImmobile]
            GROUP BY i.[IdImmobile]",
          cancellationToken
    )).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

    var equivalences = new Dictionary<string, string[]>();

    //Try to group estates by code; if groups exist, only keep
    // an estate if all the others have zero estate units.
    //If all in a group have no estate units, keep the last (by id)
    estateList = estateList
      .GroupBy(e => e.InternalCode)
      .Select(grp =>
      {
        if (grp.Count() == 1)
        {
          equivalences.Add(grp.First().Id, [grp.First().Id]);
          return grp.First();
        }

        var candidates = grp
          .Where(e => estateUnitCounts.ContainsKey(e.Id)
            && estateUnitCounts[e.Id] > 0)
          .ToList();

        //If many estates have the same code and all have estate units,
        // take the first.
        var winner = grp.First();

        if (candidates.Count == 1)
        {
          winner = candidates.First();
        }

        if (candidates.Count == 0)
        {
          winner = grp.Last();
        }

        equivalences.Add(winner.Id, grp.Select(e => e.Id).ToArray());

        return winner;
      })
      .ToList();

    _logger.LogInformation("After data consolidation, {numEstates} estates remain",
      estateList.Count());

    return (estateList, equivalences);
  }

  internal virtual async Task<(
    IEnumerable<EstateUnitDTO> EstateUnits,
    Dictionary<string, string[]> ExternalIdEquivalences
    )> EstateUnits(
      Dictionary<string, string[]>? estateEquivalences,
    CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var estateUnitList = await dbConnection.QueryAsync<EstateUnitDTO>(
      @"SELECT 
          ui.[IdUI] [Id],
          i.[CodImmobile] [EstateCode],
          ui.[fk_Immobile_Id] [EstateSourceId],
          ui.[fk_TipoDestinazione_Id] [UsageTypeId],
          ui.[fk_TipoPossesso_Id] [OwnershipTypeId],
          ui.[fk_TipoPatrimonio_Id] [EstateTypeId],
          ui.[IndirizzoUI] [Address],
          COALESCE(ui.[fk_Comune_Id], i.[fk_Comune_Id]) [CityId],
          ui.[CodUI] [SubCode],
          ui.[DescUI] [Name],
          ui.[DataAggiornamento] [LastUpdated],
          ui.[DataInizioUI] [StartDate],
          ui.[DataFineUI] [EndDate],
          ui.[fk_Scala_Id] [StairId],
          ui.[Piano] [MainFloorId],
          CASE WHEN ui.[FlagAreaComune] = '1' THEN 1 ELSE 0 END [IsCommonArea],
          CASE WHEN ui.[StatoUI] = 'C' THEN 1 ELSE 0 END [IsClosed]
          FROM [UnitaImmobiliare] ui
            JOIN [Immobile] i
              ON ui.[fk_Immobile_Id] = i.[IdImmobile]",
        cancellationToken
    );

    var floorFromSurfaces = (await dbConnection.QueryAsync<SimpleCodeDTO>(
      @"SELECT DISTINCT
          s.[fk_UI_Id] AS [Id],
          s.[fk_Piano_Id] AS [Code]
        FROM [SuperficieUI] s
        WHERE s.[fk_Piano_Id] IS NOT NULL",
      cancellationToken))
      .GroupBy(sc => sc.Id)
      .ToDictionary(grp => grp.Key, grp => grp.Select(sc => sc.Code!).ToArray());

    _logger.LogInformation("Received {numEstateUnits} raw estate units from upstream",
      estateUnitList.Count());

    foreach (var estateUnit in estateUnitList
      .Where(eu => floorFromSurfaces.ContainsKey(eu.Id)))
    {
      estateUnit.FloorIds = floorFromSurfaces[estateUnit.Id]
        .Concat(estateUnit.MainFloorId is null ? [] : [estateUnit.MainFloorId])
        .Distinct()
        .ToArray();
    }

    //Keep only last estateUnit by last updated date. If many estateUnits
    // have the same last updated date, keep the first - most likely they come
    // from a rogue stored procedure.

    var estateUnitsAggregation = estateUnitList
      .GroupBy(eu => eu.EstateCode + "%" + eu.SubCode)
      .Select(grpByCode =>
      {
        var equivalences = new Dictionary<string, string[]>();

        if (grpByCode.Count() == 1)
        {
          equivalences.Add(grpByCode.First().Id, [grpByCode.First().Id]);

          return (grpByCode, equivalences);
        }

        //If the same unit is on multiple estates, keep the chain with the latest update.
        var groupByEstate = grpByCode.GroupBy(eu => eu.EstateSourceId!);

        if (groupByEstate.Count() == 1)
        {
          //Keep all the deleted ones, and only the
          // last updated non-deleted one.

          //Also, store equivalences for discarded codes
          //Remove duplicates that have the same enddate
          foreach (var euClosedGrp in grpByCode
            .Where(eu => eu.EndDate.HasValue)
            .GroupBy(eu => eu.EndDate))
          {
            var key = euClosedGrp.OrderBy(eu => eu.Id).First();

            //Each group maps to the first
            equivalences.Add(key.Id, [.. euClosedGrp.Select(eu => eu.Id)]);
          }

          var nonDeletedMaster = grpByCode
              .Where(eu => !eu.EndDate.HasValue)
              .OrderByDescending(eu => eu.LastUpdated)
              .FirstOrDefault();

          if (nonDeletedMaster is not null)
          {
            equivalences.Add(nonDeletedMaster.Id, grpByCode
              .Where(eu => !eu.EndDate.HasValue)
              .OrderByDescending(eu => eu.LastUpdated)
              .Select(eu => eu.Id)
              .ToArray());
          }

          var main = grpByCode
            .Where(eu => eu.EndDate.HasValue)
            .GroupBy(eu => eu.EndDate)
            .Select(grp => grp.OrderBy(eu => eu.Id).First())
            .Concat(nonDeletedMaster is null ? [] : [nonDeletedMaster]);

          return (main, equivalences);
        }
        else
        {
          //The same estate unit is on multiple estates
          if (estateEquivalences is null)
          {
            throw new InvalidOperationException(
              $"Found estate unit {grpByCode.Key} on many estates, but no equivalences were provided"
              );
          }

          //Get the only estate that has the equivalence key
          var winningEstateId = groupByEstate
            .Where(grp => estateEquivalences.ContainsKey(grp.Key))
            .FirstOrDefault()?.Key
            ?? throw new InvalidOperationException(
              $"Found estate unit {grpByCode.Key} on many estates, but no preferred estate was found"
            );

          //Take the still-alive estate unit if it exists on the winning estate,
          // otherwise take the last updated one.
          var winningEstateUnit = grpByCode
            .Where(eu => eu.EstateSourceId == winningEstateId
              && !eu.EndDate.HasValue)
            .OrderByDescending(eu => eu.LastUpdated)
            .FirstOrDefault();

          winningEstateUnit ??= grpByCode
              .Where(eu => eu.EndDate.HasValue)
              .OrderByDescending(eu => eu.LastUpdated)
              .First();

          //If the winning estate unit is closed,
          // map all estate units of all estates to it and exit
          if (winningEstateUnit.EndDate.HasValue)
          {
            equivalences.Add(
              winningEstateUnit.Id,
              grpByCode.Select(eu => eu.Id).ToArray()
            );

            return ([winningEstateUnit], equivalences);
          }

          //Then take all the closed estate units on the winning estate,
          // map each one to itself, and map all closed estate units from
          // the other estates to the first closed estate unit of the winning
          // estate.
          //Last, map all the open estate units on non-winning estates to
          // the winning estate unit.

          var closedUnitsOnWinningEstate = grpByCode
              .Where(eu => eu.EstateSourceId == winningEstateId
                && eu.Id != winningEstateUnit.Id
                && eu.EndDate.HasValue)
              .GroupBy(eu => eu.EndDate)
              .Select(grp => grp.OrderBy(eu => eu.Id).First())
              .OrderByDescending(eu => eu.LastUpdated)
              .ToList();

          //If there are no closed estate units on the winning estate, take the
          // first open estate unit on the winning estate.
          if (closedUnitsOnWinningEstate.Count == 0
            && winningEstateUnit is not null)
          {
            closedUnitsOnWinningEstate.Add(winningEstateUnit);
          }

          var firstClosedOnWinning = closedUnitsOnWinningEstate.FirstOrDefault();

          foreach (var eu in closedUnitsOnWinningEstate)
          {
            if (eu.Id == firstClosedOnWinning?.Id)
            {
              equivalences.Add(eu.Id,
                grpByCode.Where(eu2 => eu2.EstateSourceId != winningEstateId
                  && eu2.EndDate.HasValue)
                  .GroupBy(eu2 => eu2.EndDate)
                  .SelectMany(grp => grp.OrderBy(eu2 => eu2.Id).Skip(1))
                  .Select(eu2 => eu2.Id)
                  .Concat([eu.Id])
                  .Distinct()
                  .ToArray()
              );
            }
            else
            {
              equivalences.Add(eu.Id, [eu.Id]);
            }
          }

          if (winningEstateUnit is not null)
          {
            if (equivalences.TryGetValue(winningEstateUnit.Id, out var existingList))
            {
              //Keep all other estate units as equivalences
              var newList = existingList.Concat(grpByCode
                    .Where(eu => eu.EstateSourceId != winningEstateId)
                    .Select(eu => eu.Id)
                    .Concat([winningEstateUnit.Id]))
                    .Distinct();

              equivalences[winningEstateUnit.Id] =
              [
                ..newList
              ];
            }
            else
            {
              equivalences.Add(winningEstateUnit.Id,
                grpByCode
                  .Where(eu => eu.EstateSourceId != winningEstateId
                    && !eu.EndDate.HasValue)
                  .Select(eu => eu.Id)
                  .Concat([winningEstateUnit.Id])
                  .Distinct()
                  .ToArray());
            }
          }

          return (closedUnitsOnWinningEstate
            .Concat(winningEstateUnit is null ? [] : [winningEstateUnit])
            .Distinct(),
            equivalences);
        }
      })
      .ToList();

    estateUnitList = estateUnitsAggregation
      .SelectMany(kvp => kvp.Item1)
      .ToList();

    var equivalences = estateUnitsAggregation
      .SelectMany(kvp => kvp.Item2.ToArray())
      .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

    _logger.LogInformation("After data consolidation, {numEstateUnits} estate units remain",
      estateUnitList.Count());

    return (estateUnitList, equivalences);
  }

  internal virtual async Task<Dictionary<string, CadastralUnitDTO>> CadastralUnits(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<CadastralUnitDTO>(
      @"SELECT
          uct.[IdUCT] AS [Id],
          1 as [IsLand],
          puct.[fk_UI_Id] AS [EstateUnitId],
          uct.[CodUCT] AS [Code],
          uct.[fk_TipoPatrimonio_Id] AS [TipoPatrimonioId],
          uct.[fk_Comune_Id] AS [ComuneId],
          uct.[TipoRendita],
          CONCAT(tpo.[Descrizione], ' ', uct.[ToponimoCatastale]) AS [ToponimoCatastale],
          com.[CapGenericoComune] [CAPComune],
          uct.[DittaIscrCatasto],
          uct.[Partita],
          uct.[Sezione],
          uct.[Classe],
          uct.[Consistenza],
          uct.[Superficie],
          uct.[VoceBilancio],
          uct.[NumProtocollo],
          uct.[DataProtocollo],
          uct.[FlagConformeCatasto],
          uct.[DataInizioGestione],
          uct.[DataFineGestione],
          uct.[FlagBeneStrumentale],
          uct.[FlagDisposizione],
          uct.[InizioInagibilita],
          uct.[FineInagibilita],
          uct.[DataInserimento],
          uct.[DataAggiornamento],
          uct.[StatoUCT] AS [Stato],
          uct.[NotaProtocollo],
          uct.[NotaCatastale],
          uct.[NotaFiscale],
          CASE WHEN uct.[FlagCessato] = '1' THEN 1 ELSE 0 END AS [FlagCessato],
          uct.[AliquotaICI],
          uct.[TipoEsclusioneICI],
          uct.[DataVariazioniCatastali],
          uct.[DataVisura],
          uct.[OggettoVariazioniCatastali],
          uct.[IntestazioneVisura],
          uct.[TipoCatasto],
          uct.[DataVariazioneIMU],
          uct.[NotaVariazione],
          uct.[DicuiLocata],
          uct.[SuperficieCatastale],
          uct.[DiCuiLocataSC],
          uct.[DataInizioValiditaCatastale],
          uct.[DataFineValiditaCatastale],
          -- Fields specific to UnitaCatTerreno
          uct.[fk_TipoQualita_Id] AS [TipoQualitaId],
          tqa.[DescTipoQualita] AS [DescQualita],
          uct.[SupReale],
          uct.[RedditoAgrario],
          uct.[RedditoDominicale],
          uct.[ValoreVenale],
          uct.[DataValVenale],
          CASE WHEN uct.[FlagFabbricabile] = '1' THEN 1 ELSE 0 END AS [FlagFabbricabile],
          uct.[Deduzione],
          uct.[cod_sede_tecnica_CatT] AS [CodSedeTecnica],
          uct.[cod_equipment_CatT] AS [CodEquipment],
          -- Fields specific to UnitaCatUrbano (set to NULL)
          NULL AS [ZonaTerritoriale],
          NULL AS [ZonaCensuaria],
          NULL AS [Microzona],
          NULL AS [CategoriaCatastaleId],
          NULL AS [TipoConsistenzaId],
          NULL AS [MqNuovoCatasto],
          NULL AS [RenditaCatastale],
          NULL AS [RenditaRicalcolata],
          NULL AS [DataRicalcoloRendita],
          0 AS [FlagIntStorico],
          0 AS [FlagImmStorico],
          0 AS [FlagVincoloDiretto],
          0 AS [FlagRenditaMinima],
          NULL AS [CategoriaCatastaleId2],
          NULL AS [ClasseMinima],
          NULL AS [TipoRenditaMinima],
          NULL AS [ConsistenzaMinima],
          NULL AS [RenditaCatastaleMinima],
          0 AS [FlagRurale],
          0 AS [FlagParteComune],
          0 AS [FlagIciAmministratore],
          NULL AS [TipoConsistenzaUrbano],
          NULL AS [CodSedeTecnicaUrbano],
          NULL AS [CodEquipmentUrbano]
      FROM [dbo].[UnitaCatTerreno] uct
        JOIN [dbo].[PatrimonioUCT] puct ON uct.[IdUCT] = puct.[fk_UCT_Id]
        LEFT OUTER JOIN [dbo].[Toponomastica] tpo ON uct.[fk_Toponomastica_Id] = tpo.[IdToponomastica]
        LEFT OUTER JOIN [dbo].[Comune] com ON uct.[fk_Comune_Id] = com.[IdComune]
        LEFT OUTER JOIN [dbo].[TipoQualita] tqa ON uct.[fk_TipoQualita_Id] = tqa.[IdTipoQualita]

      UNION ALL

      SELECT
          ucu.[IdUCU] AS [Id],
          0 as [IsLand],
          pucu.[fk_UI_Id] AS [EstateUnitId],
          ucu.[CodUCU] AS [Code],
          ucu.[fk_TipoPatrimonio_Id] AS [TipoPatrimonioId],
          ucu.[fk_Comune_Id] AS [ComuneId],
          ucu.[TipoRendita],
          CONCAT(tpo.[Descrizione], ' ', ucu.[ToponimoCatastale]) AS [ToponimoCatastale],
          com.[CapGenericoComune] [CAPComune],
          ucu.[DittaIscrCatasto],
          ucu.[Partita],
          ucu.[Sezione],
          ucu.[Classe],
          ucu.[Consistenza],
          ucu.[Superficie],
          ucu.[VoceBilancio],
          ucu.[NumProtocollo],
          ucu.[DataProtocollo],
          ucu.[FlagConformeCatasto],
          ucu.[DataInizioGestione],
          ucu.[DataFineGestione],
          ucu.[FlagBeneStrumentale],
          ucu.[FlagDisposizione],
          ucu.[InizioInagibilita],
          ucu.[FineInagibilita],
          ucu.[DataInserimento],
          ucu.[DataAggiornamento],
          ucu.[StatoUCU] AS [Stato],
          ucu.[NotaProtocollo],
          ucu.[NotaCatastale],
          ucu.[NotaFiscale],
          CASE WHEN ucu.[FlagCessato] = '1' THEN 1 ELSE 0 END AS [FlagCessato],
          ucu.[AliquotaICI],
          ucu.[TipoEsclusioneICI],
          ucu.[DataVariazioniCatastali],
          ucu.[DataVisura],
          ucu.[OggettoVariazioniCatastali],
          ucu.[IntestazioneVisura],
          ucu.[TipoCatasto],
          ucu.[DataVariazioneIMU],
          ucu.[NotaVariazione],
          ucu.[DicuiLocata],
          ucu.[SuperficieCatastale],
          ucu.[DiCuiLocataSC],
          ucu.[DataInizioValiditaCatastale],
          ucu.[DataFineValiditaCatastale],
          -- Fields specific to UnitaCatTerreno (set to NULL)
          NULL AS [TipoQualitaId],
          NULL AS [SupReale],
          NULL AS [RedditoAgrario],
          NULL AS [RedditoDominicale],
          NULL AS [ValoreVenale],
          NULL AS [DataValVenale],
          0 AS [FlagFabbricabile],
          NULL AS [Deduzione],
          NULL AS [CodSedeTecnica],
          NULL AS [CodEquipment],
          -- Fields specific to UnitaCatUrbano
          ucu.[ZonaTerritoriale],
          ucu.[ZonaCensuaria],
          ucu.[Microzona],
          ucu.[fk_CategoriaCatastale_Id] AS [CategoriaCatastaleId],
          ccat.[CodCategoriaCatastale] AS [CodCategoria],
          ucu.[fk_TipoConsistenza_id] AS [TipoConsistenzaId],
          ucu.[MqNuovoCatasto],
          ucu.[RenditaCatastale],
          ucu.[RenditaRicalcolata],
          ucu.[DataRicalcoloRendita],
          CASE WHEN ucu.[FlagIntStorico] = '1' THEN 1 ELSE 0 END AS [FlagIntStorico],
          CASE WHEN ucu.[FlagImmStorico] = '1' THEN 1 ELSE 0 END AS [FlagImmStorico],
          CASE WHEN ucu.[FlagVincoloDiretto] = '1' THEN 1 ELSE 0 END AS [FlagVincoloDiretto],
          CASE WHEN ucu.[FlagRenditaMinima] = '1' THEN 1 ELSE 0 END AS [FlagRenditaMinima],
          ucu.[fk_CategoriaCatastale_Id2] AS [CategoriaCatastaleId2],
          ucu.[ClasseMinima],
          ucu.[TipoRenditaMinima],
          ucu.[ConsistenzaMinima],
          ucu.[RenditaCatastaleMinima],
          CASE WHEN ucu.[FlagRurale] = '1' THEN 1 ELSE 0 END AS [FlagRurale],
          CASE WHEN ucu.[FlagParteComune] = '1' THEN 1 ELSE 0 END AS [FlagParteComune],
          CASE WHEN ucu.[FlagIciAmministratore] = '1' THEN 1 ELSE 0 END AS [FlagIciAmministratore],
          ucu.[TipoConsistenza] AS [TipoConsistenzaUrbano],
          ucu.[cod_sede_tecnica_CatU] AS [CodSedeTecnicaUrbano],
          ucu.[cod_equipment_CatU] AS [CodEquipmentUrbano]
      FROM [dbo].[UnitaCatUrbano] ucu
        JOIN [dbo].[PatrimonioUCU] pucu ON ucu.[IdUCU] = pucu.[fk_UCU_Id]
        LEFT OUTER JOIN [dbo].[Toponomastica] tpo ON ucu.[fk_Toponomastica_Id] = tpo.[IdToponomastica]
        LEFT OUTER JOIN [dbo].[Comune] com ON ucu.[fk_Comune_Id] = com.[IdComune]
        LEFT OUTER JOIN [dbo].[CategoriaCatastale] ccat ON ucu.[fk_CategoriaCatastale_Id] = ccat.[IdCategoriaCatastale]",
          cancellationToken
    ))
    .GroupBy(a => a.EstateUnitId)
    .Select(grp =>
    {
      var winner = grp
        .OrderByDescending(a => a.DataAggiornamento ?? a.DataInserimento ?? DateTime.MinValue).First();

      winner.EquivalentCUIds = grp
        .Select(cu => cu.Id)
        .ToArray();

      return new
      {
        Key = grp.Key,
        Winner = winner
      };
    })
    .ToDictionary(
      grp => grp.Key,
      grp => grp.Winner
    );
  }


  internal virtual async Task<Dictionary<string, CadastralCoordinateDTO[]>> CadastralCoordinates(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<CadastralCoordinateDTO>(
      @"SELECT
          [IdRelazione] AS [Id],
          COALESCE([fk_UCT_Id], [fk_UCU_Id]) AS [CadastralUnitId],
          [Ordinamento] AS [Ordering],
          [Sezione] AS [ITA_Sezione],
          [Foglio] AS [ITA_Foglio],
          [Particella] AS [ITA_Particella],
          [SubAlterno] AS [ITA_Subalterno],
          [PartitaTavolare] AS [ITA_TavPartita],
          [CorpoTavolare] AS [ITA_TavCorpo],
          [PorzioneMateriale] AS [ITA_TavPorzione],
          CASE WHEN [FlagTavolare] = '1' THEN 1 ELSE 0 END AS [ITA_IsTavolare],
          [NoteIdentificativoCatastale] AS [Notes]
      FROM
          [dbo].[IdentificativoCatastale]",
          cancellationToken
    ))
    .GroupBy(a => a.CadastralUnitId)
    .ToDictionary(
      grp => grp.Key,
      //Sometimes the same coordinates appear multiple times for the same CU
      grp => grp
        .GroupBy(cc => new
        {
          cc.ITA_Foglio,
          cc.ITA_Particella,
          cc.ITA_Sezione,
          cc.ITA_Subalterno,
          cc.ITA_TavCorpo,
          cc.ITA_TavPartita,
          cc.ITA_TavPorzione
        })
        .Select(ccGrp => ccGrp
          .OrderBy(c => c.Ordering)
          .ThenBy(c => c.Id)
          .First())
      .ToArray()
    );
  }

  internal virtual async Task<Dictionary<string, EstateUnitSurfaceDTO[]>> EstateUnitSurfaces(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<EstateUnitSurfaceDTO>(
      @"SELECT
          tmis.[CodTipoMisura] [MeasurementUnitCode],
          ms.[ValoreMisura] [Value],
          sup.[fk_UI_Id] [EstateUnitId],
          afui.[CodAreaFunzionaleUI] [FunctionAreaCode],
          sup.[fk_Piano_Id] [FloorId]
        FROM dbo.[MisuraSuperficie] ms
          JOIN dbo.[TipoMisura] tmis ON ms.[fk_TipoMisura_Id] = tmis.[IdTipoMisura]
          JOIN dbo.[SuperficieUI] sup ON ms.[fk_Superficie_Id] = sup.[IdSuperficie]
          JOIN dbo.[AreaFunzionaleUI] afui ON sup.[fk_AreaFunzionaleUI_Id] = afui.[IdAreaFunzionaleUI]
        WHERE sup.[fk_UI_Id] IS NOT NULL
          AND ms.[ValoreMisura] IS NOT NULL
          AND tmis.[CodTipoMisura] IS NOT NULL",
          cancellationToken
    ))
    .GroupBy(a => a.EstateUnitId)
    .ToDictionary(
      grp => grp.Key,
      grp => grp.ToArray()
    );
  }
}
