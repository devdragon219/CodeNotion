using Dapper;
using Microsoft.EntityFrameworkCore;
using RealGimm.Plugin.Import.Prop.Models;
using System.Data.SqlClient;

namespace RealGimm.Plugin.Import.Prop;

public partial class DefaultPropDataImporter
{
  internal virtual async Task<IEnumerable<ContractDTO>> Contracts(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var contractList = await dbConnection.QueryAsync<ContractDTO>(
      @"SELECT 
          c.[IdContratto] [Id],
          as2.CodSoggetto [ManagementSubjectId],
          c.[fk_TipoUso_Id] [UsageTypeId],
          CONCAT(ct.[TipologiaGestionale], '-', ct.[CodTipoContratto]) [ContractTypeId],
          c.[fk_Immobile_Id] [EstateId],
          c.[CodContratto] [InternalCode],
          CASE WHEN c.[FlagContratto] = '1' THEN 1 ELSE 0 END [Type],
          c.[CodContrattoOld] [OldContractReference],
          c.[DataStipula] [SigningDate],
          c.[DataDecorrenza] [StartDate],
          c.[DataVigenza] [EffectivenessDate],
          CASE WHEN c.[FlagSospeso] = '1' THEN 1 ELSE 0 END [IsSuspended],
          CASE WHEN c.[FlagSolare] = '1' THEN 1 ELSE 0 END [IsSolarAligned],
          c.[MesiDurata1] [DurationMonths1],
          c.[MesiDurata2] [DurationMonths2],
          c.[DataScadenza1] [ExpirationDate1],
          c.[DataScadenza2] [ExpirationDate2],
          c.[MesiRecesso] [NoticeMonths],
          c.[DataInizioPreavviso] [NoticeStartDate],
          c.[DataFinePreavviso] [NoticeEndDate],
          c.[DataInizioBollettazione] [BillingStartDate],
          c.[MesiDisdetta] [CancellationMonths],
          c.[DataDisdetta] [CancellationDate],
          c.[DataRiconsegna] [ReturnDate],
          c.[CanoneAnnuale] [AnnualFee],
          c.[CanoneIniziale] [InitialFee],
          c.[fk_TipoRilascio_Id] [ReleaseTypeId],
          c.[Periodicita] [BillingPeriodMonths],
          c.[TipoIva] [VatTypeId],
          c.[DataCompetenzaFatt] [InvoiceCompetenceDate],
          CASE WHEN c.[FlagPosticipato] = '1' THEN 1 ELSE 0 END [IsPostponed],
          CASE WHEN c.[FlagOccupNoTitolo] = '1' THEN 1 ELSE 0 END [IsNoTitleOccupancy],
          CASE WHEN c.[FlagBollo] = '1' THEN 1 ELSE 0 END [IsStampDuty],
          CASE WHEN c.[FlagFatturare] = '1' THEN 1 ELSE 0 END [IsToBeInvoiced],
          CASE WHEN c.[FlagRecuperoArr] = '1' THEN 1 ELSE 0 END [IsRecoveryOldAmounts],
          vf.[CodVoceFatturazione] [BillingItemId],
          c.[GiornoValuta] [ValueDateDay],
          CASE WHEN c.[FlagIstatSoggetto] = '1' THEN 1 ELSE 0 END [IsRevaluationEnabled],
          CASE WHEN c.[FlagAssoluto] = '1' THEN 1 ELSE 0 END [IsRevaluationAbsolute],
          CASE WHEN c.[FlagStampaLettera] = '1' THEN 1 ELSE 0 END [IsPrintLetter],
          c.[MesiApplicazione] [RevaluationApplicationMonths],
          c.[MesiPeriodicita] [RevaluationPeriodMonths],
          c.[DataInizioIstat] [RevaluationStartDate],
          c.[DataFineIStat] [RevaluationEndDate],
          c.[PercIstat] [RevaluationFactor],
          CASE WHEN c.[FlagNostroCaricoIstat] = '1' THEN 1 ELSE 0 END [IsRevaluationCalculated],
          c.[CanoneRiferimento] [BaseAmountFeeReferenceId],
          c.[CanoneBase] [BaseAmountFee],
          c.[DataProssRivalutazione] [NextRevaluationDate],
          CASE WHEN c.[FlagImpostaReg] = '1' THEN 1 ELSE 0 END [IsRegistrationTax],
          CASE WHEN c.[FlagRLI] = '1' THEN 1 ELSE 0 END [IsRLI],
          c.[Serie] [RLISeries],
          c.[Sub] [RLISub],
          c.[Numero] [RLINumber],
          c.[DataPrimaRegistrazione] [FirstRegistrationDate],
          c.[fk_Comune_Id] [RLICityId],
          c.[CodiceIdentificativoContratto] [RLIContractIdentificationCode],
          c.[fk_RLITipologiaContratto_id] [RliContractTypeForeignKey],
          c.[AnnoUltimaReg] [RLILastRegistrationYear],
          c.[DataPagamentoReg] [RLIRegistrationPaymentDate],
          c.[CodUfficioReg] [RLIRegistrationOfficeCode],
          c.[PercCanoneReg] [RLIRentFactor],
          c.[AnniApplicare] [RLIYearsToApply],
          CASE WHEN c.[FlagNostroCaricoReg] = '1' THEN 1 ELSE 0 END [IsOurChargeRegistration],
          c.[PercCaricoInqui] [RLITenantChargeFactor],
          c.[TipoVersamento] [RLIPaymentType],
          CASE WHEN c.[FlagTelematico] = '1' THEN 1 ELSE 0 END [IsRLITelematic],
          c.[DataUltimoPagTele] [RLILastTelePaymentDate],
          c.[DataPrimaRegTele] [FirstTeleRegistrationDate],
          c.[PagineContratto] [ContractPages],
          c.[NumCopie] [CopiesNumber],
          c.[ImportoBollo] [StampDutyAmount],
          c.[PercBolloCaricoInqui] [StampDutyTenantChargeFactor],
          CASE WHEN c.[FlagIvaRLI] = '1' THEN 1 ELSE 0 END [IsVatRli],
          CASE WHEN c.[FlagEsenzione] = '1' THEN 1 ELSE 0 END [IsExemptionFlag],
          CASE WHEN c.[FlagCauzione] = '1' THEN 1 ELSE 0 END [IsDeposit],
          c.[DataRestituzioneCauz] [DepositReturnDate],
          c.[NoteCauzione] [DepositNotes],
          c.[DataInizioInteressi] [InterestStartDate],
          c.[DataFineInteressi] [InterestEndDate],
          c.[TassoInteresse] [InterestRate],
          CASE WHEN c.[FlagInteresseLegale] = '1' THEN 1 ELSE 0 END [IsLegalInterest],
          c.[TotInteressiCauz] [TotalDepositInterests],
          c.[TipoLiquidazione] [LiquidationType],
          c.[DataInteresse] [InterestDate],
          c.[DataLiquidazione] [LiquidationDate],
          CASE WHEN c.[FlagTassoPenale] = '1' THEN 1 ELSE 0 END [IsPenalRate],
          c.[TassoLegale] [LegalRate],
          c.[TassoLibero] [FreeRate],
          c.[TassoUS] [UsRate],
          c.[TipoMorosita] [LatePaymentType],
          CASE WHEN c.[FlagRitRilascio] = '1' THEN 1 ELSE 0 END [IsReturnDelayPenalty],
          c.[TassoRitRilascio] [ReturnDelayRate],
          c.[ImportoUnitario] [UnitPrice],
          c.[TipoCoeffImportoUnitario] [UnitPriceCoefficientType],
          c.[NoteContratto] [Notes],
          c.[DataAggiornamento] [UpdateDate],
          CASE WHEN c.[FlagCessato] = '1' THEN 1 ELSE 0 END [IsTerminated],
          CASE WHEN c.[FlagStrumentale] = '1' THEN 1 ELSE 0 END [IsInstrumental],
          CASE WHEN c.[FlagImpostaRegBers] = '1' THEN 1 ELSE 0 END [IsRegistrationTaxBers],
          c.[DataProssRivalutazioneAlt] [AltNextRevaluationDate],
          CASE WHEN c.[FlagArretratoIstatAlt] = '1' THEN 1 ELSE 0 END [IsAltIstatArrear],
          c.[DeliberaSpesa] [SpendingResolution],
          c.[DataDeliberaSpesa] [SpendingResolutionDate],
          c.[DeliberaCanone] [FeeResolution],
          c.[DataDeliberaCanone] [FeeResolutionDate],
          c.[fk_TipoSmistamento_Id] [SortingTypeId],
          c.[NotaFattura] [InvoiceNote],
          CASE WHEN c.[FlagNotaFattura] = '1' THEN 1 ELSE 0 END [IsInvoiceNote],
          CASE WHEN c.[FlagF23Manuale] = '1' THEN 1 ELSE 0 END [IsManualF23],
          c.[CorrispettivoCessione] [AssignmentConsideration],
          c.[fk_TipoOggettoLocazione_ID] [LeasingObjectTypeId],
          c.[DataPrimaScadenza] [FirstExpirationDate],
          c.[DisdettatoDa] [CancellationBy],
          CASE WHEN c.[FlagNonRinnovabile] = '1' THEN 1 ELSE 0 END [IsNonRenewable],
          c.[fk_TermineLiquidazione_Id] [SettlementTermId],
          c.[FilialeDaAccreditare] [BranchToBeCredited],
          c.[CodiceLocazione] [LeasingCode],
          c.[CodiceSpese] [ExpenseCode],
          c.[CodiceRaggruppamento] [GroupingCode],
          c.[CodRGControparte] [CounterpartGroupCode],
          c.[FlagSplitPayment] [IsSplitPayment],
          c.[EnableSplitPayment] [IsEnableSplitPayment],
          c.[FlagClausolaPenaleVolontaria] [IsVoluntaryPenaltyClause],
          c.[fk_aliquotaIVA_Id] [VatRateId]
          FROM [Contratto] c
            JOIN [TipoContratto] ct ON ct.[IdTipoContratto] = c.[fk_TipoContratto_Id]
            JOIN [EnteRelazione] er ON er.[fk_Contratto_Id] = c.[IdContratto]
            JOIN [VoceFatturazione] vf ON vf.[IdVoceFatturazione] = c.[fk_VoceFatturazione_Id]
            JOIN [AnagraficaSoggetto] as2 ON as2.[IdAnagraficaSoggetto] = er.[fk_AnagraficaSoggetto_Id1]",
        cancellationToken
    );

    return contractList;
  }

