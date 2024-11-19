using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.CustomCodeAggregate.Specification;
using RealGimm.Core.Common.OfficialActAggregate;
using RealGimm.Core.Common.OfficialActAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Plugin.Import.Asst;
using RealGimm.Plugin.Import.Common.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Common;

public partial class DefaultLateCommonDataImporter
{
  internal async Task UpdateOfficialActs(CancellationToken cancellationToken)
  {
    var allOfficialActsList = (await GetOfficialActs(cancellationToken))
      .ToDictionary(oa => oa.Id);

    _logger.LogInformation(
      "Received {OfficialActCount} official acts from upstream",
      allOfficialActsList.Count);

    var existingActs = await _officialActs
      .AsQueryable(new OfficialActIncludeAllSpec())
      .Where(oa => oa.ExternalCode != null)
      .GroupBy(oa => oa.ExternalCode!)
      .ToDictionaryAsync(
        grp => grp.Key,
        grp => grp.First(),
        cancellationToken: cancellationToken);

    var estateUnitInternalIds = await _codeRepository.AsQueryable(
        new CustomCodeTranscoding<EstateUnit>(
          DefaultAsstDataImporter.IMPORT_ASST_PROVIDER
        ))
        .ToDictionaryAsync(
          code => code.ExternalCode!,
          code => Convert.ToInt32(code.InternalCode),
          cancellationToken);

    //Official act to update/set in the EstateUnit
    var officialActsToUpdate = new Dictionary<int, OfficialAct>();

    //Never delete, only add or update
    foreach (var toAdd in allOfficialActsList
      .Where(kvp => !existingActs.ContainsKey(kvp.Key)
        && kvp.Value.EstateUnitId is not null)
      .Select(t => t.Value))
    {
      var newOfficialAct = new OfficialAct();

      newOfficialAct.SetExternalCode(toAdd.Id);

      if (!UpdateData(toAdd, newOfficialAct))
      {
        continue;
      }

      if (estateUnitInternalIds
        .TryGetValue(toAdd.EstateUnitId, out var estateUnitId))
      {
        newOfficialAct.SetEstateUnitData(estateUnitId);

        if (officialActsToUpdate.TryGetValue(estateUnitId, out var officialAct))
        {
          if (newOfficialAct.IssueDate.HasValue
            && officialAct.IssueDate.HasValue
            && officialAct.IssueDate.Value < newOfficialAct.IssueDate.Value)
          {
            officialActsToUpdate[estateUnitId] = newOfficialAct;
          }
        }
        else
        {
          officialActsToUpdate.Add(estateUnitId, newOfficialAct);
        }
      }

      await _officialActs.AddAsync(newOfficialAct, cancellationToken);
    }

    foreach (var toUpdate in existingActs.Where(kvp => allOfficialActsList
      .ContainsKey(kvp.Key)))
    {
      var src = allOfficialActsList[toUpdate.Key];
      var dest = toUpdate.Value;

      if (!UpdateData(src, dest))
      {
        continue;
      }

      if (estateUnitInternalIds
        .TryGetValue(src.EstateUnitId, out var estateUnitId))
      {
        dest.SetEstateUnitData(estateUnitId);

        if (officialActsToUpdate.TryGetValue(estateUnitId, out var officialAct))
        {
          if (dest.IssueDate.HasValue
            && officialAct.IssueDate.HasValue
            && officialAct.IssueDate.Value < dest.IssueDate.Value)
          {
            officialActsToUpdate[estateUnitId] = dest;
          }
        }
        else
        {
          officialActsToUpdate.Add(estateUnitId, dest);
        }
      }

      await _officialActs.UpdateAsync(dest, cancellationToken);
    }

    //Update all estates with the new official act
    foreach (var toUpdateBatch in officialActsToUpdate.Chunk(50))
    {
      var estateUnits = await _estateUnits
        .AsQueryable(new GetByIdsSpec<EstateUnit>(
          toUpdateBatch.Select(kvp => kvp.Key).ToArray()))
        .ToListAsync(cancellationToken);

      foreach (var eu in estateUnits)
      {
        eu.SetOfficialActId(officialActsToUpdate[eu.Id].Id);
      }

      await _estateUnits.UpdateRangeAsync(estateUnits, cancellationToken);
    }
  }

