using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.Prop.Services;

public class BillItemTypeDeleteRestrictionChecker : IDeleteRestrictionChecker<BillItemType>
{
  private readonly IRepository<Contract> _contractRepository;
  private readonly IRepository<Bill> _billRepository;
  private readonly IRepository<AdministrationTerm> _administrationTermRepository;

  public BillItemTypeDeleteRestrictionChecker(
    IRepository<Contract> contractRepository,
    IRepository<Bill> billRepository,
    IRepository<AdministrationTerm> administrationTermRepository)
  {
    _contractRepository = contractRepository;
    _billRepository = billRepository;
    _administrationTermRepository = administrationTermRepository;
  }

  public async Task<bool> HasRestrictionsAsync(int entityId, CancellationToken cancellationToken = default)
    => await IsUsedInAnyContract(entityId, cancellationToken) ||
      await IsUsedInAnyBill(entityId, cancellationToken) ||
      await IsUsedInAnyAdministrationTerm(entityId, cancellationToken);

  private Task<bool> IsUsedInAnyContract(int billingItemTypeId, CancellationToken cancellationToken)
    => _contractRepository
        .AsQueryable()
        .Where(contract =>
          (contract.BillingBaseFeeBillItemType != null && contract.BillingBaseFeeBillItemType.Id == billingItemTypeId) ||
          contract.OneshotAdditions.Any(addition => addition.BillItemType.Id == billingItemTypeId) ||
          contract.RecurringAdditions.Any(addition => addition.BillItemType.Id == billingItemTypeId))
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyBill(int billingItemTypeId, CancellationToken cancellationToken)
    => _billRepository
        .AsQueryable()
        .Where(bill => bill.BillRows.Any(row => row.ItemType.Id == billingItemTypeId))
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyAdministrationTerm(int billingItemTypeId, CancellationToken cancellationToken)
    => _administrationTermRepository
        .AsQueryable()
        .Where(administrationTerm => administrationTerm.Installments.Any(installment => installment.BillItemType.Id == billingItemTypeId))
        .AnyAsync(cancellationToken);
}
