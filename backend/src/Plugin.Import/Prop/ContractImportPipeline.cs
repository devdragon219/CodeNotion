using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Plugin.Import.Prop.Models;

namespace RealGimm.Plugin.Import.Prop;

public class ContractImportPipeline
{
  private readonly DefaultPropImportWorkspace _workspace;
  private readonly IEnumerable<ContractDTO> _sourceList;
  private readonly ILogger _logger;
  private readonly IServiceProvider _serviceProvider;

  public ContractImportPipeline(
    DefaultPropImportWorkspace workspace,
    IEnumerable<ContractDTO> list,
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

    var writeBlock = new ActionBlock<ContractDTO>(async source =>
    {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var contractMapper = scope.ServiceProvider.GetRequiredService<ContractMapper>();

      try
      {
        var contract = await contractMapper.MapContract(source, _workspace, cancellationToken);

        //Check for validation errors if not disabled
        if (!_workspace.DisableValidation)
        {
          var validationErrors = contract.Validate().ToList();

          if (validationErrors.Any())
          {
            _logger.LogError("Contract {Id} could not be mapped, there are validation errors",
              contract.Id);

            foreach (var ve in validationErrors)
            {
              _logger.LogError("Contract {Id}: {validationError}", contract.Id, ve.ErrorMessage);
            }

            return;
          }
        }

        var contractRepository = scope.ServiceProvider.GetRequiredService<IRepository<Contract>>();

        await contractRepository.UpdateAsync(contract, cancellationToken);
        Interlocked.Increment(ref successes);
      }
      catch (Exception e)
      {
        _logger.LogError(e, "Unable to store contract {contractId}", source.InternalCode);
        Interlocked.Increment(ref failures);
      }
    });

    foreach (var contract in _sourceList)
    {
      await writeBlock.SendAsync(contract);
    }

    writeBlock.Complete();

    try
    {
      await writeBlock.Completion;
    }
    catch (Exception e)
    {
      _logger.LogError(e, "Unable to complete transcoding all contracts");
    }

    return (successes, failures);
  }
}
