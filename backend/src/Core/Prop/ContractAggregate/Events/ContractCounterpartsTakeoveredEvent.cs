using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractCounterpartsTakeoveredEvent  : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractCounterpartsTakeoveredEvent(int contractId)
  {
    ContractId = contractId;
  }
}
