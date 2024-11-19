using System.Collections.Concurrent;
using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public class CadastralUnitImportPipeline
{
  private readonly EstateImportWorkspace _workspace;
  private readonly Dictionary<int, CadastralUnitDTO> _sourceList;
  private readonly Dictionary<string, CadastralCoordinateDTO[]> _sourceCoordinates;
  private readonly ILogger _logger;
  private readonly IServiceProvider _serviceProvider;
  public readonly ConcurrentDictionary<string, int> CUTranscodings = new();

  public CadastralUnitImportPipeline(
    EstateImportWorkspace workspace,
    Dictionary<int, CadastralUnitDTO> list,
    Dictionary<string, CadastralCoordinateDTO[]> coordinates,
    IServiceProvider serviceProvider,
    ILogger logger)
  {
    _workspace = workspace;
    _sourceList = list;
    _sourceCoordinates = coordinates;
    _logger = logger;
    _serviceProvider = serviceProvider;
  }

  public async Task<(int Successes, int Failures, int Coordinates)> RunPipeline(CancellationToken cancellationToken)
  {
    int successes = 0, failures = 0, coordCount = 0;

    var writeBlock = new ActionBlock<IEnumerable<CadUnitBlock>>(
      async sourceBlock =>
    {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var cadastralUnitMapper = scope.ServiceProvider
        .GetRequiredService<CadastralUnitMapper>();

      var cadUnitResult = new Dictionary<string, CadUnitResult>();

      foreach (var source in sourceBlock)
      {
        var cadastralUnit = await cadastralUnitMapper.MapCadastralUnit(
          source.Dto,
          source.SourceEstateUnit,
          _workspace,
          cancellationToken);

        //Check for validation errors if not disabled
        if (!_workspace.DisableValidation)
        {
          var validationErrors = cadastralUnit.Validate().ToList();

          if (validationErrors.Any())
          {
            _logger.LogError("Cadastral Unit {Id} could not be mapped, there are validation errors",
              cadastralUnit.Id);

            foreach (var ve in validationErrors)
            {
              _logger.LogError("Cadastral Unit {Id}: {validationError}", cadastralUnit.Id, ve.ErrorMessage);
            }

            return;
          }
        }

        if (_sourceCoordinates.TryGetValue(source.Dto.Id, out var coordinates))
        {
          try
          {
            if (MapCoordinates(scope, coordinates, cadastralUnit))
            {
              Interlocked.Increment(ref coordCount);
            }
          }
          catch (Exception e)
          {
            _logger.LogError(e, "Unable to store cadastral unit coordinates for {CadastralUnitId}", cadastralUnit.InternalCode);
            //Don't count this as failure          
          }
        }

        cadUnitResult.Add(source.Dto.Id, new CadUnitResult(source.Dto, cadastralUnit));
      }

      var cuRepository = scope.ServiceProvider.GetRequiredService<IRepository<CadastralUnit>>();

      try
      {
        await cuRepository.UpdateRangeAsync(
          cadUnitResult.Values.Select(r => r.Unit),
          cancellationToken);

        foreach (var mapping in cadUnitResult)
        {
          if (mapping.Value.Unit.Id != 0)
          {
            foreach (var externalId in mapping.Value.Dto.EquivalentCUIds)
            {
              CUTranscodings.AddOrUpdate(externalId, mapping.Value.Unit.Id, (k, v) => v);
            }
          }

          Interlocked.Increment(ref successes);
        }

      }
      catch (Exception e)
      {
        _logger.LogError(e, "Unable to store cadastral unit block between estate unit Id {IdMin} - {IdMax}",
          sourceBlock.First().SourceEstateUnit,
          sourceBlock.Last().SourceEstateUnit);
        Interlocked.Increment(ref failures);

        return;
      }
    });

    foreach (var block in _sourceList
      .OrderBy(s => s.Key)
      .Chunk(50))
    {
      await writeBlock.SendAsync(
        block.Select(kvp => new CadUnitBlock(kvp.Key, kvp.Value)));
    }

    writeBlock.Complete();

    try
    {
      await writeBlock.Completion;
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Unable to complete transcoding all cadastral units");
    }

    return (successes, failures, coordCount);
  }

  private static bool MapCoordinates(IServiceScope scope,
    CadastralCoordinateDTO[] coordinates,
    CadastralUnit parent)
  {
    var toAdd = coordinates
      .Where(c => !parent.Coordinates.Any(pc => c.IsSameCoordinates(pc)))
      .ToList();

    var toUpdate = coordinates
      .Where(c => parent.Coordinates.Any(pc => c.IsSameCoordinates(pc)))
      .ToList();

    var toRemove = parent.Coordinates
      .Where(pc => !coordinates.Any(c => c.IsSameCoordinates(pc)))
      .ToList();

    foreach (var src in toAdd)
    {
      var newCoord = new CadastralCoordinates();

      newCoord.SetData(CoordinateType.ItalianOrdinary,
        src.Notes,
        src.ITA_Sezione,
        src.ITA_Foglio,
        src.ITA_Particella,
        src.ITA_Subalterno,
        null,
        null);

      if (src.ITA_IsTavolare)
      {
        newCoord.SetITTavData(
          src.ITA_TavPartita,
          src.ITA_TavCorpo,
          src.ITA_TavPorzione
        );
      }

      parent.Coordinates.Add(newCoord);
    }

    var didUpdateNotes = false;

    foreach (var src in toUpdate)
    {
      var dest = parent.Coordinates.First(src.IsSameCoordinates);

      if ((src.Notes is null ^ dest.Notes is null)
        || (!string.IsNullOrEmpty(src.Notes)) && src.Notes != dest.Notes)
      {
        didUpdateNotes = true;
      }

      dest.SetData(CoordinateType.ItalianOrdinary,
        src.Notes,
        src.ITA_Sezione,
        src.ITA_Foglio,
        src.ITA_Particella,
        src.ITA_Subalterno,
        null,
        null);

      if (src.ITA_IsTavolare)
      {
        dest.SetITTavData(
          src.ITA_TavPartita,
          src.ITA_TavCorpo,
          src.ITA_TavPorzione
        );
      }
    }

    foreach (var del in toRemove)
    {
      parent.Coordinates.Remove(del);
    }

    return toRemove.Count != 0 || toAdd.Count != 0 || didUpdateNotes;
  }

  private record CadUnitBlock(int SourceEstateUnit, CadastralUnitDTO Dto);
  private record CadUnitResult(CadastralUnitDTO Dto, CadastralUnit Unit);
}
