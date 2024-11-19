using RealGimm.Core.EventSystem;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Prop.ContractAggregate.Events;

[HasEntityId(nameof(ContractId))]
public record ContractManagementSubjectTakeoveredEvent  : DomainEventBase
{
  public int ContractId { get; private set; }
  public DateOnly PaymentDate { get; private set; }

  public ContractManagementSubjectTakeoveredEvent(int contractId, DateOnly paymentDate)
  {
    ContractId = contractId;
    PaymentDate = paymentDate;
  }
}
