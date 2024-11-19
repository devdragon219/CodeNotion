using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractCounterpartDeathEvent : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractCounterpartDeathEvent(int contractId)
  {
    ContractId = contractId;
  }
}
