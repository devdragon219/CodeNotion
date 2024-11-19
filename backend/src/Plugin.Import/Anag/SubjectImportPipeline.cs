using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.Services;
using RealGimm.Plugin.Import.Anag.Models;

namespace RealGimm.Plugin.Import.Anag;

public class SubjectImportPipeline
{
  private readonly AnagImportWorkspace _workspace;
  private readonly IEnumerable<SubjectDTO> _sourceList;
  private readonly ILogger _logger;
  private readonly IServiceProvider _serviceProvider;

  public SubjectImportPipeline(
    AnagImportWorkspace workspace,
    IEnumerable<SubjectDTO> list,
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

    var writeBlock = new ActionBlock<SubjectDTO>(async source =>
    {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var subjectMapper = scope.ServiceProvider.GetRequiredService<SubjectMapper>();

      var subject = await subjectMapper.MapSubject(source, _workspace, cancellationToken);

      //Check for validation errors if not disabled
      if (!_workspace.DisableValidation)
      {
        var validationErrors = subject.Validate().ToList();

        if (validationErrors.Any())
        {
          _logger.LogError("Subject {Id} could not be mapped, there are validation errors",
            subject.Id);

          foreach (var ve in validationErrors)
          {
            _logger.LogError("Subject {Id}: {validationError}", subject.Id, ve.ErrorMessage);
          }

          return;
        }
      }

      var _subjectUpsert = scope.ServiceProvider.GetRequiredService<SubjectUpsertService>();

      if (_workspace.DisableValidation)
      {
        _subjectUpsert.EnableSkipValidation();
      }

      try
      {
        var result = await _subjectUpsert.Upsert(subject, cancellationToken);

        if (!result.IsSuccess)
        {
          foreach (var error in result.Errors)
          {
            _logger.LogError("Subject {Id}: {error}", subject.Id, error);
          }

          foreach (var error in result.ValidationErrors)
          {
            _logger.LogError("Subject {Id}: {error}", subject.Id, error.ErrorMessage);
          }
          Interlocked.Increment(ref failures);
        }
        else
        {
          Interlocked.Increment(ref successes);
        }
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Error while upserting subject {subjectId}", subject.Id);
        Interlocked.Increment(ref failures);
      }
    });

    foreach (var subject in _sourceList)
    {
      await writeBlock.SendAsync(subject);
    }

    writeBlock.Complete();

    try
    {
      await writeBlock.Completion;
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Unable to complete transcoding all subjects");
    }

    return (successes, failures);
  }
}
