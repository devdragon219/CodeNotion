using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.Plugin.Import.Prop;

public class AdministrationImportPipeline
{
  private readonly DefaultPropImportWorkspace _workspace;
  private readonly IEnumerable<AdministrationDTO> _sourceList;
  private readonly ILogger _logger;
  private readonly IServiceProvider _serviceProvider;

  public AdministrationImportPipeline(
    DefaultPropImportWorkspace workspace,
    IEnumerable<AdministrationDTO> source,
    IServiceProvider serviceProvider,
    ILogger logger)
  {
    _workspace = workspace;
    _sourceList = source;
    _logger = logger;
    _serviceProvider = serviceProvider;
  }

  public async Task<(int Successes, int Failures)> RunPipeline(CancellationToken cancellationToken)
  {
    int successes = 0, failures = 0;

    var writeBlock = new ActionBlock<AdministrationDTO>(async source =>
    {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var admMapper = scope.ServiceProvider.GetRequiredService<AdministrationMapper>();

      var administration = await admMapper.MapAdministration(source, _workspace, cancellationToken);

      //Check for validation errors if not disabled
      if (!_workspace.DisableValidation)
      {
        var validationErrors = administration.Validate().ToList();

        if (validationErrors.Any())
        {
          _logger.LogError("Administration {Id} could not be mapped, there are validation errors",
            administration.Id);

          foreach (var ve in validationErrors)
          {
            _logger.LogError("Administration {Id}: {validationError}", administration.Id, ve.ErrorMessage);
          }

          return;
        }
      }

      var adminRepository = scope.ServiceProvider.GetRequiredService<IRepository<Administration>>();

      try
      {
        await adminRepository.UpdateAsync(administration, cancellationToken);
        Interlocked.Increment(ref successes);
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Unable to store administration {adminId}", administration.Id);
        Interlocked.Increment(ref failures);
      }
    });

    foreach (var administration in _sourceList)
    {
      await writeBlock.SendAsync(administration);
    }

    writeBlock.Complete();

    try
    {
      await writeBlock.Completion;
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Unable to complete transcoding all administrations");
    }

    return (successes, failures);
  }
}
