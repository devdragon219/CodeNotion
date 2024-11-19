using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Plugin.Import.Asst.Models;

namespace RealGimm.Plugin.Import.Asst;

public class EstateImportPipeline
{
  private readonly EstateImportWorkspace _workspace;
  private readonly IEnumerable<EstateDTO> _sourceList;
  private readonly ILogger _logger;
  private readonly IServiceProvider _serviceProvider;

  public EstateImportPipeline(
    EstateImportWorkspace workspace,
    IEnumerable<EstateDTO> list,
    IServiceProvider serviceProvider,
    ILogger logger)
  {
    _workspace = workspace;
    _sourceList = list;
    _logger = logger;
    _serviceProvider = serviceProvider;
  }

  public async Task<(int Successes, int Failures)> RunPipeline(CancellationToken cancellationToken)
  {
    int successes = 0, failures = 0;

    var writeBlock = new ActionBlock<IEnumerable<EstateDTO>>(async sourceBatch =>
    {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var estateMapper = scope.ServiceProvider.GetRequiredService<EstateMapper>();

      var estateBatchOutput = new List<Estate>();
      foreach (var source in sourceBatch)
      {
        var estate = await estateMapper.MapEstate(source, _workspace, cancellationToken);

        //Check for validation errors if not disabled
        if (!_workspace.DisableValidation)
        {
          var validationErrors = estate.Validate().ToList();

          if (validationErrors.Any())
          {
            _logger.LogError("Estate {Id} could not be mapped, there are validation errors",
              estate.Id);

            foreach (var ve in validationErrors)
            {
              _logger.LogError("Estate {Id}: {validationError}", estate.Id, ve.ErrorMessage);
            }

            return;
          }
        }
        estateBatchOutput.Add(estate);
      }

      var estateRepository = scope.ServiceProvider.GetRequiredService<IRepository<Estate>>();

      try
      {
        await estateRepository.UpdateRangeAsync(estateBatchOutput, cancellationToken);
        Interlocked.Increment(ref successes);
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Unable to store estate batch {MinId} - {MaxId}",
          sourceBatch.First().Id,
          sourceBatch.Last().Id);
        Interlocked.Increment(ref failures);
      }
    });

    foreach (var estate in _sourceList
      .OrderBy(s => s.Id)
      .Chunk(50))
    {
      await writeBlock.SendAsync(estate);
    }

    writeBlock.Complete();

    try
    {
      await writeBlock.Completion;
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Unable to complete transcoding all estates");
    }

    return (successes, failures);
  }
}
