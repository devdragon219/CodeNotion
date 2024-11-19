using RealGimm.Core.EventSystem;

namespace RealGimm.Core.Asst.CadastralUnitAggregate.Events;

public record CadastralUnitCreatedEvent : DomainEventBase
{
  public int CadastralUnitId { get; private set; }

  public CadastralUnitCreatedEvent(int cadastralUnitId)
  {
    CadastralUnitId = cadastralUnitId;
  }
}
