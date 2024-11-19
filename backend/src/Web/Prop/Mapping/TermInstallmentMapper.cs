using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class TermInstallmentMapper : IMapper<TermInstallmentInput, TermInstallment>
{
  private readonly IReadRepository<BillItemType> _billitemTypeRepository;

  public TermInstallmentMapper(IReadRepository<BillItemType> billitemTypeRepository)
    => _billitemTypeRepository = billitemTypeRepository;

  public async Task<TermInstallment?> MapAsync(TermInstallmentInput? from, TermInstallment? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var termInstallment = into ?? new TermInstallment();

    var billItemType = await _billitemTypeRepository
      .AsQueryable(new GetByIdSpec<BillItemType>(from.BillItemTypeId))
      .FirstOrDefaultAsync(cancellationToken);

    if (billItemType is null)
    {
      throw new MappingException(ErrorCode.TermInstallmentNonExistingBillItemType.ToValidationError());
    }

    termInstallment.SetInstallmentNumber(from.InstallmentNumber);
    termInstallment.SetDueDate(from.DueDate);
    termInstallment.SetAmount(from.Amount);
    termInstallment.SetNotes(from.Notes);
    termInstallment.SetSince(from.Since);
    termInstallment.SetUntil(from.Until);
    termInstallment.SetBillItemType(billItemType);
    termInstallment.Payments.Clear();

    return termInstallment;
  }
}
