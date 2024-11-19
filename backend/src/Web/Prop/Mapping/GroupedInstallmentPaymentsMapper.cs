using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public class GroupedInstallmentPaymentsMapper : MapperBase, IMapper<IGrouping<DateOnly, InstallmentPaymentInput>, IGrouping<Bill, BillRow>>
{
  private readonly IReadRepository<AdministrationTerm> _administrationTermRepository;
  private readonly IReadRepository<BillItemType> _billItemTypeRepository;
  private readonly ICodeSuggestor<Bill> _billCodeSuggestor;

  public GroupedInstallmentPaymentsMapper(
    IReadRepository<AdministrationTerm> administrationTermRepository,
    IReadRepository<BillItemType> billItemTypeRepository,
    ICodeSuggestor<Bill> billCodeSuggestor)
  {
    _administrationTermRepository = administrationTermRepository;
    _billItemTypeRepository = billItemTypeRepository;
    _billCodeSuggestor = billCodeSuggestor;
  }

  public async Task<IGrouping<Bill, BillRow>?> MapAsync(
    IGrouping<DateOnly, InstallmentPaymentInput>? from,
    IGrouping<Bill, BillRow>? into,
    CancellationToken cancellationToken)
  {
    if (from is null)
    {
      return null;
    }

    if (!from.Any() || into is not null)
    {
      throw new NotSupportedException();
    }

    var bill = new Bill();
    bill.SetDate(from.Key);
    bill.SetYear(from.Key.Year);

    var administrationTermId = await _administrationTermRepository
      .AsQueryable()
      .SelectMany(administrationTerm => administrationTerm.Installments)
      .Where(installment => from.First().TermInstallmentIds.First() == installment.Id)
      .Select(administrationTerm => administrationTerm.AdministrationTerm.Id)
      .SingleAsync(cancellationToken);

    var transactorSubjectId = await _administrationTermRepository
      .AsQueryable(new GetByIdSpec<AdministrationTerm>(administrationTermId))
      .Select(administrationTerm => administrationTerm.Administration.AdministratorSubjectId)
      .SingleAsync(cancellationToken);

    bill.SetTransactorSubjectId(transactorSubjectId);
    bill.SetTotalAmount(from.Sum(fromItem => fromItem.Amount));

    var installmentPayments = new List<BillRow>();
    foreach (var fromItem in from)
    {
      var billItemType = await _billItemTypeRepository
        .SingleOrDefaultAsync(new GetByIdSpec<BillItemType>(fromItem.BillItemTypeId), cancellationToken)
        ?? throw new MappingException(ErrorCode.InstallmentPaymentNonExistingBillItemType.ToValidationError());

      var termInstallments = await _administrationTermRepository
        .AsQueryable(new GetByIdSpec<AdministrationTerm>(administrationTermId))
        .SelectMany(administrationTerm => administrationTerm.Installments)
        .Where(installment => fromItem.TermInstallmentIds.Contains(installment.Id))
        .ToListAsync(cancellationToken);

      foreach (var termInstallment in termInstallments)
      {
        var installmentPayment = new BillRow();
        installmentPayment.SetAmount(fromItem.Amount);
        installmentPayment.SetBillItemType(billItemType);
        
        termInstallment.Payments.Add(installmentPayment);
        installmentPayment.SetSource(null, null, termInstallment);
        
        bill.BillRows.Add(installmentPayment);

        installmentPayments.Add(installmentPayment);
      }
    }

    var billInternalCode = await _billCodeSuggestor.SuggestNextCode(parentId: null, partialEntity: bill);
    bill.SetInternalCode(billInternalCode!);

    return installmentPayments.GroupBy(installmentPayment => installmentPayment.Bill).Single();
  }
}
