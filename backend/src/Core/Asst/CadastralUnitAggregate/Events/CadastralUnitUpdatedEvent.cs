using RealGimm.Core.EventSystem;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Events;

public record CadastralUnitUpdatedEvent : DomainEventBase
{
  public int CadastralUnitId { get; private set; }

  public CadastralUnitUpdatedEvent(int cadastralUnitId)
  {
    CadastralUnitId = cadastralUnitId;
  }
}
