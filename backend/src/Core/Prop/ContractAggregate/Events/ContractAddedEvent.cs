using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractAddedEvent : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractAddedEvent(int contractId)
  {
    ContractId = contractId;
  }
}
