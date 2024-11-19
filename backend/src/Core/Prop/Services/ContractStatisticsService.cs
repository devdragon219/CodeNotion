using System.Diagnostics;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractAggregate.Models;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.Prop.Services;

public class ContractStatisticsService : IContractStatisticsService
{
  public required IReadRepository<Contract> ContractRepository { protected get; init; }

  public async Task<ContractStatisticsOutput> GetCurrentStatisticsAsync(CancellationToken cancellationToken)
  {
    var minDateTime = DateTime.UtcNow.AddYears(-1);

    //The max date is tomorrow, because max dates are always excluded
    var maxDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1));

    //The count begins on day 1 of the month, to be able to compare the first two
    // yearly statistics values
    var minDate = new DateOnly(minDateTime.Year, minDateTime.Month, 1);

    //Here we don't filter for StartDate, because the upper bound is today's date
    var contracts = await ContractRepository
      .AsQueryable(new NonTerminatedContractSpec(minDate), new NonExpiredContractSpec(minDate))
      .Select(contract => new
      {
        contract.EffectStartDate,
        contract.TerminationDate,
        contract.SecondTermExpirationDate,
        contract.Type.IsActive,
        Bills = contract.Bills.Select(bill => new
        {
          bill.Date,
          bill.TotalAmount
        })
      })
      .ToListAsync(cancellationToken);
    
    var yearlyStats = Enumerable
      .Range(1, 12)
      .Select(monthRelative =>
      {
        //Due to the fact that in the last year months are uniquely numbered,
        // the time split is simplified. This logic should be updated for generic time-range
        // statistics.
        var minWindow = minDate.AddMonths(monthRelative);
        var maxWindow = minWindow.AddMonths(1);

        var relevantContracts = contracts
          .Where(c =>
            //The contract somehow started before the month ended
            c.EffectStartDate < maxWindow
            //The contract was not terminated at the beginning of the month
            && (!c.TerminationDate.HasValue || c.TerminationDate.Value > minWindow)
            //The contract was not expired at the beginning of the month
            && (!c.SecondTermExpirationDate.HasValue || c.SecondTermExpirationDate.Value > minWindow))
          .ToList();

        var activeContracts = relevantContracts.Where(c => c.IsActive);
        var passiveContracts = relevantContracts.Where(c => !c.IsActive);

        var activeBills = activeContracts
          .SelectMany(c => c.Bills.Where(b => b.Date >= minWindow && b.Date < maxWindow))
          .ToList();
        var passiveBills = passiveContracts
          .SelectMany(c => c.Bills.Where(b => b.Date >= minWindow && b.Date < maxWindow))
          .ToList();

        return new ContractYearlyStatisticsOutput(
          minWindow.Month,
          activeContracts.Count(),
          passiveContracts.Count(),
          activeBills.Sum(b => b.TotalAmount),
          passiveBills.Sum(b => b.TotalAmount)
          );

      })
      .ToArray();

    //This count goes in reverse from the MaxDate back 30 days
    var monthlyStats = Enumerable
      .Range(0, 30)
      .Select(dayRelative =>
      {
        var maxWindow = maxDate.AddDays(-dayRelative);
        var minWindow = maxWindow.AddDays(-1);

        var relevantContracts = contracts
          .Where(c =>
            //The contract somehow started before the month ended
            c.EffectStartDate < maxWindow
            //The contract was not terminated at the beginning of the month
            && (!c.TerminationDate.HasValue || c.TerminationDate.Value > minWindow)
            //The contract was not expired at the beginning of the month
            && (!c.SecondTermExpirationDate.HasValue || c.SecondTermExpirationDate.Value > minWindow))
          .ToList();

        var activeContracts = relevantContracts.Where(c => c.IsActive);
        var passiveContracts = relevantContracts.Where(c => !c.IsActive);

        var activeBills = activeContracts
          .SelectMany(c => c.Bills.Where(b => b.Date >= minWindow && b.Date < maxWindow))
          .ToList();
        var passiveBills = passiveContracts
          .SelectMany(c => c.Bills.Where(b => b.Date >= minWindow && b.Date < maxWindow))
          .ToList();

        return new ContractMonthlyStatisticsOutput(
          minWindow,
          activeContracts.Count(),
          passiveContracts.Count(),
          activeBills.Sum(b => b.TotalAmount),
          passiveBills.Sum(b => b.TotalAmount)
          );
      })
      .OrderBy(d => d.Date)
      .ToArray();

    return new ContractStatisticsOutput(monthlyStats, yearlyStats);
  }

  public async Task<(Dictionary<int, int[]> Daily, Dictionary<int, int[]> Monthly)> GetCommittedEstateUnitsAsync(
    CancellationToken cancellationToken)
  {
    var minDateTime = DateTime.UtcNow.AddYears(-1);

    //The max date is tomorrow, because max dates are always excluded
    var maxDate = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1));

    //The count begins on day 1 of the month, to be able to compare the first two
    // yearly statistics values
    var minDate = new DateOnly(minDateTime.Year, minDateTime.Month, 1);

    //Here we don't filter for StartDate, because the upper bound is today's date
    // also, we filter by active contracts only
    var contracts = await ContractRepository
      .AsQueryable(new NonTerminatedContractSpec(minDate), new NonExpiredContractSpec(minDate), new ActiveContractSpec())
      .Select(contract => new
      {
        contract.EffectStartDate,
        contract.TerminationDate,
        contract.SecondTermExpirationDate,
        EstateUnitIds = contract.LocatedUnits.Select(locatedUnit => locatedUnit.EstateUnitId)
      })
      .ToListAsync(cancellationToken);

    var yearlyStats = Enumerable
      .Range(1, 12)
      .Select(monthRelative =>
      {
        //Due to the fact that in the last year months are uniquely numbered,
        // the time split is simplified. This logic should be updated for generic time-range
        // statistics.
        var minWindow = minDate.AddMonths(monthRelative);
        var maxWindow = minWindow.AddMonths(1);

        var relevantContracts = contracts
          .Where(c =>
            //The contract somehow started before the month ended
            c.EffectStartDate < maxWindow
            //The contract was not terminated at the beginning of the month
            && (!c.TerminationDate.HasValue || c.TerminationDate.Value > minWindow)
            //The contract was not expired at the beginning of the month
            && (!c.SecondTermExpirationDate.HasValue || c.SecondTermExpirationDate.Value > minWindow))
          .ToList();

        return new
        {
          monthRelative,
          EstateUnitIds = relevantContracts
            .SelectMany(c => c.EstateUnitIds)
            .Distinct()
            .ToArray()
        };
      })
      .ToDictionary(d => d.monthRelative, d => d.EstateUnitIds);

    //This count goes in reverse from the MaxDate back 30 days
    var monthlyStats = Enumerable
      .Range(0, 30)
      .Select(dayRelative =>
      {
        var maxWindow = maxDate.AddDays(-dayRelative);
        var minWindow = maxWindow.AddDays(-1);

        var relevantContracts = contracts
          .Where(c =>
            //The contract somehow started before the month ended
            c.EffectStartDate < maxWindow
            //The contract was not terminated at the beginning of the month
            && (!c.TerminationDate.HasValue || c.TerminationDate.Value > minWindow)
            //The contract was not expired at the beginning of the month
            && (!c.SecondTermExpirationDate.HasValue || c.SecondTermExpirationDate.Value > minWindow))
          .ToList();


        return new
        {
          dayRelative,
          EstateUnitIds = relevantContracts
            .SelectMany(c => c.EstateUnitIds)
            .Distinct()
            .ToArray()
        };
      })
      .ToDictionary(d => d.dayRelative, d => d.EstateUnitIds);

    return (monthlyStats, yearlyStats);
  }
}
