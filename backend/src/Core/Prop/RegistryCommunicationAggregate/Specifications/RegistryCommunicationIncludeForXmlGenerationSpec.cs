using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistryCommunicationAggregate.Specifications;

public class RegistryCommunicationIncludeForXmlGenerationSpec : Specification<RegistryCommunication>
{
  public RegistryCommunicationIncludeForXmlGenerationSpec()
  {
    Query
      .Include(communication => communication.EstatesUnits)
      .Include(communication => communication.Contract)
        .ThenInclude(contract => contract!.Type)
      .Include(communication => communication.Contract)
        .ThenInclude(contract => contract!.RegistrationTaxData!.RegistrationOffice)
      .Include(communication => communication.Contract)
        .ThenInclude(contract => contract!.BillingBaseFeeBillItemType)
      .AsSplitQuery();
  }
}
