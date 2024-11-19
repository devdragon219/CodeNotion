using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Web.Prop.Mapping;

public sealed class BillRowMapper : IMapper<BillRowInput, BillRow>
{
  public required IReadRepository<BillItemType> BillItemTypeRepository { get; init; }

  async Task<BillRow?> IMapper<BillRowInput, BillRow>.MapAsync(BillRowInput? from, BillRow? into, CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    var billRow = into ?? new BillRow();
    billRow.SetBillItemType(await BillItemTypeRepository
      .AsQueryable(new GetByIdSpec<BillItemType>(from.BillItemTypeId))
      .SingleAsync(cancellationToken: cancellationToken));
    billRow.SetVATRateId(from.VATRateId);
    billRow.SetAmount(from.Amount);
    billRow.SetSince(from.Since);
    billRow.SetUntil(from.Until);
    billRow.SetNotes(from.Notes);

    if (from.Id.HasValue)
    {
      billRow.Id = from.Id.Value;
    }

    return billRow;
  }
}
