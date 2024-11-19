using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate.Specifications;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.Interfaces;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Prop.Services;
public class AdministrationTermService : IAdministrationTermService
{
  public readonly IReadRepository<AdministrationTerm> _atRepo;
  public readonly IReadRepository<BillItemType> _bitRepo;
  public readonly IReadRepository<VATRate> _vatRateRepo;

  public AdministrationTermService(
    IReadRepository<AdministrationTerm> atRepo,
    IReadRepository<BillItemType> bitRepo,
    IReadRepository<VATRate> vatRateRepo)
  {
    _atRepo = atRepo;
    _bitRepo = bitRepo;
    _vatRateRepo = vatRateRepo;
  }

  public async Task<IEnumerable<TermGroupedInstallmentPayment>> GetInstallmentPaymentsGroupedByBill(int administrationTermId, CancellationToken cancellationToken)
  {
    var administrationTerm = await _atRepo
      .AsQueryable(new GetByIdSpec<AdministrationTerm>(administrationTermId), new AdministrationTermIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken)
        ?? throw new Exception($"Not existing AdministrationTerm with Id {administrationTermId}");

    List<TermGroupedInstallmentPayment> paymentRows = [];

    var vatRates = await _vatRateRepo
      .AsQueryable()
      .ToDictionaryAsync(vr => vr.Id, cancellationToken);

    foreach (var installment in administrationTerm.Installments)
    {
      foreach (var payment in installment.Payments)
      {
        var billItemType = payment.ItemType;

        var paymentRow = new TermGroupedInstallmentPayment
        {
          TermInstallments = [installment],
          BillId = payment.Bill.Id,
          BillDate = payment.Bill.Date,
          BillIsTemporary = payment.Bill.IsTemporary,
          BillInternalCode = payment.Bill.InternalCode,
          TotalAmount = payment.Amount,
          BillItemTypeVATRate = vatRates[billItemType.AdministrationVRId]
        };

        paymentRows.Add(paymentRow);
      }
    }

    var groupedRows = paymentRows
      .GroupBy(p => new { p.BillId, p.BillDate })
      .Select(e => new TermGroupedInstallmentPayment
      {
        TermInstallments = e.SelectMany(t => t.TermInstallments),
        BillId = e.First().BillId,
        BillDate = e.First().BillDate,
        BillIsTemporary = e.First().BillIsTemporary,
        BillInternalCode = e.First().BillInternalCode,
        TotalAmount = e.Sum(t => t.TotalAmount),
        TotalAmountPerVATRate = e.Sum(t => t.TotalAmount) + (e.Sum(t => t.TotalAmount) * (decimal)e.First().BillItemTypeVATRate.RatePercent),
        BillItemTypeVATRate = e.First().BillItemTypeVATRate
      });

    return groupedRows;
  }
}
