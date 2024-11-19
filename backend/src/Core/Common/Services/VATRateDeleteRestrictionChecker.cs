using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.Common.Services;

public class VATRateDeleteRestrictionChecker : IDeleteRestrictionChecker<VATRate>
{
  private readonly IRepository<Contract> _contractRepository;
  private readonly IRepository<Bill> _billRepository;

  public VATRateDeleteRestrictionChecker(IRepository<Contract> contractRepository, IRepository<Bill> billRepository)
  {
    _contractRepository = contractRepository;
    _billRepository = billRepository;
  }

  public async Task<bool> HasRestrictionsAsync(int entityId, CancellationToken cancellationToken = default)
    => await IsUsedInAnyContract(entityId, cancellationToken) || await IsUsedInAnyBill(entityId, cancellationToken);

  private Task<bool> IsUsedInAnyBill(int vatRateId, CancellationToken cancellationToken)
    => _billRepository
        .AsQueryable()
        .Where(bill => bill.BillRows.Any(row => row.VATRateId == vatRateId))
        .AnyAsync(cancellationToken);

  private Task<bool> IsUsedInAnyContract(int vatRateId, CancellationToken cancellationToken)
    => _contractRepository
      .AsQueryable()
      .Where(contract =>
        contract.OneshotAdditions.Any(addition => addition.VATRateId == vatRateId) ||
        contract.RecurringAdditions.Any(addition => addition.VATRateId == vatRateId))
      .AnyAsync(cancellationToken);
}
