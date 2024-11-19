using Dapper;
using System.Data.SqlClient;
using Microsoft.Extensions.Logging;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.Plugin.Import.Anag;

public partial class DefaultAnagDataImporter
{
  internal virtual async Task<Dictionary<string, IEnumerable<ContactDTO>>> SubjectContacts(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var contactList = await dbConnection.QueryAsync<ContactDTO>(
      @"SELECT
          c.[IdContatto] [Id],
          c.[fk_TipoContatto_Id] [ContactType],
          as2.[CodSoggetto] [SubjectInternalCode],
          as2.[DataAggiornamento] [SubjectLastUpdated],
          c.[DescContatto] [ContactInfo],
          c.[NoteContatto] [Notes]
        FROM
          [dbo].[Contatto] c
        JOIN [dbo].[AnagraficaSoggetto] as2
          ON
          c.[fk_AnagraficaSoggetto_Id] = as2.[IdAnagraficaSoggetto]
        WHERE
          as2.[FlagCessato] <> '1'",
          cancellationToken
    );

    //Deduplicate contacts - choose only contacts for latest subject
    var deduplicated = contactList
      .GroupBy(c => c.SubjectInternalCode ?? string.Empty)
      .ToDictionary(grp => grp.Key, grp => grp
        .GroupBy(c => c.SubjectLastUpdated)
        .OrderByDescending(subGroup => subGroup.Key)
        .First()
        .GroupBy(c => new { c.SubjectInternalCode, c.ContactType })
        .Select(grp => grp.First())
        .AsEnumerable());

    _logger.LogInformation("Received {source} contacts from upstream ({deduped} after filtering)",
      contactList.Count(),
      deduplicated.Count);

    return deduplicated;
  }

  internal virtual async Task<Dictionary<string, IEnumerable<AddressDTO>>> SubjectAddresses(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var addressList = await dbConnection.QueryAsync<AddressDTO>(
      @"SELECT
          is2.[IdIndirizzoSoggetto] [Id],
          is2.[fk_TipoIndirizzo_Id] [AddressType],
          as2.[CodSoggetto] [SubjectInternalCode],
          as2.[DataAggiornamento] [SubjectLastUpdated],
          is2.[fk_Comune_Id] [CityId],
          COALESCE(is2.[IndirizzoIS], is2.[ToponimoIS]) [Toponymy],
          is2.[CapIS] [PostCode]
        FROM
          [dbo].[IndirizzoSoggetto] is2
        JOIN [dbo].[AnagraficaSoggetto] as2
          ON
          is2.[fk_AnagraficaSoggetto_Id] = as2.[IdAnagraficaSoggetto]
        WHERE
          as2.[FlagCessato] <> '1'",
        cancellationToken
    );

    //Deduplicate addresses - choose only addresses for latest subject
    var deduplicated = addressList
      .GroupBy(c => c.SubjectInternalCode ?? string.Empty)
      .ToDictionary(
        grp => grp.Key,
        grp => grp
          .GroupBy(c => c.SubjectLastUpdated)
          .OrderByDescending(subGroup => subGroup.Key)
          .First()
          .GroupBy(c => new { c.SubjectInternalCode, c.AddressType })
          .Select(grp => grp.First())
          .AsEnumerable());

    _logger.LogInformation("Received {source} addresses from upstream ({deduped} after filtering)",
      addressList.Count(),
      deduplicated.Count);

    return deduplicated;
  }

