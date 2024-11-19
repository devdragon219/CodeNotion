using Microsoft.Extensions.Logging;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Attributes;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.EventSystem;
using Rebus.Bus;
using RealGimm.Core.Prop.ContractAggregate.Events;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Prop.Services;

namespace RealGimm.Core.Prop.ContractAggregate.Handlers;

[BackgroundEventHandler]
public class ContractRevaluationUpdatedHandler : TenantMessageHandler<ContractRevaluationUpdatedEvent>
{
  public required IRepository<Contract> Contracts { protected get; init; }
  public required ILogger<ContractRevaluationUpdatedHandler> Logger { protected get; init; }
  public required ContractRevaluationService RevaluationService { protected get; init; }
  public required IBus Bus { protected get; init; }

  protected override async Task HandlePerTenant(ContractRevaluationUpdatedEvent message)
  {
    var contract = await Contracts
      .AsQueryable(
        new ContractIncludeAllSpec(),
        new GetByIdSpec<Contract>(message.ContractId))
      .FirstOrDefaultAsync();

    if (contract is null)
    {
      Logger.LogInformation("Unable to get contract {contractId} for revaluation update",
        message.ContractId);

      return;
    }

    await RevaluationService.RevaluateContract(message.ContractId);

    Logger.LogInformation("Revaluation history updated for contract {contractId}",
      message.ContractId);
  }
}
