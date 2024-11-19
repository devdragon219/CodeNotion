using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class RegistryCommunicationIncludeForExportToExcelSpec : Specification<RegistryCommunication>
{
  public RegistryCommunicationIncludeForExportToExcelSpec()
  {
    Query
      .Include(communication => communication.EstatesUnits)
      .Include(communication => communication.Contract)
        .ThenInclude(contract => contract!.Type)
      .AsSplitQuery();
  }
}
