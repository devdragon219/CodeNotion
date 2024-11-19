using Microsoft.Extensions.Logging;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Attributes;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.EventSystem;
using Rebus.Bus;
using RealGimm.Core.Prop.ContractAggregate.Events;
using RealGimm.Core.Prop.ContractAggregate.Specifications;
using RealGimm.Core.Shared.InterestCalculation;

namespace RealGimm.Core.Prop.ContractAggregate.Handlers;

[BackgroundEventHandler]
public class ContractDepositUpdatedHandler : TenantMessageHandler<ContractDepositUpdatedEvent>
{
  public required IRepository<Contract> Contracts { protected get; init; }
  public required ILogger<ContractDepositUpdatedHandler> Logger { protected get; init; }
  public required InterestCalculator Calculator { protected get; init; }

  protected override async Task HandlePerTenant(ContractDepositUpdatedEvent message)
  {
    var contract = await Contracts
      .AsQueryable(
        new ContractIncludeAllSpec(),
        new GetByIdSpec<Contract>(message.ContractId))
      .FirstOrDefaultAsync();

    if (contract is null)
    {
      Logger.LogInformation("Unable to get contract {contractId} for deposit updates",
        message.ContractId);
      
      return;
    }

    // Calculate interest for cash deposits
    foreach(var deposit in contract.SecurityDeposits
      .Where(d => d.Type == SecurityDepositType.Cash
        && d.IsInterestCalculated))
    {
      deposit.InterestRows.Clear();

      var startDate = deposit.InterestCalculationStartDate ?? deposit.Since;

      var endDate = deposit.InterestCalculationEndDate
        ?? deposit.Until
        ?? DateOnly.FromDateTime(DateTime.Today);

      if(startDate is null) {
        Logger.LogInformation("Could not calculate interest on deposit {depositId} because no start date is set",
          deposit.Id);

        // Leave an empty InterestRows collection on exit
        continue;
      }

      deposit.InterestRows.AddRange(
        (await Calculator.CalculateInterests(
          deposit.BaseAmount,
          startDate.Value,
          endDate,
          CountryISO3.ITA))
        .Select(interestPeriod => {
          var srow = new SecurityDepositInterestRow();

          srow.SetCalculationDate(DateOnly.FromDateTime(DateTime.UtcNow));
          srow.SetBaseAmount(interestPeriod.OriginalAmount);
          srow.SetDates(interestPeriod.Start, interestPeriod.End);
          srow.SetAppliedInterestRate(interestPeriod.AppliedRate);
          srow.SetInterestAmount(interestPeriod.InterestAmount);

          return srow;
        }));

      Logger.LogDebug("Contract {contractId} deposit {depositId} interest {start} - {end}",
        message.ContractId,
        deposit.Id,
        startDate,
        endDate);
    }

    await Contracts.UpdateAsync(contract);

    Logger.LogInformation("Deposits updated for contract {contractId}",
      message.ContractId);
  }
}
