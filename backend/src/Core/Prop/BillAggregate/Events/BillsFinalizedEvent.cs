using RealGimm.Core.EventSystem;
namespace RealGimm.Core.Prop.BillAggregate.Events;

public record BillsFinalizedEvent(int[] BillsIds) : DomainEventBase;
