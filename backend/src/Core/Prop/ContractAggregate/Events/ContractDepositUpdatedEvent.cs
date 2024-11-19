using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractDepositUpdatedEvent : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractDepositUpdatedEvent(int contractId)
  {
    ContractId = contractId;
  }
}
