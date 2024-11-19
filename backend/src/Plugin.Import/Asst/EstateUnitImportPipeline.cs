using System.Collections.Concurrent;
using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public class EstateUnitImportPipeline
{
  private readonly EstateImportWorkspace _workspace;
  private readonly IEnumerable<EstateUnitDTO> _sourceList;
  private readonly Dictionary<string, EstateUnitSurfaceDTO[]> _surfaces;
  private readonly ILogger _logger;
  private readonly IServiceProvider _serviceProvider;
  private readonly Dictionary<string, string[]> _externalIdEquivalences;
  public readonly ConcurrentDictionary<string, int> EUTranscodings = new();
  public readonly ConcurrentDictionary<string, int> ESUTranscodings = new();

  public EstateUnitImportPipeline(
    EstateImportWorkspace workspace,
    IEnumerable<EstateUnitDTO> list,
    Dictionary<string, EstateUnitSurfaceDTO[]> surfaces,
    IServiceProvider serviceProvider,
    ILogger logger)
  {
    _workspace = workspace;
    _sourceList = list;
    _surfaces = surfaces;
    _logger = logger;
    _serviceProvider = serviceProvider;
    _externalIdEquivalences = workspace.EstateUnitSourceCodeEquivalences!;
  }

  public async Task<(int Successes, int Failures)> RunPipeline(CancellationToken cancellationToken)
  {
    int successes = 0, failures = 0;

    var writeBlock = new ActionBlock<EstateUnitDTO>(async source =>
    {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var estateUnitMapper = scope.ServiceProvider
        .GetRequiredService<EstateUnitMapper>();

      var estateUnit = await estateUnitMapper.MapEstateUnit(
        source,
        _workspace,
        _surfaces.TryGetValue(source.Id, out var surfaces) ? surfaces : [],
        cancellationToken);

      //Check for validation errors if not disabled
      if (!_workspace.DisableValidation)
      {
        var validationErrors = estateUnit.Validate().ToList();

        if (validationErrors.Any())
        {
          _logger.LogError("Estate Unit {Id} could not be mapped, there are validation errors",
            estateUnit.Id);

          foreach (var ve in validationErrors)
          {
            _logger.LogError("Estate Unit {Id}: {validationError}", estateUnit.Id, ve.ErrorMessage);
          }

          return;
        }
      }

      var euRepository = scope.ServiceProvider.GetRequiredService<IRepository<EstateUnit>>();

      try
      {
        await euRepository.UpdateAsync(estateUnit, cancellationToken);
        if (estateUnit.Id != 0)
        {
          foreach (var externalId in _externalIdEquivalences[source.Id])
          {
            EUTranscodings.AddOrUpdate(externalId, estateUnit.Id, (k, v) => v);
          }
        }
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Unable to store estate unit {estateUnitId}", estateUnit.InternalCode);
        Interlocked.Increment(ref failures);

        return;
      }

      foreach (var externalId in _externalIdEquivalences[source.Id])
      {
        if (!await MapEstateSubUnits(scope, externalId, estateUnit, cancellationToken))
        {
          Interlocked.Increment(ref failures);
        }
      }

      Interlocked.Increment(ref successes);
    });

    foreach (var estateUnit in _sourceList)
    {
      await writeBlock.SendAsync(estateUnit);
    }

    writeBlock.Complete();

    try
    {
      await writeBlock.Completion;
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Unable to complete transcoding all estate units");
    }

    return (successes, failures);
  }

  private async Task<bool> MapEstateSubUnits(IServiceScope scope,
    string estateUnitId,
    EstateUnit parent,
    CancellationToken cancellationToken)
  {
    //Try to map and update the sub units
    if (_workspace.EstateSubUnits.TryGetValue(estateUnitId, out var subUnitArray))
    {
      var esuRepository = scope.ServiceProvider
        .GetRequiredService<IRepository<EstateSubUnit>>();
      var estateSubUnitMapper = scope.ServiceProvider
        .GetRequiredService<EstateSubUnitMapper>();

      foreach (var subUnit in subUnitArray)
      {
        var estateSubUnit = await estateSubUnitMapper.MapEstateSubUnit(
          subUnit,
          parent,
          _workspace,
          cancellationToken);

        if (!_workspace.DisableValidation)
        {
          var validationErrors = estateSubUnit.Validate().ToList();

          if (validationErrors.Any())
          {
            _logger.LogError("Estate Sub Unit {Id} could not be mapped, there are validation errors",
              estateSubUnit.Id);

            foreach (var ve in validationErrors)
            {
              _logger.LogError("Estate Sub Unit {Id}: {validationError}", estateSubUnit.Id, ve.ErrorMessage);
            }

            return false;
          }
        }

        try
        {
          await esuRepository.UpdateAsync(estateSubUnit, cancellationToken);
          if (estateSubUnit.Id != 0)
          {
            ESUTranscodings.AddOrUpdate(subUnit.Id, estateSubUnit.Id, (k, v) => v);
          }
        }
        catch (Exception e)
        {
          _logger.LogError(e, "Unable to store estate sub unit {estateUnitId}", estateSubUnit.InternalCode);

          return false;
        }
      }
    }
    return true;
  }
}
