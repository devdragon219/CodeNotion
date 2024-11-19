using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Plugin.Import.Common.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Common;

public partial class DefaultCommonDataImporter
{
  private async Task UpdateBillItemTypes(CancellationToken cancellationToken)
  {
    var billItemTypes = await GetBillItemTypes(cancellationToken);

    _logger.LogInformation(
      "Received {itemTypeCount} bill item types from upstream",
      billItemTypes.Count);

    var existingTypes = await _billItemTypes
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.InternalCode,
        cancellationToken: cancellationToken);

    var existingAccountingItems = await _accountingItems
      .AsQueryable()
      .ToDictionaryAsync(
        vr => vr.InternalCode,
        cancellationToken: cancellationToken
      );

    //Vat rates
    var vrDict = await _vatRates
      .AsQueryable()
      .ToDictionaryAsync(
        vr => vr.InternalCode,
        cancellationToken
      );

    //Take a random non-taxed rate as a default
    var defaultVr = vrDict.FirstOrDefault(vr => vr.Value.RatePercent == 0);

    VATRate getRate(string? code) => (code is not null
      && vrDict.TryGetValue(code, out var value)) ? value : defaultVr.Value;


    //Never delete, only add or update
    foreach (var toAdd in billItemTypes.Where(kvp => !existingTypes.ContainsKey(kvp.Key)))
    {
      var src = toAdd.Value;

      var newBIT = new BillItemType();
      newBIT.SetData(src.Description ?? "-",
        src.IsForContractFee,
        src.IsForContractCosts,
        src.IsForAdministration,
        src.IsPositive,
        src.InternalCode == "VF50"
          || src.InternalCode == "VF51");
      newBIT.SetInternalCode(src.InternalCode);

      newBIT.SetVatRates(
        getRate(src.ActiveSubjectVR),
        getRate(src.ActiveExemptVR),
        getRate(src.ActiveNonTaxableVR),
        getRate(src.PassiveSubjectVR),
        getRate(src.PassiveExemptVR),
        getRate(src.PassiveNonTaxableVR),
        defaultVr.Value
      );

      //Try to find the best accounting item
      if (existingAccountingItems.Count != 0)
      {
        var defaultAI = existingAccountingItems.First().Value;

        newBIT.SetDefaultAccountingItem(
          src.IsPositive
            ? (existingAccountingItems.TryGetValue("REC001", out var receivablesAI)
              ? receivablesAI
              : defaultAI)
            : (existingAccountingItems.TryGetValue("PAY001", out var payablesAI)
              ? payablesAI
              : defaultAI)
        );
      }


      await _billItemTypes.AddAsync(newBIT, cancellationToken);
    }

    foreach (var toUpdate in existingTypes.Where(kvp => billItemTypes.ContainsKey(kvp.Key)))
    {
      var src = billItemTypes[toUpdate.Key];
      var dest = toUpdate.Value;

      dest.SetData(src.Description ?? "-",
        src.IsForContractFee,
        src.IsForContractCosts,
        src.IsForAdministration,
        src.IsPositive,
        src.InternalCode == "VF50"
          || src.InternalCode == "VF51");
      dest.SetInternalCode(src.InternalCode);

      dest.SetVatRates(
        getRate(src.ActiveSubjectVR),
        getRate(src.ActiveExemptVR),
        getRate(src.ActiveNonTaxableVR),
        getRate(src.PassiveSubjectVR),
        getRate(src.PassiveExemptVR),
        getRate(src.PassiveNonTaxableVR),
        defaultVr.Value
      );

      await _billItemTypes.UpdateAsync(dest, cancellationToken);
    }
  }

  internal virtual async Task<Dictionary<string, BillItemTypeDTO>> GetBillItemTypes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<BillItemTypeDTO>(
      @"SELECT
          vf.[IdVoceFatturazione] [Id],
          vf.[DescVoceFatturazione] [Description],
          vf.[CodVoceFatturazione] [InternalCode],
          CASE WHEN vf.[SegnoVoceFatturazione] <> '-' THEN 1 ELSE 0 END [IsPositive],
          CASE WHEN vf.[FlagContratto] = '1' THEN 1 ELSE 0 END [IsForContractCosts],
          CASE WHEN vf.[FlagAmministratore] = '1' THEN 1 ELSE 0 END [IsForAdministration],
          CASE WHEN vf.[Canone] = '1' THEN 1 ELSE 0 END [IsForContractFee],
          va1.[fk_AliquotaIva_Id] AS [ActiveSubjectVR],
          va2.[fk_AliquotaIva_Id] AS [ActiveNonTaxableVR],
          va3.[fk_AliquotaIva_Id] AS [ActiveExemptVR],
          va4.[fk_AliquotaIva_Id] AS [PassiveSubjectVR],
          va5.[fk_AliquotaIva_Id] AS [PassiveNonTaxableVR],
          va6.[fk_AliquotaIva_Id] AS [PassiveExemptVR]
        FROM VoceFatturazione vf 
        LEFT JOIN [VoceAliquota] va1 ON vf.[IdVoceFatturazione] = va1.[fk_VoceFatturazione_Id] AND va1.[AttivaPassiva] = 'A' AND va1.[TipoIva] = 'I1'
        LEFT JOIN [VoceAliquota] va2 ON vf.[IdVoceFatturazione] = va2.[fk_VoceFatturazione_Id] AND va2.[AttivaPassiva] = 'A' AND va2.[TipoIva] = 'I2'
        LEFT JOIN [VoceAliquota] va3 ON vf.[IdVoceFatturazione] = va3.[fk_VoceFatturazione_Id] AND va3.[AttivaPassiva] = 'A' AND va3.[TipoIva] = 'I3'
        LEFT JOIN [VoceAliquota] va4 ON vf.[IdVoceFatturazione] = va4.[fk_VoceFatturazione_Id] AND va4.[AttivaPassiva] = 'P' AND va4.[TipoIva] = 'I1'
        LEFT JOIN [VoceAliquota] va5 ON vf.[IdVoceFatturazione] = va5.[fk_VoceFatturazione_Id] AND va5.[AttivaPassiva] = 'P' AND va5.[TipoIva] = 'I2'
        LEFT JOIN [VoceAliquota] va6 ON vf.[IdVoceFatturazione] = va6.[fk_VoceFatturazione_Id] AND va6.[AttivaPassiva] = 'P' AND va6.[TipoIva] = 'I3'
      ", cancellationToken))
      .GroupBy(vr => vr.InternalCode)
      .ToDictionary(grp => grp.Key, grp => grp.First());
  }
}