  private bool UpdateData(OfficialActDTO src, OfficialAct dest)
  {
    dest.SetIssueData(
       src.IssuerName,
       src.IssuerCode,
       null,
       src.IssueDate.ToDateOnly());

    if (!string.IsNullOrEmpty(src.ProtocolNumber))
    {
      dest.SetProtocolNumber(src.ProtocolNumber!);
    }
    else if (!string.IsNullOrEmpty(src.RepertoireNumber)
      || !string.IsNullOrEmpty(src.RegistrationNumber))
    {
      dest.SetProtocolNumber(
        string.Join("/", new string?[] {
              src.RegistrationNumber,
              src.RepertoireNumber,
              src.CollectionNumber
          }.Where(s => !string.IsNullOrEmpty(s))
        )
      );
    }

    dest.SetRegistrationData(
      src.RegistrationNumber,
      src.RegistrationDate.ToDateOnly());

    if (src.IssueDate.HasValue)
    {
      dest.AddActRegistrationDate(
        new ActRegistrationDate(
          RegistrationDateType.IT_NOTARY_ACT_DATE,
          src.IssueDate.Value.ToDateOnly())
      );
    }

    if (!string.IsNullOrEmpty(src.WrittenAtCity))
    {
      dest.AddActRegistrationField(
        new ActRegistrationField(
          RegistrationFieldType.IT_WRITTEN_AT_CITY,
          src.WrittenAtCity!)
      );
    }

    if (!string.IsNullOrEmpty(src.TranscriptNumber))
    {
      dest.AddActRegistrationField(
        new ActRegistrationField(
          RegistrationFieldType.IT_TRANSCRIPTION_NUMBER,
          src.TranscriptNumber)
      );
    }

    if (!string.IsNullOrEmpty(src.TranscriptCity))
    {
      dest.AddActRegistrationField(
        new ActRegistrationField(
          RegistrationFieldType.IT_TRANSCRIPTION_CITY,
          src.TranscriptCity)
      );
    }

    if (src.TranscriptDate.HasValue)
    {
      dest.AddActRegistrationDate(
        new ActRegistrationDate(
          RegistrationDateType.IT_TRANSCRIPTION_DATE,
          src.TranscriptDate.Value.ToDateOnly())
      );
    }

    if (!string.IsNullOrEmpty(src.CollectionNumber))
    {
      dest.AddActRegistrationField(
        new ActRegistrationField(
          RegistrationFieldType.IT_COLLECTION_NUMBER,
          src.CollectionNumber)
      );
    }

    if (!string.IsNullOrEmpty(src.RepertoireNumber))
    {
      dest.AddActRegistrationField(
        new ActRegistrationField(
          RegistrationFieldType.IT_REPERTOIRE_NUMBER,
          src.RepertoireNumber)
      );
    }

    if (string.IsNullOrEmpty(dest.ProtocolNumber))
    {
      _logger.LogWarning("Unable to update Official Act {ActId}", src.Id);
      return false;
    }

    return true;
  }

  internal virtual async Task<IEnumerable<OfficialActDTO>> GetOfficialActs(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return await dbConnection.QueryAsync<OfficialActDTO>(
      @"SELECT
            [IDAtto] AS [Id],
            [fk_IdUI] as [EstateUnitId],
            COALESCE([DataAggiornamento], [DataInserimento]) AS [CreationDate],
            [ProtocolloAttoNotarile] AS [ProtocolNumber],
            [NRegistrazione] AS [RegistrationNumber],
            [Notaio] AS [IssuerName],
            NULL AS [IssuerCode],
            NULL AS [IssuerExternalCode],
            [DataAttoNotarile] AS [IssueDate],
            [DataTrascrizione] AS [TranscriptDate],
            [DataRegistrazione] AS [RegistrationDate],
            [NRepertorio] AS [RepertoireNumber],
            [NRaccolta] AS [CollectionNumber],
            [NTrascrizione] AS [TranscriptNumber],
            [LuogoTrascrizione] AS [TranscriptCity],
            [LuogoRegistrazione] AS [WrittenAtCity]
        FROM [dbo].[AttiDiProvenienzaUI]
        WHERE [DataAttoNotarile] IS NOT NULL
          AND [Notaio] IS NOT NULL", cancellationToken);
  }
}
