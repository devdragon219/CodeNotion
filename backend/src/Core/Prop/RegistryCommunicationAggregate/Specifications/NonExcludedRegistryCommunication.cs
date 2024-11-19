using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class NonExcludedRegistryCommunication : Specification<RegistryCommunication>
{
  public NonExcludedRegistryCommunication()
  {
    Query.Where(communication => !communication.IsExcluded);
  }
}
