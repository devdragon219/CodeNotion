using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractCounterpartsTransferedEvent : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractCounterpartsTransferedEvent(int contractId)
  {
    ContractId = contractId;
  }
}
