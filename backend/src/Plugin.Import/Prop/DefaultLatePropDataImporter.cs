using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Common.ConfigAggregate;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Plugin.Import.Common;
using RealGimm.Core.Common.CustomCodeAggregate.Specification;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;

namespace RealGimm.Plugin.Import.Prop;

public partial class DefaultLatePropDataImporter : IUpstreamDataImporter
{
  public int ExecutionOrder => 130;

  public static readonly string PARAM_CONNSTR = "upstream-connectionstring";
  public static readonly string PARAM_NO_VALIDATION = "upstream-disable-validation";

  private string? _connectionString;
  private bool _disableValidation;

  public required ILogger<DefaultPropDataImporter> _logger { protected get; init; }
  public required IReadRepository<Config> _configRepository { protected get; init; }
  public required IReadRepository<City> _cities { protected get; init; }
  public required IReadRepository<Subject> _subjects { protected get; init; }
  public required IRepository<CustomCode> _codeRepository { protected get; init; }
  public required IRepository<Contract> _contractRepository { protected get; init; }
  public required IReadRepository<BillItemType> _billItemTypes { protected get; init; }
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

    _logger.LogInformation("Begin LATE-PROP additional data from upstream");
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

    var workspace = await PrepareWorkspace(citiesCache, cancellationToken);

    _logger.LogInformation("Import context ready, importing takeovers");

    await TakeoverData(workspace, cancellationToken);

    _logger.LogInformation("Done syncing LATE-PROP data from upstream (took {elapsed})", DateTime.UtcNow - dateStart);
  }

  private async Task<DefaultLatePropImportWorkspace> PrepareWorkspace(
    Dictionary<string, City> citiesCache,
    CancellationToken cancellationToken)
  {
    return new DefaultLatePropImportWorkspace(
      _disableValidation,
      await _billItemTypes
        .AsQueryable()
        .ToDictionaryAsync(bit => bit.InternalCode, bit => bit.Id, cancellationToken),
      citiesCache,
      await _subjects
        .AsQueryable()
        .ToDictionaryAsync(s => s.InternalCode, s => s.Id, cancellationToken)
    );
  }

  private async Task TakeoverData(
    DefaultLatePropImportWorkspace workspace,
    CancellationToken cancellationToken)
  {
    var takeovers = await Takeovers(cancellationToken);

    _logger.LogInformation("Received {numTakeovers} raw takeovers from upstream",
      takeovers.Count());

    takeovers = [.. takeovers
      .Where(t => !string.IsNullOrEmpty(t.LeavingSubjectId)
        && !string.IsNullOrEmpty(t.NewSubjectId)
        && workspace.SubjectsId.ContainsKey(t.LeavingSubjectId)
        && workspace.SubjectsId.ContainsKey(t.NewSubjectId))];

    _logger.LogInformation("After data consolidation, {numTakeovers} takeovers remain",
      takeovers.Count());

    if (_disableValidation)
    {
      _logger.LogInformation("Will insert takeover data without validation.");
    }

    //Directly import takeovers in contracts
    int failures = 0, successes = 0;
    foreach (var toGroup in takeovers.GroupBy(t => t.ContractId))
    {
      var contract = await _contractRepository
        .AsQueryable(
          new ContractIncludeForImportSpec())
        .Where(c => c.ExternalCode == toGroup.Key)
        .FirstOrDefaultAsync(cancellationToken);

      if(contract is null)
      {
        _logger.LogError("Unable to find contract {contractId} while importing takeovers",
          toGroup.Key);
        failures++;
        continue;
      }

      //These can only be added, not updated or deleted
      foreach(var takeover in toGroup)
      {
        if(!workspace.SubjectsId.TryGetValue(takeover.LeavingSubjectId!, out var leavingSubjectId))
        {
          _logger.LogError("Unable to find subject {subjectId} while importing takeovers",
            takeover.LeavingSubjectId);
          failures++;
          continue;
        }

        if(!workspace.SubjectsId.TryGetValue(takeover.NewSubjectId!, out var newSubjectId))
        {
          _logger.LogError("Unable to find subject {subjectId} while importing takeovers",
            takeover.NewSubjectId);
          failures++;
          continue;
        }

        if(!contract.Takeovers.Any(t => t.NewSubjectId == newSubjectId
          && t.OriginalSubjectId == leavingSubjectId
          && t.TakeoverDate == takeover.ReferenceDate!.Value.ToDateOnly()))
        {
          var to = new Takeover();
          to.SetEffectiveDate(takeover.ReferenceDate!.Value.ToDateOnly());
          to.SetNewSubjectId(newSubjectId);
          to.SetOriginalSubjectId(leavingSubjectId);
          to.SetTakeoverDate(takeover.ReferenceDate!.Value.ToDateOnly());
          to.SetType(takeover.TakeoverType.ParseAsRG2TakeoverType());

          if(takeover.DeclaringSubjectId is not null
            && workspace.SubjectsId.TryGetValue(takeover.DeclaringSubjectId, out var declaringSubjectId))
          {
            to.SetLegalRepresentativeSubjectId(declaringSubjectId);
          }
          
          contract.Takeovers.Add(to);
        }
      }

      await _contractRepository.UpdateAsync(contract, cancellationToken);
    }

    _logger.LogInformation("Prop takeover data copied from upstream ({ok} successes, {fail} failures)",
      successes, failures);
  }
}
