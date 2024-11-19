using Microsoft.Extensions.Logging;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Attributes;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Prop.ContractAggregate.Events;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Prop.Services;

namespace RealGimm.Core.Prop.ContractAggregate.Handlers;

[BackgroundEventHandler]
public class ContractManagementSubjectTakeoveredHandler : TenantMessageHandler<ContractManagementSubjectTakeoveredEvent>
{
  public required IRepository<Contract> ContractRepository { protected get; init; }
  public required IRepository<RegistryCommunication> RegistryCommunicationRepository { protected get; init; }
  public required RegistryCommunicationService RegistryCommunicationService { protected get; init; }
  public required ILogger<ContractCounterpartsTakeoveredHandler> Logger { protected get; init; }

  protected override async Task HandlePerTenant(ContractManagementSubjectTakeoveredEvent message)
  {
    var contract = await ContractRepository
      .AsQueryable(new ContractIncludeAllSpec(), new GetByIdSpec<Contract>(message.ContractId))
      .FirstOrDefaultAsync();

    if (contract is null)
    {
      Logger.LogInformation("Unable to get contract {contractId} for creating registry communication", message.ContractId);      
      return;
    }

    if (contract.RegistrationTaxData is null)
    {
      return;
    }

    var registryCommunication = await RegistryCommunicationService.CreateRegistryCommunicationAsync(
      contract,
      CommunicationType.Ita_RLI12_Takeover,
      message.PaymentDate);

    await RegistryCommunicationRepository.AddAsync(registryCommunication);
    await RegistryCommunicationRepository.SaveChangesAsync();

    Logger.LogInformation("Registry communication was added for contract {contractId}", message.ContractId);
  }
}
