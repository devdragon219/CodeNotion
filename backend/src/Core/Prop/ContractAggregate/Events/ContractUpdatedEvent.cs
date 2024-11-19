using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractUpdatedEvent : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractUpdatedEvent(int contractId)
  {
    ContractId = contractId;
  }
}
