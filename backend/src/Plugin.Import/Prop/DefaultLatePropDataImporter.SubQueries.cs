using Dapper;
using RealGimm.Plugin.Import.Prop.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Prop;

public partial class DefaultLatePropDataImporter
{
  internal virtual async Task<IEnumerable<TakeoverDTO>> Takeovers(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var contractList = await dbConnection.QueryAsync<TakeoverDTO>(
      @"WITH subentro_ir AS (
          SELECT
            sir.[fk_anagraficaSoggetto_id] subentrato,
            sir.[dataSubentro] dataSubentro,
            ir.[fk_contratto_id] contratto,
            ir.[fk_anagraficaSoggetto_idLr] legaleRappresentante
          FROM dbo.[ImpostaRegistro] ir
            JOIN dbo.[SubentroImpReg] sir
              ON sir.[fk_ImpostaRegistro_Id] = ir.[IdImpostaRegistro]
        )
        SELECT s.[IdSubentro] [Id],
          s.[fk_Contratto_Id] [ContractId],
          sd.[fk_SoggettoSubentrato_Id] [LeavingSubjectId],
          s.[fk_SoggettoSubentrante_Id] [NewSubjectId],
          s.[DataSubentro] [ReferenceDate],
          s.[TipologiaSubentro] [TakeoverType],
          subentro_ir.[legaleRappresentante] [DeclaringSubjectId]
          FROM
            dbo.[Subentro] s
            LEFT OUTER JOIN dbo.[SubentroDettaglio] sd
              ON sd.[fk_Subentro_Id] = s.[IdSubentro]
            LEFT OUTER JOIN subentro_ir
              ON subentro_ir.[contratto] = s.[fk_Contratto_Id]
              AND subentro_ir.[dataSubentro] = s.[DataSubentro]
              AND subentro_ir.[subentrato] = sd.[fk_SoggettoSubentrato_Id]
          WHERE s.[fk_SoggettoSubentrante_Id] IS NOT NULL
            AND s.[fk_SoggettoSubentrato_Id] IS NOT NULL",
        cancellationToken
    );

    return contractList;
  }
}
