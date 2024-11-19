using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using RealGimm.Core.Common;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Shared;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.BillAggregate.Tasks;

[DisallowConcurrentExecution]
[DefaultCronSchedule("0 30 0 * * ?")]
[Description("Generate next round of bills")]
public sealed class GenerateBillsJob : AnyTenantJob
{
  private readonly ILogger<GenerateBillsJob> _logger;

  public GenerateBillsJob(
    IReadRepository<Tenant> tenantsRepository,
    IServiceProvider serviceProvider,
    ILogger<GenerateBillsJob> logger)
    : base(tenantsRepository, serviceProvider)
  {
    _logger = logger;
  }

  public override async Task ExecuteTenant(IJobExecutionContext context, IServiceProvider scopedProvider, Guid tenantId)
  {
    var contractRepository = scopedProvider.GetRequiredService<IRepository<Contract>>();
    var billRepository = scopedProvider.GetRequiredService<IRepository<Bill>>();
    var billItemTypeRepository = scopedProvider.GetRequiredService<IRepository<BillItemType>>();
    var billCodeSuggestor = scopedProvider.GetRequiredService<ICodeSuggestor<Bill>>();
    var vatRateRepository = scopedProvider.GetRequiredService<IRepository<VATRate>>();
    var currentDate = DateOnly.FromDateTime(DateTime.UtcNow);

    _logger.LogInformation("Generating bills for tenant {tenantId}", tenantId);

    var contracts = contractRepository
      .AsQueryable(new ContractIncludeAllSpec())
      .Where(contract => contract.Status == EntryStatus.Working)
      .Where(contract => contract.BillingPeriod.HasValue)
      .Where(contract =>
        !contract.Bills.Any() ||
        // skip contracts where bills for the current period are already generated:
        currentDate >= contract.Bills.OrderByDescending(bill => bill.Until).FirstOrDefault()!.Until)
      .Where(contract => !contract.BillingEndDate.HasValue || currentDate < contract.BillingEndDate.Value)
      .Where(contract => !contract.SecondTermExpirationDate.HasValue || currentDate < contract.SecondTermExpirationDate.Value);

    var burnedBillCodes = new List<string>();

    await foreach (var contract in contracts.AsAsyncEnumerable())
    {
      try
      {
        await foreach (var bill in GenerateBillsAsync(
          contract,
          billCodeSuggestor,
          burnedBillCodes,
          vatRateRepository))
        {
          billRepository.AddSuspend(bill);
          burnedBillCodes.Add(bill.InternalCode);
        }
      }
      catch (Exception exception)
      {
        _logger.LogError(exception, "Failed to generate bills for contract {contractId}", contract.Id);
      }
    }

    await billRepository.SaveChangesAsync();

    _logger.LogInformation("Bills for tenant {tenantId} are generated", tenantId);
  }

