using RealGimm.Core.IAM;
using RealGimm.Core;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Prop.AdministrationAggregate;
using Ardalis.Result;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core.Prop.AdministrationAggregate.Specifications;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate.Specifications;
using RealGimm.WebCommons.Extensions;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.Web.Prop.Mutations;

public sealed class AdministrationTermMutations : MutationsBase
{
  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Create)]
  public async Task<Result<AdministrationTerm>> Add(
    int administrationId,
    AdministrationTermInput input,
    [Service] IRepository<Administration> administrationRepository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var administration = await administrationRepository
      .AsQueryable(new GetByIdSpec<Administration>(administrationId), new AdministrationIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (administration is null)
    {
      return Result.NotFound();
    }

    AdministrationTerm administrationTerm;

    try
    {
      administrationTerm = (await mapper.MapAsync<AdministrationTermInput, AdministrationTerm>(input, cancellationToken))!;
    }
    catch (MappingException exception)
    {
      return Result<AdministrationTerm>.Invalid(exception.ValidationErrors.ToList());
    }

    var validationErrors = administrationTerm.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<AdministrationTerm>.Invalid(validationErrors);
    }

    administration.Terms.Add(administrationTerm);
    await administrationRepository.UpdateAsync(administration, cancellationToken);

    return administrationTerm;
  }

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Update)]
  public async Task<Result<AdministrationTerm>> Update(
    int id,
    AdministrationTermInput input,
    [Service] IRepository<AdministrationTerm> repository,
    [Service] IRepository<BillItemType> billItemTypeRepo,
    [Service] IRepository<Bill> billRepository,
    [Service] ICodeSuggestor<Bill> billCodeSuggestor,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var administrationTerm = await repository
      .AsQueryable(new GetByIdSpec<AdministrationTerm>(id), new AdministrationTermIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (administrationTerm is null)
    {
      return Result.NotFound();
    }

    // more than one payment can't refer to the same bill
    if (input.Payments.Where(payment => payment.BillId.HasValue).GroupBy(payment => payment.BillId).Any(group => group.Count() > 1))
    {
      return Result.Forbidden();
    }

    var bills = administrationTerm.Installments
      .SelectMany(installment => installment.Payments)
      .Select(payment => payment.Bill)
      .Distinct()
      .ToList();

    var billsToDelete = bills
      .Where(bill => !input.Payments.Select(paymentInput => paymentInput.BillId).Contains(bill.Id))
      .ToArray();

    try
    {
      await mapper.MapAsync(input, administrationTerm, cancellationToken);
    }
    catch (MappingException exception)
    {
      return Result<AdministrationTerm>.Invalid(exception.ValidationErrors.ToList());
    }

    // payments mapping
    if (input.Payments.Count != 0)
    {
      var billItemTypeIds = administrationTerm.Installments
        .Select(installment => installment.BillItemType.Id);

      foreach (var payment in input.Payments)
      {
        // 0. get installments for current payment
        var termInstallments = administrationTerm.Installments
          .Where(installment => payment.InstallmentNumbers.Contains(installment.InstallmentNumber))
          .ToArray();

        if (!termInstallments.Any())
        {
          return Result<AdministrationTerm>.Forbidden();
        }

        Bill bill;

        if (payment.BillId.HasValue)
        {
          // 1.a. retrieve existing bill
          bill = bills.Single(bill => bill.Id == payment.BillId);
        }
        else
        {
          // 1.b. create new bill
          bill = new Bill();
          bill.SetTransactorSubjectId(administrationTerm.Administration.AdministratorSubjectId);
          bill.SetMainCounterpartSubjectId(administrationTerm.Administration.AdministratorSubjectId);
          bill.SetTotalAmount(termInstallments.Sum(installment => installment.Amount));
        }

        // 2. update bill date & year
        bill.SetDate(payment.PaymentDate);
        bill.SetYear(payment.PaymentDate.Year);

        // 3. update bill rows & payments
        bill.BillRows.Clear();

        foreach (var termInstallment in termInstallments)
        {
          // 3.1. create bill row
          var billRow = new BillRow();
          billRow.SetBillItemType(termInstallment.BillItemType);
          billRow.SetVATRateId(termInstallment.BillItemType.AdministrationVRId);
          billRow.SetAmount(termInstallment.Amount);
          billRow.SetSource(null, null, termInstallment);

          bill.BillRows.Add(billRow);
        }

        // 4. generate internal code and add to the collection in case of new bill
        if (!payment.BillId.HasValue)
        {
          var internalCode = await billCodeSuggestor.SuggestNextCode(
            partialEntity: bill,
            additionallyOccupiedCodes: bills.Select(bill => bill.InternalCode).ToArray());

          bill.SetInternalCode(internalCode!);

          billRepository.AddSuspend(bill);
          bills.Add(bill);
        }
      }
    }

    foreach (var bill in billsToDelete)
    {
      billRepository.DeleteSuspend(bill);
    }

    var validationErrors = administrationTerm.Validate().ToList();
    if (validationErrors.Count > 0)
    {
      return Result<AdministrationTerm>.Invalid(validationErrors);
    }

    await repository.UpdateAsync(administrationTerm!, cancellationToken);
    await billRepository.SaveChangesAsync(cancellationToken);

    return administrationTerm;
  }

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Delete)]
  public Task<Result> Delete(
    int id,
    [Service] IRepository<AdministrationTerm> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<AdministrationTerm>(id), repository, cancellationToken);

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Delete)]
  public Task<Result> DeleteRange(
    int[] ids,
    [Service] IRepository<AdministrationTerm> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<AdministrationTerm>(ids), repository, cancellationToken);

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Create)]
  public async Task<Result> AddInstallmentPayments(
    int administrationTermId,
    InstallmentPaymentInput[] inputs,
    [Service] IRepository<AdministrationTerm> administrationTermRepository,
    [Service] IMapper mapper,
    CancellationToken cancellationToken = default)
  {
    var administrationTerm = await administrationTermRepository
      .AsQueryable(new GetByIdSpec<AdministrationTerm>(administrationTermId), new AdministrationTermIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (administrationTerm is null)
    {
      return Result.NotFound();
    }

    var existingTermInstallmentIds = administrationTerm.Installments.Select(installment => installment.Id).ToArray();
    var inputTermInstallmentIds = inputs.SelectMany(input => input.TermInstallmentIds).Distinct().ToArray();

    if (inputTermInstallmentIds.Except(existingTermInstallmentIds).Any())
    {
      return Result.NotFound();
    }

    foreach (var input in inputs.GroupBy(input => input.BillDate))
    {
      IGrouping<Bill, BillRow> installmentPayments;

      try
      {
        installmentPayments = (await mapper.MapAsync<IGrouping<DateOnly, InstallmentPaymentInput>, IGrouping<Bill, BillRow>>(input, cancellationToken))!;
      }
      catch (MappingException exception)
      {
        return Result.Invalid(exception.ValidationErrors.ToList());
      }

      var billValidationErrors = installmentPayments.Key.Validate().ToList();
      if (billValidationErrors.Count > 0)
      {
        return Result.Invalid(billValidationErrors);
      }

      foreach (var installmentPayment in installmentPayments)
      {
        var validationErrors = administrationTerm.Validate().ToList();
        if (billValidationErrors.Count > 0)
        {
          return Result.Invalid(billValidationErrors);
        }
      }
    }

    await administrationTermRepository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Update)]
  public async Task<Result> UpdateInstallmentPayments(
    int administrationTermId,
    int[] installmentPaymentIds,
    InstallmentPaymentInput input,
    [Service] IRepository<AdministrationTerm> administrationTermRepository,
    [Service] IReadRepository<BillItemType> billItemTypeRepository,
    CancellationToken cancellationToken = default)
  {
    var administrationTerm = await administrationTermRepository
      .AsQueryable(new GetByIdSpec<AdministrationTerm>(administrationTermId), new AdministrationTermIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (administrationTerm is null ||
      input.TermInstallmentIds.Distinct().Except(administrationTerm.Installments.Select(installment => installment.Id)).Any())
    {
      return Result.NotFound();
    }

    var installmentPayments = administrationTerm.Installments
      .SelectMany(installment => installment.Payments)
      .Where(payment => installmentPaymentIds.Contains(payment.Id))
      .ToArray();

    // all payments must belong to the same bill
    if (installmentPayments.GroupBy(payment => payment.Bill).Count() != 1)
    {
      return Result.Forbidden();
    }

    var bill = installmentPayments.First().Bill;
    bill.SetDate(input.BillDate);
    bill.SetYear(input.BillDate.Year);

    // delete
    var installmentPaymentsToDelete = installmentPayments
      .Where(payment => !input.TermInstallmentIds.Contains(payment.TermInstallmentSource!.Id))
      .ToArray();

    foreach (var installmentPayment in installmentPaymentsToDelete)
    {
      installmentPayment.TermInstallmentSource!.Payments.Remove(installmentPayment);
      bill.SetTotalAmount(bill.TotalAmount - installmentPayment.Amount);
    }

    // update
    var instalmentPaymentsToUpdate = installmentPayments.Except(installmentPaymentsToDelete).ToArray();
    foreach (var installmentPayment in instalmentPaymentsToUpdate)
    {
      installmentPayment.SetBillItemType(
        await billItemTypeRepository
          .AsQueryable(new GetByIdSpec<BillItemType>(input.BillItemTypeId))
          .FirstAsync(cancellationToken));

      bill.SetTotalAmount(bill.TotalAmount + input.Amount - installmentPayment.Amount);
      installmentPayment.SetAmount(input.Amount);
    }

    // add
    var addedInstallmentPayments = new List<BillRow>();

    var termInstallmentsToAddPayments = input.TermInstallmentIds
      .Distinct()
      .Except(installmentPayments.Select(payment => payment.TermInstallmentSource!.Id))
      .Select(id => administrationTerm.Installments.Single(installment => installment.Id == id))
      .ToArray();

    foreach (var termInstallment in termInstallmentsToAddPayments)
    {
      var paymentBillRow = new BillRow();
      paymentBillRow.SetBillItemType(
        await billItemTypeRepository
          .AsQueryable(new GetByIdSpec<BillItemType>(input.BillItemTypeId))
          .FirstAsync(cancellationToken));
      paymentBillRow.SetAmount(input.Amount);
      paymentBillRow.SetSource(null, null, termInstallment);

      bill.BillRows.Add(paymentBillRow);
      termInstallment.Payments.Add(paymentBillRow);

      bill.SetTotalAmount(bill.TotalAmount + input.Amount);
    }

    // validate
    var billValidationErrors = bill.Validate().ToList();
    if (billValidationErrors.Count > 0)
    {
      return Result.Invalid(billValidationErrors);
    }

    foreach (var installmentPayment in instalmentPaymentsToUpdate
      .Concat(addedInstallmentPayments))
    {
      var validationErrors = installmentPayment.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        return Result.Invalid(validationErrors);
      }
    }

    await administrationTermRepository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.PROP_ADMINISTRATION_BASE, Permission.Delete)]
  public async Task<Result> DeleteInstallmentPayment(
    int administrationTermId,
    int installmentPaymentId,
    [Service] IRepository<AdministrationTerm> administrationTermRepository,
    [Service] IRepository<Bill> billRepository,
    CancellationToken cancellationToken = default)
  {
    var administrationTerm = await administrationTermRepository
      .AsQueryable(new GetByIdSpec<AdministrationTerm>(administrationTermId), new AdministrationTermIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (administrationTerm is null)
    {
      return Result.NotFound();
    }

    var installmentPayment = administrationTerm.Installments
      .SelectMany(installment => installment.Payments)
      .SingleOrDefault(payment => payment.Id == installmentPaymentId);

    if (installmentPayment is null)
    {
      return Result.NotFound();
    }

    installmentPayment.TermInstallmentSource!.Payments.Remove(installmentPayment);

    var bill = installmentPayment.Bill;
    bill.BillRows.Remove(installmentPayment);
    bill.SetTotalAmount(bill.TotalAmount - installmentPayment.Amount);

    await administrationTermRepository.UpdateAsync(administrationTerm, cancellationToken);

    // delete bill if it has no payments
    if (!bill.BillRows.Any())
    {
      await billRepository.DeleteAsync(bill, cancellationToken);
    }

    return Result.Success();
  }
}
