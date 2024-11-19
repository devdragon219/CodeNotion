using Dapper;
using RealGimm.Core.Taxes;
using RealGimm.Plugin.Import.Asst.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Asst;

public partial class DefaultLateAsstDataImporter
{
  internal virtual async Task<Dictionary<string, AssetTaxCalculationDTO[]>>
    CadastralUnitTaxes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    //Get the list of correspondences of old cadastral units to the latest
    var ucIdData = (await dbConnection.QueryAsync<CadastralUnitDTO>(
      @"SELECT
          uct.[IdUCT] AS [Id],
          puct.[fk_UI_Id] AS [EstateUnitId],
          uct.[DataInserimento],
          uct.[DataAggiornamento]
      FROM [dbo].[UnitaCatTerreno] uct
        JOIN [dbo].[PatrimonioUCT] puct ON uct.[IdUCT] = puct.[fk_UCT_Id]

      UNION ALL

      SELECT
          ucu.[IdUCU] AS [Id],
          pucu.[fk_UI_Id] AS [EstateUnitId],
          ucu.[DataInserimento],
          ucu.[DataAggiornamento]
      FROM [dbo].[UnitaCatUrbano] ucu
        JOIN [dbo].[PatrimonioUCU] pucu ON ucu.[IdUCU] = pucu.[fk_UCU_Id]",
          cancellationToken
    ))
    .GroupBy(a => a.EstateUnitId)
    .Select(grp =>
    {
      var winner = grp
        .OrderByDescending(a => a.DataAggiornamento ?? a.DataInserimento ?? DateTime.MinValue).First();
      return new
      {
        Winner = winner.Id,
        Sources = grp.Select(u => u.Id).ToArray()
      };
    })
    .SelectMany(grp => grp.Sources.Select(s => new KeyValuePair<string, string>(s, grp.Winner)))
    .ToDictionary(
      kvp => kvp.Key,
      kvp => kvp.Value
    );

    //Get ICI and TASI payments
    var tasiPayments = (await dbConnection.QueryAsync<AssetTaxCalculationDTO>(
      @"SELECT
          [ID] [Id],
          COALESCE([fk_UCT_Id_UltimaVariazione], [fk_UCT_Id]) [CadastralUnitId],
          [AnnoFiscale] [Year],
          [ImpostaAnnua] [TotalAmount]
        FROM [TasiStoricoUCT]
          WHERE [ImpostaAnnua] IS NOT NULL
          
        UNION
        
        SELECT
          [ID] [Id],
          COALESCE([fk_UCU_Id_UltimaVariazione], [fk_UCU_Id]) [CadastralUnitId],
          [AnnoFiscale] [Year],
          [ImpostaAnnua] [TotalAmount]
        FROM [TasiStoricoUCU]
          WHERE [ImpostaAnnua] IS NOT NULL",
          cancellationToken
    ))
    .Where(tax => ucIdData.ContainsKey(tax.CadastralUnitId))
    .Select(tax => tax with {
      CadastralUnitId = ucIdData[tax.CadastralUnitId],
      TaxCalculatorId = DismissedTaxCalculators.ITA_TASI,
      TaxCalculatorName = DismissedTaxCalculators.Names[DismissedTaxCalculators.ITA_TASI]
    });

    var iciPayments = (await dbConnection.QueryAsync<AssetTaxCalculationDTO>(
      @"SELECT
          [ID] [Id],
          COALESCE([fk_UCT_Id_UltimaVariazione], [fk_UCT_Id]) [CadastralUnitId],
          [AnnoFiscale] [Year],
          [ImpostaAnnua] [TotalAmount]
        FROM [IciStoricoUCT]
          WHERE [ImpostaAnnua] IS NOT NULL
          
        UNION
        
        SELECT
          [ID] [Id],
          COALESCE([fk_UCU_Id_UltimaVariazione], [fk_UCU_Id]) [CadastralUnitId],
          [AnnoFiscale] [Year],
          [ImpostaAnnua] [TotalAmount]
        FROM [IciStoricoUCU]
          WHERE [ImpostaAnnua] IS NOT NULL",
          cancellationToken
    ))
    .Where(tax => ucIdData.ContainsKey(tax.CadastralUnitId))
    .Select(tax => tax with {
      CadastralUnitId = ucIdData[tax.CadastralUnitId],
      TaxCalculatorId = DismissedTaxCalculators.ITA_ICI,
      TaxCalculatorName = DismissedTaxCalculators.Names[DismissedTaxCalculators.ITA_ICI]
    });

    return iciPayments
      .Concat(tasiPayments)
      .GroupBy(tax => tax.CadastralUnitId)
      .ToDictionary(
        grp => grp.Key,
        grp => grp.ToArray()
      );
  }
}
