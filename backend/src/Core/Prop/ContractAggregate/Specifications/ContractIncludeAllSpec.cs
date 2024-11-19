using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class ContractIncludeAllSpec : Specification<Contract>
{
  public ContractIncludeAllSpec()
  {
    Query
      .Include(contract => contract.Type)
      .Include(contract => contract.SublocatedContract)
        .ThenInclude(sublocatedContract => sublocatedContract!.Type)
      .Include(contract => contract.SubLocations)
      .Include(unit => unit.LocatedUnits)
      .Include(contract => contract.RegistrationTaxData!.RegistrationOffice)
      .Include(contract => contract.RegistryCommunications)
        .ThenInclude(communication => communication.EstatesUnits)
      .Include(contract => contract.RegistrationPayments)
      .Include(contract => contract.BillingBaseFeeBillItemType)
      .Include(contract => contract.RecurringAdditions.OrderBy(x => x.Id))
        .ThenInclude(ra => ra.BillItemType)
      .Include(contract => contract.OneshotAdditions.OrderBy(x => x.Id))
        .ThenInclude(oa => oa.BillItemType)
      .AsSplitQuery();
  }
}
