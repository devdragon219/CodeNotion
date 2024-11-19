using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractCounterpartsUpdatedEvent : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractCounterpartsUpdatedEvent(int contractId)
  {
    ContractId = contractId;
  }
}
