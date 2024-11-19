using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class TemporaryRegistryCommunicationSpec : Specification<RegistryCommunication>
{
  public TemporaryRegistryCommunicationSpec()
  {
    Query.Where(communication => !communication.IsSent);
  }
}