  internal virtual async Task<Dictionary<string, IEnumerable<BankAccountDTO>>> SubjectBankAccounts(
    CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var baList = await dbConnection.QueryAsync<BankAccountDTO>(
      @"SELECT
          cc.[IdContoCorrente] [Id],
          cc.[TipoCC] [AccountType],
          as2.[CodSoggetto] [SubjectInternalCode],
          as2.[DataAggiornamento] [SubjectLastUpdated],
          cc.[DataAggiornamento] [AccountLastUpdated],
          cc.[IntestatarioContoCorrente] [AccountHolder],
          
          CASE WHEN cc.[FlagCessato] = '1' THEN 1 ELSE 0 END AS [IsClosed],
          
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
          	END [IBAN]
        FROM [dbo].[ContoCorrente] cc 
        JOIN [dbo].[AnagraficaSoggetto] as2
          ON cc.[fk_AnagraficaSoggetto_Id] = as2.[IdAnagraficaSoggetto]
        JOIN [dbo].[AgenziaBancaria] ab
          ON cc.[fk_AgenziaBancaria_Id] = ab.[IdAgenziaBancaria]
        JOIN [dbo].[Banca] bb
          ON ab.[fk_Banca_Id] = bb.[IdBanca]
        JOIN [dbo].[Nazione] na
          ON bb.[fk_Nazione_Id] = na.[IdNazione]
        WHERE
          as2.[FlagCessato] <> '1'",
        cancellationToken
    );

    //Deduplicate accounts by subject - take only from last subject instance
    var deduplicated = baList
      .GroupBy(c => c.SubjectInternalCode ?? string.Empty)
      .ToDictionary(
        grp => grp.Key,
        grp => grp
          .GroupBy(c => c.SubjectLastUpdated)
          .OrderByDescending(subGroup => subGroup.Key)
          .First()
          .GroupBy(account => account.IBAN)
          .Select(grp => grp.First())
          .AsEnumerable());

    _logger.LogInformation("Received {source} bank accounts from upstream ({deduped} after filtering)",
      baList.Count(),
      deduplicated.Count);

    return deduplicated;
  }

  internal virtual async Task<Dictionary<string, IEnumerable<SplitPaymentDTO>>> SubjectSplitPayments(
    CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var splitPaymentPeriods = await dbConnection.QueryAsync<SplitPaymentDTO>(
      @"SELECT
          sppe.[IDSplitPayment] [Id],
          as2.[CodSoggetto] [SubjectInternalCode],
          as2.[DataAggiornamento] [SubjectLastUpdated],
          sppe.[DataInizioValidita] [StartDate],
          sppe.[DataFineValidita] [EndDate]
        FROM [dbo].[SplitPaymentPerEnte] sppe
        JOIN [dbo].[AnagraficaSoggetto] as2
          ON
          sppe.[fk_anagraficaSoggetto_Id] = as2.[IdAnagraficaSoggetto]
        WHERE
          as2.[FlagCessato] <> '1'",
          cancellationToken
    );

    //Deduplicate periods - choose only periods for latest subject, and by startDate
    var deduplicated = splitPaymentPeriods
      .GroupBy(c => c.SubjectInternalCode ?? string.Empty)
      .ToDictionary(grp => grp.Key, grp => grp
        .GroupBy(c => c.SubjectLastUpdated)
        .OrderByDescending(subGroup => subGroup.Key)
        .First()
        .GroupBy(c => c.StartDate)
        .Select(grp => grp.First())
        .AsEnumerable());

    _logger.LogInformation("Received {source} split payment periods from upstream ({deduped} after filtering)",
      splitPaymentPeriods.Count(),
      deduplicated.Count);

    return deduplicated;
  }

  internal virtual async Task<Dictionary<string, IEnumerable<OfficerDTO>>> SubjectOfficers(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var officers = await dbConnection.QueryAsync<OfficerDTO>(
      @"SELECT
          as2.[CodSoggetto] [SubjectInternalCode],
          as2.[DataAggiornamento] [SubjectLastUpdated],
          as3.[CodSoggetto] [OfficerInternalCode],
          lr.[NaturaCaricaLR] [OfficerType],
          lr.[DataInizioLR] [StartDate],
          lr.[DataFineLR] [EndDate]
        FROM [dbo].[LegaleRappresentante] lr
        JOIN [dbo].[AnagraficaSoggetto] as2
          ON
          lr.[fk_anagraficaSoggetto_Id1] = as2.[IdAnagraficaSoggetto]
        JOIN [dbo].[AnagraficaSoggetto] as3
          ON
          lr.[fk_anagraficaSoggetto_Id2] = as3.[IdAnagraficaSoggetto]
        WHERE
          as2.[FlagCessato] <> '1'",
          cancellationToken
    );

    //Deduplicate periods - choose only periods for latest subject, and by startDate
    var deduplicated = officers
      .GroupBy(c => c.SubjectInternalCode ?? string.Empty)
      .ToDictionary(grp => grp.Key, grp => grp
        .GroupBy(c => c.SubjectLastUpdated)
        .OrderByDescending(subGroup => subGroup.Key)
        .First()
        .GroupBy(c => c.StartDate)
        .Select(grp => grp.First())
        .AsEnumerable());

    _logger.LogInformation("Received {source} officers from upstream ({deduped} after filtering)",
      officers.Count(),
      deduplicated.Count);

    return deduplicated;
  }
}
