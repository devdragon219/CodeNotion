using Ardalis.Specification;

namespace RealGimm.Core.Prop.ContractAggregate.Specifications;

public class ContractIncludeForImportSpec : Specification<Contract>
{
  public ContractIncludeForImportSpec()
  {
    Query
      .Include(contract => contract.Type)
      .Include(contract => contract.LocatedUnits)
      .Include(contract => contract.Counterparts)
      .Include(contract => contract.Transactors)
      .Include(contract => contract.OneshotAdditions)
        .ThenInclude(oa => oa.BillItemType)
      .Include(contract => contract.RecurringAdditions)
        .ThenInclude(ra => ra.BillItemType)
      .Include(contract => contract.BillingBaseFeeBillItemType)
      .Include(contract => contract.RegistrationTaxData!.RegistrationOffice);
  }
}
