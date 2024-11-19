using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Plugin.Import.Common.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Common;

public partial class DefaultCommonDataImporter
{
  private async Task UpdateVATRates(CancellationToken cancellationToken)
  {
    var vatRates = await GetVATRates(cancellationToken);

    _logger.LogInformation("Received {vatRateCount} VAT Rates from upstream", vatRates.Count());

    var existingRates = await _vatRates
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.InternalCode,
        cancellationToken: cancellationToken);

    //Never delete, only add or update
    foreach(var toAdd in vatRates.Where(kvp => !existingRates.ContainsKey(kvp.Key)))
    {
      var newVR = new VATRate();
      newVR.SetDescription(toAdd.Value.Description);
      newVR.SetInternalCode(toAdd.Value.InternalCode);
      newVR.SetRatePercent((double)(toAdd.Value.RateFactor ?? 0.0M) * 100);
      newVR.SetType(toAdd.Value.Type switch {
        "A" => VATRateType.Rate,
        "E" => VATRateType.Exempt,
        _ => VATRateType.NonTaxable
      });

      await _vatRates.AddAsync(newVR, cancellationToken);
    }

    foreach(var toUpdate in existingRates.Where(kvp => vatRates.ContainsKey(kvp.Key)))
    {
      var source = vatRates[toUpdate.Key];

      toUpdate.Value.SetDescription(source.Description);
      toUpdate.Value.SetInternalCode(source.InternalCode);
      toUpdate.Value.SetRatePercent((double)(source.RateFactor ?? 0.0M) * 100);
      toUpdate.Value.SetType(source.Type switch {
        "A" => VATRateType.Rate,
        "E" => VATRateType.Exempt,
        _ => VATRateType.NonTaxable
      });

      await _vatRates.UpdateAsync(toUpdate.Value, cancellationToken);
    }
  }

  internal virtual async Task<Dictionary<string, VATRateDTO>> GetVATRates(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<VATRateDTO>(
      @"SELECT
          vr.[IdAliquotaIva] [Id],
          vr.[CodAliquotaIva] [InternalCode],
          vr.[TipoAliquotaIva] [Type],
          vr.[DescAliquotaIva] [Description],
          vr.[Aliquota] [RateFactor],
          COALESCE(vr.[DataAggiornamento], vr.[DataInserimento]) LastUpdated
        FROM dbo.[AliquotaIva] vr", cancellationToken))
      .GroupBy(vr => vr.InternalCode)
      .ToDictionary(grp => grp.Key, grp => grp.First());
  }
}