  internal virtual async Task<Dictionary<string, ContractTypeDTO>> ContractTypes(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var dictionary = (await dbConnection.QueryAsync<ContractTypeDTO>(
      @"SELECT
          tc.[IdTipoContratto] [Id],
          tc.[DescTipoContratto] [Description],
          CONCAT(tc.[TipologiaGestionale], '-', tc.[CodTipoContratto]) [InternalCode],
          CASE WHEN tg.[GruppoFunzionale] = 'ATS' THEN 1 ELSE 0 END [IsActive],
          CASE WHEN tc.[Locazione] = '1' THEN 1 ELSE 0 END [IsRentChargeApplicable]
          FROM [TipoContratto] tc
          JOIN [TipoGestionale] tg
            ON tc.[TipologiaGestionale] = tg.[CodTipoGestionale]",
          cancellationToken
    )).ToDictionary(k => k.InternalCode!);

    var mostCommonUsageTypes = (await dbConnection.QueryAsync<(string InternalCode, string usageType)>(
      @"WITH C_Ref_Counts AS (
          SELECT
            CONCAT(tc.[TipologiaGestionale], '-', tc.[CodTipoContratto]) [InternalCode],
            c.[fk_TipoUso_Id],
            COUNT(*) AS CountC,
            ROW_NUMBER() OVER(PARTITION BY CONCAT(tc.[TipologiaGestionale], '-', tc.[CodTipoContratto]) ORDER BY COUNT(*) DESC) AS Rank
          FROM [Contratto] c
            JOIN [TipoContratto] tc ON c.[fk_TipoContratto_Id] = tc.[IdTipoContratto]
            WHERE c.[fk_TipoUso_Id] IS NOT NULL
              AND c.[fk_TipoContratto_Id] IS NOT NULL
          GROUP BY CONCAT(tc.[TipologiaGestionale], '-', tc.[CodTipoContratto]), c.[fk_TipoUso_Id]
        )
        SELECT
          [InternalCode],
          [fk_TipoUso_Id] [usageType]
        FROM C_Ref_Counts
        WHERE Rank = 1",
          cancellationToken
    )).ToDictionary(k => k.InternalCode);

