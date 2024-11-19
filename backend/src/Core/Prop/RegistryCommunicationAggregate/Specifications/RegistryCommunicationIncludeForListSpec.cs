using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class RegistryCommunicationIncludeForListSpec : Specification<RegistryCommunication>
{
  public RegistryCommunicationIncludeForListSpec()
  {
    Query
      .Include(communication => communication.EstatesUnits)
      .Include(communication => communication.Contract)
        .ThenInclude(contract => contract!.Type)
      .AsSplitQuery();
  }
}
