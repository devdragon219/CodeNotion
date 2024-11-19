using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractRevaluationUpdatedEvent : DomainEventBase
{
  public int ContractId { get; private set; }

  public ContractRevaluationUpdatedEvent(int contractId)
  {
    ContractId = contractId;
  }
}
