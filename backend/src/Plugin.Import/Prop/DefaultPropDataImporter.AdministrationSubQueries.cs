using Dapper;
using RealGimm.Plugin.Import.Prop.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Prop;

public partial class DefaultPropDataImporter
{
  internal virtual async Task<IEnumerable<AdministrationDTO>> AdministrationsFull(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var administrations = await dbConnection.QueryAsync<AdministrationDTO>(
      @"SELECT
          adm.[IdAmministrazione] [Id],
          imm.[CodImmobile] [EstateId],
          ana.[CodSoggetto] [SubjectId],
          adm.[Riferimento] [Notes],
          adm.[fk_TipoAmministratore_Id] [AdministrationTypeId],
          adm.[fk_AliquotaIva_Id] [VatRateId],
          adm.[fk_Contatto_Id] [SubjectContactId],
          adm.[fk_Indirizzo_Id] [SubjectAddressId],
          CASE WHEN cc.[TipoCC] = 'CCB' THEN
          	CASE WHEN
          	  na.[SiglaStatoNazione]
          		+ cc.[CinEur]
          		+ cc. [Cin]
          		+ bb.[Abi]
          		+ ab.[Cab]
          		+ cc.[ContoCorrente] IS NULL
          	  THEN cc.[ContoCorrente]
              ELSE
          	    na.[SiglaStatoNazione]
          		  + cc.[CinEur]
          		  + cc. [Cin]
          		  + bb.[Abi]
          		  + ab.[Cab]
          		  + cc.[ContoCorrente]
          	  END
          	ELSE
          	  cc.[ContoCorrente]
          	END [SubjectBankAccountReference],
          adm.[DataInizioMandato] [StartDate],
          adm.[DataFineMandato] [EndDate],
          adm.[TipoPagamento] [PaymentTypeCode],
          CASE WHEN adm.[TipoFlusso] = 'Si' THEN 1 ELSE 0 END [IsAutomated],
          CASE WHEN adm.[FlagFatturare] = '1' THEN 1 ELSE 0 END [IsInvoiced],
          CASE WHEN adm.[FlagSospeso] = '1' THEN 1 ELSE 0 END [IsSuspended],
          adm.[CodiceSpese1] [ExpenseCode1],
          adm.[CodiceSpese2] [ExpenseCode2],
          adm.[CodiceSpese3] [ExpenseCode3]
        FROM [dbo].[Amministrazione] adm
          INNER JOIN [dbo].[Immobile] imm
            ON adm.[fk_Immobile_Id] = imm.[IdImmobile]
          INNER JOIN [dbo].[AnagraficaSoggetto] ana
            ON adm.[fk_AnagraficaSoggetto_Id] = ana.[IdAnagraficaSoggetto]
          INNER JOIN [dbo].[ContoCorrente] cc
            ON adm.[fk_ContoCorrente_Id] = cc.[IdContoCorrente]
              AND adm.[fk_AnagraficaSoggetto_Id] = cc.[fk_AnagraficaSoggetto_Id]
          JOIN [dbo].[AgenziaBancaria] ab
            ON cc.[fk_AgenziaBancaria_Id] = ab.[IdAgenziaBancaria]
          JOIN [dbo].[Banca] bb
            ON ab.[fk_Banca_Id] = bb.[IdBanca]
          JOIN [dbo].[Nazione] na
            ON bb.[fk_Nazione_Id] = na.[IdNazione]",
          cancellationToken
    );

    var terms = await dbConnection.QueryAsync<AdminTermDTO>(
      @"SELECT
          adt.[IdEsercizio] [Id],
          adt.[fk_Amministrazione_Id] [AdministrationId],
          adt.[fk_TipoEsercizio_Id] [TermTypeId],
          adt.[DescEsercizio] [Description],
          adt.[DataInizioEsercizio] [StartDate],
          adt.[DataFineEsercizio] [EndDate],
          adt.[fk_TipoMillesimo_Id] [SubdivisionTypeId],
          adt.[Imponibile] [Amount],
          adt.[Imposta] [TaxAmount],
          adt.[Conguaglio] [Adjustment],
          adt.[NoteDelibera] [Notes]
        FROM [dbo].[Esercizio] adt",
          cancellationToken
    );

    var payments = (await dbConnection.QueryAsync<AdminTermPaymentDTO>(
      @"SELECT
          adp.[Id] [Id],
          adp.[fk_Esercizio_Id] [AdminTermId],
          vf.[CodVoceFatturazione] [BillItemTypeId],
          adp.[fk_Mandato_Id] [BillId],
          adp.[NotaVoceEsercizio] [Notes],
          adp.[NumRata] [InstallmentIndex],
          adp.[DataScadenza] [ReferenceDate],
          adp.[InizioCompetenza] [StartDate],
          adp.[FineCompetenza] [EndDate],
          adp.[Imponibile] [Amount],
          adp.[Imposta] [TaxAmount],
          adp.[Importo] [Total],
          CASE WHEN adp.[FlagMandato] = '1' THEN 1 ELSE 0 END [IsBilled]
        FROM [dbo].[DettaglioEsercizio] adp
          JOIN [dbo].[VoceFatturazione] vf
            ON adp.[fk_VoceFatturazione_Id] = vf.[IdVoceFatturazione]",
          cancellationToken
    ))
    .Where(p => p.AdminTermId is not null)
    .GroupBy(p => p.AdminTermId!)
    .ToDictionary(grp => grp.Key, grp => grp.ToArray());

    //Fix up all payments to their term
    foreach(var term in terms.Where(t => payments.ContainsKey(t.Id)))
    {
      term.Payments = payments[term.Id];
    }

    var termsByAdmin = terms
      .Where(t => t.AdministrationId is not null)
      .GroupBy(t => t.AdministrationId!)
      .ToDictionary(grp => grp.Key, grp => grp.ToArray());

    //Fix up all terms to their administration
    foreach(var admin in administrations
      .Where(a => termsByAdmin.ContainsKey(a.Id)))
    {
      admin.Terms = termsByAdmin[admin.Id];
    }

    return administrations;
  }
}