    var estateUsageTypes = await _usageTypesRepository
      .AsQueryable()
      .ToDictionaryAsync(ut => ut.InternalCode, ut => ut.Id, cancellationToken);

    foreach (var kvp in dictionary)
    {
      var usageType = mostCommonUsageTypes.ContainsKey(kvp.Key)
        ? mostCommonUsageTypes[kvp.Key].usageType
        : estateUsageTypes.First().Key;

      if (estateUsageTypes.ContainsKey(usageType))
      {
        kvp.Value.UsageTypeId = estateUsageTypes[usageType];
      }
      else
      {
        kvp.Value.UsageTypeId = estateUsageTypes.First().Value;
      }
    }

    return dictionary;
  }

  internal virtual async Task<Dictionary<string, CounterpartDTO[]>> CounterpartsByContract(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<CounterpartDTO>(
      @"  SELECT
            l.[IdLocatario] [Id],
            c.[CodContratto] [ContractInternalCode],
            as2.[CodSoggetto] [CounterpartId],
            l.[DataInizioLocatario] [StartDate],
            l.[DataFineLocatario] [EndDate],
            l.[PercentualeCanone] [RateFactor],
            CASE WHEN l.[FlagTitolare] = '1' THEN 1 ELSE 0 END [IsMainCounterpart],
            0 [IsLandlord],
            CASE WHEN [FlagIVA] = '1' THEN 1 ELSE 0 END [IsVATAdded],
            l.[fk_TipologiaConduttore_ID] [TenancyTypeCode]
          FROM [Locatario] l
            INNER JOIN [Contratto] c
              ON l.[fk_Contratto_Id] = c.[IdContratto]
            INNER JOIN [AnagraficaSoggetto] as2
              ON as2.[IdAnagraficaSoggetto] = l.[fk_AnagraficaSoggetto_Id]
          UNION
          SELECT
            l2.[IdLocatore] [Id],
            c2.[CodContratto] [ContractInternalCode],
            as3.[CodSoggetto] [CounterpartId],
            l2.[DataInizioLocatore] [StartDate],
            l2.[DataFineLocatore] [EndDate],
            l2.[PercentualeCanone] [RateFactor],
            CASE WHEN l2.[FlagTitolare] = '1' THEN 1 ELSE 0 END [IsMainCounterpart],
            1 [IsLandlord],
            CASE WHEN [FlagIVA] = '1' THEN 1 ELSE 0 END [IsVATAdded],
            NULL [TenancyTypeCode]
          FROM [Locatore] l2
            INNER JOIN [Contratto] c2
              ON l2.[fk_Contratto_Id] = c2.[IdContratto]
            INNER JOIN [AnagraficaSoggetto] as3
              ON as3.[IdAnagraficaSoggetto] = l2.[fk_AnagraficaSoggetto_Id]",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractInternalCode!)
    .ToDictionary(grp => grp.Key, grp => grp
      .GroupBy(cp => cp.CounterpartId)
      .Select(g => g.First())
      .ToArray());
  }

  internal virtual async Task<Dictionary<string, LocatedUnitDTO[]>> LocatedUnitsByContract(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<LocatedUnitDTO>(
      @"SELECT
          s.[Id] [Id],
          c.[CodContratto] [ContractId],
          s.[fk_SubUI_Id] [EstateSubUnitId],
          s.[fk_UnitaImmobiliare_Id] [EstateUnitId],
          CASE WHEN s.[FlagUnitaPrincipale] = '1' THEN 1 ELSE 0 END [IsMainUnit],
          CASE WHEN s.[Parte] = 'P' THEN 1 ELSE 0 END [IsPartiallyLocated],
          CASE WHEN s.[FlagCDC] = '1' THEN 1 ELSE 0 END [IsRegistryUpdated],
          s.[MQLocazione] [SurfaceSqM]
        FROM [ContrattoPatrimonio] s
          INNER JOIN [Contratto] c
            ON s.[fk_Contratto_Id] = c.[IdContratto]",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractId)
    .ToDictionary(grp => grp.Key, grp => grp
      .GroupBy(cp => cp.EstateSubUnitId)
      .Select(g => g.First())
      .ToArray());
  }

  internal virtual async Task<Dictionary<string, TransactorDTO[]>> TransactorsByContract(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<TransactorDTO>(
      @"  SELECT
              f.[Id] [Id],
              c.[CodContratto] [ContractInternalCode],
              as2.[CodSoggetto] [TransactorId],
              f.[fk_IndirizzoSoggetto_Id] [TransactorAddressId],
              is2.[fk_TipoIndirizzo_Id] [TransactorAddressType],
              city.[DescComune] [TransactorAddressCityName],
              is2.[IndirizzoIS] [TransactorAddressToponymy],
              is2.[CapIS] [TransactorAddressPostCode],
              f.[DataInizioFatturazione] [StartDate],
              f.[DataFineFatturazione] [EndDate],
              f.[PercentualeCanone] [RateFactor],
              f.[TipoPagamento] [PaymentTypeCode]
            FROM [Fatturazione] f
              INNER JOIN [Contratto] c
                ON f.[fk_Contratto_Id] = c.[IdContratto]
              INNER JOIN [AnagraficaSoggetto] as2
                ON as2.[IdAnagraficaSoggetto] = f.[fk_AnagraficaSoggetto_Id]
              INNER JOIN [IndirizzoSoggetto] is2
                ON is2.[IdIndirizzoSoggetto] = f.[fk_IndirizzoSoggetto_Id]
              INNER JOIN [Comune] city
                ON is2.[fk_Comune_Id] = city.[IdComune]
          UNION
          SELECT
              b.[Id] [Id],
              c2.[CodContratto] [ContractInternalCode],
              as3.[CodSoggetto] [TransactorId],
              b.[fk_IndirizzoSoggetto_Id] [TransactorAddressId],
              is3.[fk_TipoIndirizzo_Id] [TransactorAddressType],
              city.[DescComune] [TransactorAddressCityName],
              is3.[IndirizzoIS] [TransactorAddressToponymy],
              is3.[CapIS] [TransactorAddressPostCode],
              b.[DataInizioBeneficiario] [StartDate],
              b.[DataFineBeneficiario] [EndDate],
              b.[PercentualeCanone] [RateFactor],
              b.[TipoPagamento] [PaymentTypeCode]
            FROM [Beneficiario] b
              INNER JOIN [Contratto] c2
                ON b.[fk_Contratto_Id] = c2.[IdContratto]
              INNER JOIN [AnagraficaSoggetto] as3
                ON as3.[IdAnagraficaSoggetto] = b.[fk_AnagraficaSoggetto_Id]
              INNER JOIN [IndirizzoSoggetto] is3
                ON is3.[IdIndirizzoSoggetto] = b.[fk_IndirizzoSoggetto_Id]
              INNER JOIN [Comune] city
                ON is3.[fk_Comune_Id] = city.[IdComune]",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractInternalCode!)
    .ToDictionary(grp => grp.Key, grp => grp
      .GroupBy(cp => cp.TransactorId)
      .Select(g => g.First())
      .ToArray());
  }


  internal virtual async Task<Dictionary<string, RecurringCostDTO[]>> RecurringCostsByContract(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<RecurringCostDTO>(
      @"SELECT
          avc.[IdAltraVoceContratto] [Id],
          c.[CodContratto] [ContractId],
          vf.[CodVoceFatturazione] [BillingItemId],
          ai.[CodAliquotaIVA] [VatRateId],
          avc.[Importo] [Amount],
          avc.[MeseInizioSospensione] [ExcludeStartMonth],
          avc.[MeseFineSospensione] [ExcludeEndMonth]
        FROM [AltraVoceContratto] avc
          INNER JOIN [Contratto] c
            ON avc.[fk_Contratto_Id] = c.[IdContratto]
          INNER JOIN [VoceFatturazione] vf
            ON vf.[IdVoceFatturazione] = avc.[fk_VoceFatturazione_Id]
          INNER JOIN [AliquotaIVA] ai
            ON ai.[IdAliquotaIVA] = avc.[fk_AliquotaIva_Id]",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractId)
    .ToDictionary(grp => grp.Key, grp => grp.ToArray());
  }

  internal virtual async Task<Dictionary<string, OneshotCostDTO[]>> OneshotCostsByContract(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<OneshotCostDTO>(
      @"SELECT
          ad.[IdAddebitoDiretto] [Id],
          c.[CodContratto] [ContractId],
          vf.[CodVoceFatturazione] [BillingItemId],
          ai.[CodAliquotaIVA] [VatRateId],
          ad.[ImportoAddebitoDiretto] [Amount],
          ad.[DataInizioAddebitoDiretto] [StartDate],
          ad.[DataFineAddebitoDiretto] [EndDate],
          ad.[DataDecorrenzaAddebitoDiretto] [EffectStartDate],
          ad.[NotaAddebitoDiretto] [Notes],
          ad.[NumeroRateEmissione] [Installments],
          ad.[NumeroRateFatturare] [InstallmentsToBill],
          ad.[DataUltimaFatturazione] [LastBillingDate],
          ad.[ImportoFatturato] [BilledAmount],
          ad.[fk_ImpostaRegistro_Id] [RegistryCommunicationId]
        FROM [AddebitoDiretto] ad
          INNER JOIN [Contratto] c
            ON ad.[fk_Contratto_Id] = c.[IdContratto]
          INNER JOIN [VoceFatturazione] vf
            ON vf.[IdVoceFatturazione] = ad.[fk_VoceFatturazione_Id]
          INNER JOIN [AliquotaIVA] ai
            ON ai.[IdAliquotaIVA] = ad.[fk_AliquotaIva_Id]",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractId)
    .ToDictionary(grp => grp.Key, grp => grp.ToArray());
  }

  internal virtual async Task<Dictionary<string, SecurityDepositDTO[]>> SecurityDepositsByContract(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<SecurityDepositDTO>(
      @"SELECT 
            ca.[IdCauzione] [Id],
            c.[CodContratto] [ContractId],
            ca.[TipoDeposito] [DepositType],
            ca.[DataVersamento] [DepositDate],
            ca.[ImportoVersamento] [Amount],
            ca.[DataScadenza] [ExpirationDate],
            ca.[BancaFidejussoria] [BankName],
            ca.[DataRestituzioneCauz] [GivebackDate],
            ca.[NoteCauzione] [Notes],
            ca.[DataInizioInteressi] [InterestStartDate],
            ca.[DataFineInteressi] [InterestEndDate],
            ca.[DataInteresse] [InterestCalculationDate],
            ca.[DataSubentro] [TakeoverDate]
        FROM 
            [Cauzione] ca
          INNER JOIN [Contratto] c
            ON ca.[fk_Contratto_Id] = c.[IdContratto]",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractId)
    .ToDictionary(grp => grp.Key, grp => grp.ToArray());
  }

  internal virtual async Task<Dictionary<string, RatePlanDTO[]>> RatePlansByContract(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var rateplan1 = (await dbConnection.QueryAsync<RatePlanDTO>(
      @"WITH ScalettaturaUnrolled AS (
              SELECT 
              [fk_Contratto_Id],
              [DataScalettatura1] [Since],
              [ImportoScalettatura1] [NewAmount],
              [FlagSelezionato1] [IsDeclarationExpected],
              CASE WHEN [Semaforo1] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura2] [Since],
              [ImportoScalettatura2] [NewAmount],
              [FlagSelezionato2] [IsDeclarationExpected],
              CASE WHEN [Semaforo2] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura3] [Since],
              [ImportoScalettatura3] [NewAmount],
              [FlagSelezionato3] [IsDeclarationExpected],
              CASE WHEN [Semaforo3] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura4] [Since],
              [ImportoScalettatura4] [NewAmount],
              [FlagSelezionato4] [IsDeclarationExpected],
              CASE WHEN [Semaforo4] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura5] [Since],
              [ImportoScalettatura5] [NewAmount],
              [FlagSelezionato5] [IsDeclarationExpected],
              CASE WHEN [Semaforo5] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura6] [Since],
              [ImportoScalettatura6] [NewAmount],
              [FlagSelezionato6] [IsDeclarationExpected],
              CASE WHEN [Semaforo6] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura7] [Since],
              [ImportoScalettatura7] [NewAmount],
              [FlagSelezionato7] [IsDeclarationExpected],
              CASE WHEN [Semaforo7] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura8] [Since],
              [ImportoScalettatura8] [NewAmount],
              [FlagSelezionato8] [IsDeclarationExpected],
              CASE WHEN [Semaforo8] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura9] [Since],
              [ImportoScalettatura9] [NewAmount],
              [FlagSelezionato9] [IsDeclarationExpected],
              CASE WHEN [Semaforo9] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura10] [Since],
              [ImportoScalettatura10] [NewAmount],
              [FlagSelezionato10] [IsDeclarationExpected],
              CASE WHEN [Semaforo10] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura11] [Since],
              [ImportoScalettatura11] [NewAmount],
              [FlagSelezionato11] [IsDeclarationExpected],
              CASE WHEN [Semaforo11] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
          UNION ALL
          SELECT 
              [fk_Contratto_Id],
              [DataScalettatura12] [Since],
              [ImportoScalettatura12] [NewAmount],
              [FlagSelezionato12] [IsDeclarationExpected],
              CASE WHEN [Semaforo12] = 'V' THEN 0 ELSE 1 END [IsDeclared]
          FROM Scalettatura
      )
      SELECT
        su.*,
        c.[CodContratto] [ContractId]
      FROM [ScalettaturaUnrolled] su
        JOIN [Contratto] c
          ON su.[fk_Contratto_Id] = c.[IdContratto]
      WHERE
        su.[fk_Contratto_Id] IS NOT NULL
        AND [Since] IS NOT NULL
        AND [NewAmount] IS NOT NULL",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractId)
    .ToDictionary(grp => grp.Key, grp => grp.ToArray());

    var rateplan2 = (await dbConnection.QueryAsync<RatePlanDTO>(
      @"SELECT 
          vc.[NuovoImporto] [NewAmount],
          vc.[DataDecorrenza] [Since],
          c.[CodContratto] [ContractId]
        FROM [VariazioneCanone] vc
          JOIN [Contratto] c
            ON vc.[fk_Contratto_Id] = c.[IdContratto]",
          cancellationToken
    ))
    .GroupBy(cp => cp.ContractId)
    .ToDictionary(grp => grp.Key, grp => grp.ToArray());

    //Integrate single rates for found contracts
    var output = new Dictionary<string, RatePlanDTO[]>();

    foreach(var existingKey in rateplan1.Keys.Intersect(rateplan2.Keys))
    {
      var source = rateplan1[existingKey];

      foreach(var rate in rateplan2[existingKey])
      {
        if(!source.Any(r => r.Since == rate.Since))
        {
          //This will also handle multiple rate2 for same day/amount,
          // only copying data from the first instance
          source = [..source, rate];
        }
      }

      output.Add(existingKey, source);
    }

    //Integrate missing rateplan contracts
    foreach(var missingKey in rateplan2.Keys.Except(rateplan1.Keys))
    {
      output.Add(missingKey, rateplan2[missingKey]
        .GroupBy(r => r.Since)
        .Select(grp => grp.First())
        .ToArray());
    }

    return output;
  }

  internal virtual async Task<Dictionary<string, string>> GetSublocations(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    return (await dbConnection.QueryAsync<(string Parent, string Sublocation)>(
      @"WITH RankedContracts AS (
            SELECT
                cParent.[CodContratto] AS [Parent],
                cSubl.[CodContratto] AS [Sublocation],
                ROW_NUMBER() OVER (PARTITION BY cSubl.[CodContratto] ORDER BY cParent.[DataStipula] DESC) AS rn
            FROM [Sublocazione] sl
            JOIN [Contratto] cParent
                ON sl.[fk_Contratto_IdP] = cParent.[IdContratto]
            JOIN [Contratto] cSubl
                ON sl.[fk_Contratto_IdA] = cSubl.[IdContratto]
            WHERE [fk_Contratto_IdP] IS NOT NULL
                AND [fk_Contratto_IdA] IS NOT NULL
        )
        SELECT
            [Parent],
            [Sublocation]
        FROM RankedContracts
        WHERE rn = 1;",
        cancellationToken
    ))
    .ToDictionary(k => k.Sublocation, k => k.Parent);
  }
}
