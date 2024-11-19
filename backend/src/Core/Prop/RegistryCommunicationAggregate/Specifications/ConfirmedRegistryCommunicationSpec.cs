using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class ConfirmedRegistryCommunicationSpec : Specification<RegistryCommunication>
{
  public ConfirmedRegistryCommunicationSpec()
  {
    Query.Where(communication => communication.IsSent);
  }
}
