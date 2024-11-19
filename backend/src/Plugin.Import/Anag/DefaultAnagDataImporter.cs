using RealGimm.SharedKernel.Interfaces;
using Dapper;
using System.Data.SqlClient;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Plugin.Import.Common;
using RealGimm.Core.Common.CustomCodeAggregate.Specification;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.Plugin.Import.Anag;

public partial class DefaultAnagDataImporter : IUpstreamDataImporter, IConfigurableModule
{
  public int ExecutionOrder => 10;

  public ConfigFunction Function => ConfigFunction.DataImport;
  public string[] ConfigurationParameters
  {
    get
    {
      return new[] {
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING,
        ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION
      };
    }
  }

  private string? _connectionString;
  private bool _disableValidation;
  public required ILogger<DefaultAnagDataImporter> _logger { protected get; init; }
  public required IReadRepository<Core.Common.ConfigAggregate.Config> _configRepository { protected get; init; }
  public required IReadRepository<City> _cities { protected get; init; }
  public required IRepository<CustomCode> _codeRepository { protected get; init; }
  public required IServiceProvider _serviceProvider { protected get; init; }

  private async Task EnsureInitializedAsync(CancellationToken cancellationToken)
  {
    if (!string.IsNullOrEmpty(_connectionString)) return;

    var connectionString = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING
      ),
      cancellationToken);

    if (connectionString is null || string.IsNullOrEmpty(connectionString.Value))
    {
      throw new ArgumentNullException("Upstream Connection String is missing");
    }

    var disableValidation = await _configRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION
      ),
      cancellationToken);

    _disableValidation = disableValidation?.Value.IsHumanTrue() ?? false;

    _connectionString = connectionString.Value;
  }

  public async Task PerformUpstreamUpdate(CancellationToken cancellationToken)
  {
    await EnsureInitializedAsync(cancellationToken);

    _logger.LogInformation("Begin syncing ANAG data from upstream");
    var dateStart = DateTime.UtcNow;

    var cities = await _cities.AsQueryable()
      .ToListAsync(cancellationToken: cancellationToken);
    var cityCoding = await _codeRepository.AsQueryable(new CustomCodeTranscoding<City>(
        DefaultCommonDataImporter.IMPORT_CITY_PROVIDER
      ))
      .ToListAsync(cancellationToken: cancellationToken);

    var citiesCache = cityCoding
      .Where(cc => !string.IsNullOrEmpty(cc.ExternalCode))
      .Select(cc => new
      {
        Key = cc.ExternalCode!,
        City = cities.FirstOrDefault(c => c.Id.ToString() == cc.InternalCode)
      })
      .Where(c => c.City is not null)
      .ToDictionary(o => o.Key, o => o.City!);

    var workspace = new AnagImportWorkspace(
      _disableValidation,
      citiesCache,
      await SubjectContacts(cancellationToken),
      await SubjectAddresses(cancellationToken),
      await SubjectBankAccounts(cancellationToken),
      await SubjectSplitPayments(cancellationToken),
      await SubjectOfficers(cancellationToken)
    );

    await SubjectMasterData(workspace, cancellationToken);

    _logger.LogInformation("Done syncing ANAG data from upstream (took {elapsed})", DateTime.UtcNow - dateStart);
  }

  internal virtual async Task<IEnumerable<SubjectDTO>> Subjects(CancellationToken cancellationToken)
  {
    using var dbConnection = new SqlConnection(_connectionString);

    var subjectList = await dbConnection.QueryAsync<SubjectDTO>(
      @"SELECT anag.[IdAnagraficaSoggetto] [Id],
        anag.[CodSoggetto] [InternalCode],
        anag.[CodSoggettoAlt] [ExternalCode],
        anag.[fk_ImportSisContabile_Id] [AccountingSystemCode],
        anag.[TipoSoggetto] [SubjectType],
        anag.[DenominazioneSoggetto] [Shorthand],
        COALESCE(anag.[RagSocSoggetto], anag.[DenominazioneSoggetto]) [Name],
        anag.[DataCostituzione] [LegalBusinessStart],
        anag.[CapitaleSociale] [LegalShareCapital],
        anag.[NumeroCCIAA] [LegalCompaniesHouseIdCode],  --This might be joined with ProvinciaCCIAA (mostly NULLs)
        anag.[NumeroRegistroImprese] [LegalAdditionalGovIdCode], --This might be joined with ComuneRegistroImprese
        anag.[CognomeSoggetto] [PhysicalLastName],
        anag.[NomeSoggetto] [PhysicalFirstName],
        anag.[DataNascitaSoggetto] [PhysicalBirthDate],
        birthCity.[IdComune] [PhysicalBirthCityId],
        anag.[SessoSoggetto] [PhysicalBirthSex],
        anag.[CodFiscaleSoggetto] [BaseCountryTaxIdCode],
        anag.[PartitaIvaSoggetto] [AdditionalTaxIdCode],
        COALESCE(anag.[IndirizzoSoggetto], anag.[ToponimoSoggetto]) [MainAddrToponymy],
        anag.[ComuneSoggetto] [MainAddrCityName],
        COALESCE(mainCity1.[IdComune], mainCity2.[IdComune]) [MainAddrCityId],
        anag.[ProvinciaSoggetto] [MainAddrCountyCode],
        anag.[NazioneSoggetto] [MainAddrCountryCode],
        anag.[CapSoggetto] [MainAddrPostCode],
        anag.[NoteSoggetto] [Notes],
        CASE WHEN anag.[FlagEnte] = '1' THEN 1 ELSE 0 END [IsMgmtSubject],
        anag.[CodEnte] [MgmtSubjCode],
        mgmtSubject.[CodSoggetto] [ParentMgmtSubjectId],
        CASE WHEN anag.[FlagCapoGruppo] = '1' THEN 1 ELSE 0 END [IsGroupLeader],
        CASE WHEN anag.[FlagCessato] = '1' THEN 1 ELSE 0 END [IsClosed],
        CASE WHEN anag.[FlagProprietario] = '1' THEN 1 ELSE 0 END  [IsLandlord],
        CASE WHEN anag.[FlagFatturazione] = '1' THEN 1 ELSE 0 END  [IsInvoicing],
        CASE WHEN anag.[FlagFiscale] = '1' THEN 1 ELSE 0 END  [IsFiscal],
        CASE WHEN anag.[FlagLegaleRappresentante] = '1' THEN 1 ELSE 0 END  [IsOfficer],
        CASE WHEN anag.[FlagInquilino] = '1' THEN 1 ELSE 0 END  [IsTenant],
        CASE WHEN anag.[FlagAmministratore] = '1' THEN 1 ELSE 0 END  [IsAdministrator],
        CASE WHEN anag.[FlagDipendente] = '1' THEN 1 ELSE 0 END  [IsEmployee],
        CASE WHEN anag.[FlagSocietaGruppo] = '1' THEN 1 ELSE 0 END  [IsInCompanyGroup],
        CASE WHEN anag.[FlagContrassegno] = '1' THEN 1 ELSE 0 END  [IsGroupSignaturePresent],
        anag.[Contrassegno] [GroupSignature],
        CASE WHEN anag.[FlagIVAConduttore] = '1' THEN 1 ELSE 0 END  [IsTenantVAT],
        CASE WHEN anag.[FlagIVALocatore] = '1' THEN 1 ELSE 0 END  [IsLandlordVAT],
        anag.[DataAggiornamento] [LastUpdatedDate]
        FROM [dbo].[AnagraficaSoggetto] anag
          LEFT OUTER JOIN [dbo].[Comune] birthCity
            ON anag.[fk_Comune_Id] = birthCity.[IdComune]
          LEFT OUTER JOIN [dbo].[Provincia] mainCity1County
            ON anag.[ProvinciaSoggetto] = mainCity1County.[CodProvincia]
          LEFT OUTER JOIN [dbo].[Nazione] mainCity1Country
            ON anag.[NazioneSoggetto] = mainCity1Country.[CodNazione]
          LEFT OUTER JOIN [dbo].[Comune] mainCity1
            ON CASE
                WHEN CHARINDEX('(', mainCity1.[DescComune]) > 0 THEN TRIM(LEFT(mainCity1.[DescComune], CHARINDEX('(', mainCity1.[DescComune]) - 1))
                ELSE mainCity1.[DescComune]
              END
              COLLATE SQL_Latin1_General_CP1_CS_AS = anag.[ComuneSoggetto]
              AND anag.[ComuneSoggetto] IS NOT NULL
              AND (
                (mainCity1County.[IdProvincia] = mainCity1.[fk_Provincia_Id]
                  AND mainCity1County.[IdProvincia] IS NOT NULL)
                OR (mainCity1Country.[IdNazione] = mainCity1.[fk_Nazione_Id]
                  AND mainCity1Country.[IdNazione] IS NOT NULL)
                )
          LEFT OUTER JOIN (
            SELECT
              MIN([IdComune]) [IdComune],
              [CapGenericoComune]
              FROM [dbo].[Comune] mainCity2Src
              GROUP BY [CapGenericoComune]
              HAVING COUNT([IdComune]) = 1
            ) mainCity2
            ON mainCity2.[CapGenericoComune] = anag.[CapSoggetto]
              AND anag.[CapSoggetto] IS NOT NULL
              AND anag.[CapSoggetto] <> ''
              AND anag.[CapSoggetto] <> '99999'
          LEFT OUTER JOIN [dbo].[EnteRelazione] mgmtSubjectRel
            ON anag.[IdAnagraficaSoggetto] = mgmtSubjectRel.[fk_AnagraficaSoggetto_Id2]
              AND mgmtSubjectRel.[DataFineRelazione] IS NULL
          LEFT OUTER JOIN [dbo].[AnagraficaSoggetto] mgmtSubject
            ON mgmtSubjectRel.[fk_AnagraficaSoggetto_Id1] = mgmtSubject.[IdAnagraficaSoggetto]",
          cancellationToken
    );

    //In the query above we try our best to find a matching city. The logic mirrors
    // the matching logic in the query in DefaultCommonDataImporter.cs relating to cities

    _logger.LogInformation("Received {numSubjects} raw subjects from upstream",
      subjectList.Count());

    //Deduplicate subjects by internal code
    subjectList = subjectList
      .GroupBy(src => src.InternalCode)
      .Select(grp =>
      {
        if (grp.Count() == 1)
        {
          return grp.First();
        }

        //Take the last modified one
        var output = grp
          .OrderByDescending(subject => subject.LastUpdatedDate)
          .First();

        //Integrate flags by OR
        output.IsAdministrator = grp.Any(s => s.IsAdministrator);
        output.IsEmployee = grp.Any(s => s.IsEmployee);
        output.IsFiscal = grp.Any(s => s.IsFiscal);
        output.IsInvoicing = grp.Any(s => s.IsInvoicing);
        output.IsLandlord = grp.Any(s => s.IsLandlord);
        output.IsLandlordVAT = grp.Any(s => s.IsLandlordVAT);
        output.IsOfficer = grp.Any(s => s.IsOfficer);
        output.IsTenant = grp.Any(s => s.IsTenant);
        output.IsTenantVAT = grp.Any(s => s.IsTenantVAT);

        return output;
      })
      .ToList(); ;

    _logger.LogInformation("After data consolidation, {numSubjects} subjects remain",
      subjectList.Count());

    return subjectList;
  }

  private async Task SubjectMasterData(
    AnagImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var subjectList = await Subjects(cancellationToken);

    if (_disableValidation)
    {
      _logger.LogInformation("Will insert subject data without validation.");
    }

    var mgmtSubjectRoots = subjectList
      .Where(s => s.IsMgmtSubject && s.ParentMgmtSubjectId == s.InternalCode)
      .ToList();

    var mgmtSubjectChildren =  subjectList
      .Where(s => s.IsMgmtSubject && s.ParentMgmtSubjectId != s.InternalCode)
      .ToList();

    var nonMgmtSubjects = subjectList
      .Where(s => !s.IsMgmtSubject)
      .ToList();

    //Ensure all management subject roots are created before all other subjects
    var mgmtRootsPipeline = new SubjectImportPipeline(
      workspace,
      mgmtSubjectRoots,
      _serviceProvider,
      _logger
    );

    var result = await mgmtRootsPipeline.RunPipeline(cancellationToken);

    int successes = result.Successes, failures = result.Failures;

    //Ensure all management subject roots are created before all other subjects
    var mgmtChildPipeline = new SubjectImportPipeline(
      workspace,
      mgmtSubjectChildren,
      _serviceProvider,
      _logger
    );

    result = await mgmtChildPipeline.RunPipeline(cancellationToken);

    successes += result.Successes;
    failures += result.Failures;

    //Then all other subjects
    var subjectsPipeline = new SubjectImportPipeline(
      workspace,
      nonMgmtSubjects,
      _serviceProvider,
      _logger
    );

    result = await subjectsPipeline.RunPipeline(cancellationToken);

    successes += result.Successes;
    failures += result.Failures;
    
    _logger.LogInformation("ANAG Subject data copied from upstream ({ok} successes, {fail} failures)",
      successes, failures);
  }
}