  private static async IAsyncEnumerable<Bill> GenerateBillsAsync (
    Contract contract,
    ICodeSuggestor<Bill> codeSuggestor,
    List<string> burnedBillCodes,
    IRepository<VATRate> vatRateRepository)
  {
    var billingPeriod = contract.BillingPeriod!.Value;
    var (billingDate, billingStartDate) = CalculateBillingStartDates(contract);
    var billingEndDate = CalculateBillingPeriodEndDate(billingPeriod, billingStartDate);

    var mainLocatedUnit = contract.LocatedUnits
      .SingleOrDefault(locatedUnit => locatedUnit.IsMainUnit);
    var mainCounterpart = contract.Counterparts
      .SingleOrDefault(counterpart => !counterpart.Until.HasValue && counterpart.IsMainCounterpart);
    var transactors = contract.Transactors.Where(transactor => transactor.Until is null);

    if(mainCounterpart is null)
    {
      throw new InvalidOperationException("Main counterpart is missing");
    }

    if(mainLocatedUnit is null)
    {
      throw new InvalidOperationException("Main located unit is missing");
    }

    foreach (var transactor in transactors)
    {
      var bill = new Bill();
      bill.SetYear(billingDate.Year);
      bill.SetTransactorSubjectId(transactor.SubjectId);
      bill.SetMainCounterpartSubjectId(mainCounterpart.SubjectId);
      bill.SetEstateUnitId(mainLocatedUnit.EstateUnitId);
      bill.SetIsOccupiedWithoutRight(contract.IsOccupiedWithoutRight.GetValueOrDefault());
      bill.SetIsInvoiced(transactor.IsInvoiced);
      bill.SetTransactorPaymentType(transactor.Type);
      bill.SetContract(contract);
      bill.SetDate(billingDate);
      bill.SetSince(billingStartDate);
      bill.SetUntil(billingEndDate);
      bill.SetEmissionType(BillEmissionType.Automatic);
      bill.SetContractBillingPeriod(billingPeriod);
      bill.SetInternalCode((await codeSuggestor.SuggestNextCode(
        null,
        bill,
        [..burnedBillCodes]))!);

      if (contract.BillingBaseFeeBillItemType is not null && contract.BillingVATRateType.HasValue)
      {
        var amount = contract.RevaluationHistories
          .Select(revaluation => new { Date = revaluation.Since, Fee = revaluation.YearlyRateWithRevaluation })
          .Concat(contract.RatePlans.Select(ratePlan => new { Date = ratePlan.Since, Fee = ratePlan.NewYearlyRate }))
          .OrderBy(item => item.Date)
          .LastOrDefault()
          ?.Fee
          ?? contract.BillingBaseFee;

        if (amount.HasValue)
        {
          var billItemType = contract.BillingBaseFeeBillItemType;

          var vatRateId = (contract.Type.IsActive, contract.BillingVATRateType) switch
          {
            (true, VATRateType.Rate) => billItemType.ActiveSubjectVRId,
            (true, VATRateType.Exempt) => billItemType.ActiveExemptVRId,
            (true, VATRateType.NonTaxable) => billItemType.ActiveNonTaxableVRId,

            (false, VATRateType.Rate) => billItemType.PassiveSubjectVRId,
            (false, VATRateType.Exempt) => billItemType.PassiveExemptVRId,
            (false, VATRateType.NonTaxable) => billItemType.PassiveNonTaxableVRId,

            _ => throw new NotImplementedException()
          };

          var vatRate = await vatRateRepository.AsQueryable(new GetByIdSpec<VATRate>(vatRateId)).SingleAsync();

          var row = new BillRow();
          row.SetBillItemType(billItemType);
          row.SetVATRateId(vatRate.Id);
          row.SetAmount(amount.Value);
          row.SetSince(billingStartDate);
          row.SetUntil(billingEndDate);

          bill.BillRows.Add(row);
        }
      }

      bill.BillRows.AddRange(contract.RecurringAdditions.Select(addition =>
      {
        var row = new BillRow();
        row.SetBillItemType(addition.BillItemType);
        row.SetVATRateId(addition.VATRateId);
        row.SetAmount(addition.AmountPerInstallment);
        row.SetSince(billingStartDate);
        row.SetUntil(billingEndDate);
        row.SetNotes(addition.Notes);

        return row;
      }));

      bill.BillRows.AddRange(contract.OneshotAdditions
        .Where(addition => billingStartDate > addition.StartDate)
        .Select(addition =>
        {
          var row = new BillRow();
          row.SetBillItemType(addition.BillItemType);
          row.SetVATRateId(addition.VATRateId);
          row.SetAmount(addition.Amount);
          row.SetSince(addition.TermStartDate);
          row.SetUntil(addition.TermEndDate);
          row.SetNotes(addition.Notes);

          return row;
        }));

      var groupedByVat = bill.BillRows.GroupBy(e => e.VATRateId);
      var vatRates = await vatRateRepository.AsQueryable()
                    .Where(e => groupedByVat.Select(bill => bill.First().VATRateId).Contains(e.Id))
                    .Select(e => new { e.Id, e.RatePercent }).ToDictionaryAsync(e => e.Id);

      var result = groupedByVat.Select(e => new
      {
        VATRate = vatRates[e.First().VATRateId].RatePercent,
        BillRows = e.ToList()
      });

      decimal total = 0;
      foreach (var vat in result)
      {
        var billRowsSum = vat.BillRows.Sum(e => e.Amount);
        total += (billRowsSum * (decimal)vat.VATRate / 100m) + billRowsSum;
      }

      bill.SetTotalAmount(total);
      yield return bill;
    }
  }

  private static (DateOnly Date, DateOnly? StartDate) CalculateBillingStartDates(Contract contract)
  {
    var date = contract.Bills.LastOrDefault()?.Until ?? contract.EffectStartDate;

    var billingPause = contract.BillingPauses.FirstOrDefault(
      pause => date >= pause.Since && (pause.Until is null || date <= pause.Until.Value));

    var startDate = billingPause is null ? date : billingPause.Until;

    return (date, startDate);
  }

  private static DateOnly? CalculateBillingPeriodEndDate(BillingPeriod period, DateOnly? startDate)
  {
    if (startDate is null)
    {
      return null;
    }

    return period switch
    {
      BillingPeriod.Monthly => startDate.Value.AddMonths(1),
      BillingPeriod.Bimonthly => startDate.Value.AddMonths(2),
      BillingPeriod.PerQuarter => startDate.Value.AddMonths(3),
      BillingPeriod.PerQuadrimester => startDate.Value.AddMonths(4),
      BillingPeriod.PerSemester => startDate.Value.AddMonths(6),
      BillingPeriod.Yearly => startDate.Value.AddYears(1),

      _ => throw new ArgumentOutOfRangeException(nameof(period))
    };
  }
}
